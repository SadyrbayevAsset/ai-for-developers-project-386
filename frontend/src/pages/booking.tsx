import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api";
import type { components } from "@/generated/sdk";

type MeetingType = components["schemas"]["MeetingType"];

export function BookingPage() {
  const [meetingTypes, setMeetingTypes] = useState<MeetingType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const { data, error: apiError } = await api.GET("/meeting-types");
      if (cancelled) return;
      if (apiError) {
        setError("Не удалось загрузить типы встреч.");
      } else {
        setMeetingTypes(data ?? []);
      }
      setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Запись на звонок</CardTitle>
          <CardDescription>Выберите тип встречи, чтобы увидеть свободные слоты.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {loading && <p className="text-muted-foreground">Загрузка...</p>}
          {error && <p className="text-destructive">{error}</p>}
          {!loading && !error && meetingTypes.length === 0 && (
            <p className="text-muted-foreground">Пока нет доступных типов встреч.</p>
          )}
          {!loading &&
            meetingTypes.map((type) => (
              <Button key={type.id} variant="outline" asChild className="justify-start h-auto py-4">
                <Link to={`/booking/${type.id}/slots`} data-testid={`meeting-type-${type.id}`}>
                  <div className="flex flex-col items-start">
                    <span className="font-semibold">{type.name}</span>
                    <span className="text-sm text-muted-foreground font-normal">
                      {type.durationMinutes} мин — {type.description}
                    </span>
                  </div>
                </Link>
              </Button>
            ))}
        </CardContent>
      </Card>
    </main>
  );
}
