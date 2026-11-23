import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-2xl">Календарь звонков</CardTitle>
          <CardDescription>
            Запишитесь на удобное время для звонка всего в несколько кликов.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button size="lg" data-testid="booking-cta" asChild>
            <Link to="/booking">Записаться на звонок</Link>
          </Button>
          <Link
            to="/admin"
            className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
            data-testid="admin-link"
          >
            Управление типами встреч
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
