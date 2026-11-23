import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function AdminPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle>Управление типами встреч</CardTitle>
          <CardDescription>
            Здесь скоро появится создание и управление типами встреч.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Страница в разработке.</p>
        </CardContent>
      </Card>
    </main>
  );
}
