import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function BookingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle>Запись на звонок</CardTitle>
          <CardDescription>
            Здесь скоро появится выбор типа встречи и свободного слота.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Страница в разработке.</p>
        </CardContent>
      </Card>
    </main>
  );
}
