import { Button } from "@/components/ui/button"

function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-3xl font-bold tracking-tight">Календарь звонков</h1>
      <p className="text-muted-foreground">
        Сервис для бронирования времени звонков
      </p>
      <Button>Начать</Button>
    </main>
  )
}

export default App
