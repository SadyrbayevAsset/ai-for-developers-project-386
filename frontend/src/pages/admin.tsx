import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";
import type { components } from "@/generated/sdk";

type MeetingType = components["schemas"]["MeetingType"];
type Booking = components["schemas"]["Booking"];

function formatBookingTime(start: string): string {
  return new Date(start).toLocaleString("ru-RU", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function AdminPage() {
  const [meetingTypes, setMeetingTypes] = useState<MeetingType[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("30");
  const [error, setError] = useState<string | null>(null);

  async function load() {
    const [typesRes, bookingsRes] = await Promise.all([
      api.GET("/meeting-types"),
      api.GET("/bookings"),
    ]);
    if (typesRes.error || bookingsRes.error) {
      setError("Не удалось загрузить данные.");
    } else {
      setMeetingTypes(typesRes.data ?? []);
      setBookings(bookingsRes.data ?? []);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleCreate(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    const durationMinutes = Number(duration);
    if (!name || Number.isNaN(durationMinutes) || durationMinutes <= 0) {
      setError("Введите название и корректную длительность.");
      return;
    }

    const { error: apiError } = await api.POST("/meeting-types", {
      body: { name, description, durationMinutes },
    });

    if (apiError) {
      setError("Не удалось создать тип встречи.");
    } else {
      setName("");
      setDescription("");
      setDuration("30");
      await load();
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-8 gap-6">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Управление типами встреч</CardTitle>
          <CardDescription>Создавайте типы встреч, которые гости могут забронировать.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreate} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Название</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                data-testid="meeting-type-name-input"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Описание</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                data-testid="meeting-type-description-input"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="duration">Длительность (мин)</Label>
              <Input
                id="duration"
                type="number"
                min={1}
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                data-testid="meeting-type-duration-input"
              />
            </div>
            {error && <p className="text-destructive text-sm">{error}</p>}
            <Button type="submit" data-testid="create-meeting-type-button">
              Создать тип встречи
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Типы встреч</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {meetingTypes.length === 0 && (
            <p className="text-muted-foreground">Пока не создано ни одного типа встречи.</p>
          )}
          {meetingTypes.map((type) => (
            <div key={type.id} className="rounded-lg border p-4" data-testid={`created-meeting-type-${type.id}`}>
              <p className="font-semibold">{type.name}</p>
              <p className="text-sm text-muted-foreground">
                {type.durationMinutes} мин{type.description ? ` — ${type.description}` : ""}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Записи</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {bookings.length === 0 && (
            <p className="text-muted-foreground">Пока нет записей.</p>
          )}
          {bookings.map((booking) => {
            const type = meetingTypes.find((t) => t.id === booking.meetingTypeId);
            return (
              <div key={booking.id} className="rounded-lg border p-4" data-testid={`booking-${booking.id}`}>
                <p className="font-semibold">{formatBookingTime(booking.start)}</p>
                <p className="text-sm text-muted-foreground">
                  {type?.name ?? "Неизвестный тип"} — {booking.guestName} ({booking.guestEmail})
                </p>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </main>
  );
}
