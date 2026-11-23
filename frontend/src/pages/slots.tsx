import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api";
import type { components } from "@/generated/sdk";

type Slot = components["schemas"]["Slot"];
type MeetingType = components["schemas"]["MeetingType"];

function formatSlot(start: string): string {
  const date = new Date(start);
  return date.toLocaleString("ru-RU", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function SlotsPage() {
  const params = useParams<{ meetingTypeId: string }>();
  const meetingTypeId = params.meetingTypeId ?? "";
  const [meetingType, setMeetingType] = useState<MeetingType | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!meetingTypeId) {
      setLoading(false);
      return;
    }
    let cancelled = false;

    async function load() {
      const from = new Date();
      const to = new Date(from.getTime() + 14 * 24 * 60 * 60 * 1000);

      const [typesRes, slotsRes] = await Promise.all([
        api.GET("/meeting-types"),
        api.GET("/meeting-types/{id}/slots", {
          params: {
            path: { id: meetingTypeId },
            query: {
              from: from.toISOString(),
              to: to.toISOString(),
            },
          },
        }),
      ]);

      if (cancelled) return;

      if (typesRes.error || slotsRes.error) {
        setError("Не удалось загрузить слоты.");
      } else {
        setMeetingType((typesRes.data ?? []).find((t) => t.id === meetingTypeId) ?? null);
        setSlots(slotsRes.data ?? []);
      }
      setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [meetingTypeId]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{meetingType ? meetingType.name : "Свободные слоты"}</CardTitle>
          <CardDescription>
            {meetingType
              ? `Выберите удобное время для встречи (${meetingType.durationMinutes} мин).`
              : "Выберите удобное время для встречи."}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {loading && <p className="text-muted-foreground">Загрузка...</p>}
          {error && <p className="text-destructive">{error}</p>}
          {!loading && !error && slots.length === 0 && (
            <p className="text-muted-foreground">Нет свободных слотов на ближайшие две недели.</p>
          )}
          {!loading &&
            slots.map((slot) => (
              <Button key={slot.start} variant="outline" asChild>
                <Link
                  to={`/booking/${meetingTypeId}/slots/${encodeURIComponent(slot.start)}`}
                  data-testid={`slot-${slot.start}`}
                >
                  {formatSlot(slot.start)}
                </Link>
              </Button>
            ))}
        </CardContent>
      </Card>
    </main>
  );
}
