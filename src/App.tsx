import { Button } from "./components/ui/button"
import { Separator } from "./components/ui/separator"

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b bg-card">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          <div>
            <h1 className="text-base font-semibold tracking-tight">JFPYG cal</h1>
            <p className="text-xs text-muted-foreground">
              Just for printing your google calendar
            </p>
          </div>
          <Button size="sm" disabled>
            Googleでログイン（実装予定）
          </Button>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-4 p-4 lg:grid-cols-[320px_1fr]">
        <aside className="rounded-lg border bg-card p-4">
          <h2 className="text-sm font-semibold">カレンダー選択</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            OAuth実装後に取得したカレンダー一覧を表示します。
          </p>
          <Separator className="my-4" />
          <div className="space-y-3 text-sm">
            <label className="flex items-center gap-2 text-muted-foreground">
              <input type="checkbox" className="h-4 w-4" disabled />
              仕事（ダミー）
            </label>
            <label className="flex items-center gap-2 text-muted-foreground">
              <input type="checkbox" className="h-4 w-4" disabled />
              プライベート（ダミー）
            </label>
          </div>
          <Button className="mt-4 w-full" disabled>
            印刷プレビュー生成（実装予定）
          </Button>
        </aside>

        <section className="rounded-lg border bg-card p-4">
          <h2 className="text-sm font-semibold">A4 印刷プレビュー</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            フェーズ3-4で月間グリッドと印刷スタイルを実装します。
          </p>
          <div className="mt-4 flex items-center justify-center rounded-md border border-dashed bg-muted/30 p-4">
            <div className="aspect-[1.414/1] w-full max-w-4xl rounded bg-background shadow-sm" />
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
