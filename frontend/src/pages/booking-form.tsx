import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";
import type { components } from "@/generated/sdk";

type MeetingType = components["schemas"]["MeetingType"];

function formatSlot(start: string): string {
  const date = new Date(start);
  return date.toLocaleString("ru-RU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function BookingFormPage() {
  const { meetingTypeId, slotStart } = useParams<{ meetingTypeId: string; slotStart: string }>();
  const navigate = useNavigate();
  const [meetingType, setMeetingType] = useState<MeetingType | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");

  useEffect(() => {
    if (!meetingTypeId) return;
    let cancelled = false;

    async function load() {
      const { data, error: apiError } = await api.GET("/meeting-types");
      if (cancelled) return;
      if (apiError) {
        setError("Не удалось загрузить тип встречи.");
      } else {
        setMeetingType((data ?? []).find((t) => t.id === meetingTypeId) ?? null);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [meetingTypeId]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!meetingTypeId || !slotStart) return;

    setSubmitting(true);
    setError(null);

    const { error: apiError } = await api.POST("/bookings", {
      body: {
        meetingTypeId,
        start: decodeURIComponent(slotStart),
        guestName,
        guestEmail,
      },
    });

    if (apiError) {
      const conflict = apiError as { code?: string; message?: string };
      setError(
        conflict.code === "BOOKING_CONFLICT"
          ? "Этот слот уже занят. Пожалуйста, выберите другое время."
          : "Не удалось записаться. Попробуйте позже."
      );
    } else {
      setSuccess(true);
    }
    setSubmitting(false);
  }

  if (success) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-8">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>Запись подтверждена</CardTitle>
            <CardDescription>
              {meetingType?.name} на {formatSlot(decodeURIComponent(slotStart!))}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-muted-foreground">
              Мы отправили подтверждение на {guestEmail}. Ждём вас на встрече!
            </p>
            <Button asChild>
              <Link to="/">На главную</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{meetingType ? meetingType.name : "Запись на встречу"}</CardTitle>
          <CardDescription>
            {slotStart && formatSlot(decodeURIComponent(slotStart))}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="guestName">Имя</Label>
              <Input
                id="guestName"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                required
                data-testid="guest-name-input"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="guestEmail">Email</Label>
              <Input
                id="guestEmail"
                type="email"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                required
                data-testid="guest-email-input"
              />
            </div>
            {error && <p className="text-destructive text-sm">{error}</p>}
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
                disabled={submitting}
              >
                Назад
              </Button>
              <Button type="submit" disabled={submitting} className="flex-1" data-testid="confirm-booking-button">
                {submitting ? "Запись..." : "Подтвердить запись"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
