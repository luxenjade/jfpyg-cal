import { useNavigate, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { Calendar, Printer, ShieldCheck, Zap } from "lucide-react";

export function Intro() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b bg-card">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Calendar className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold tracking-tight">JFPYG cal</h1>
          </div>
          <Button onClick={() => navigate("/app")}>使ってみる</Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 text-center bg-gradient-to-b from-muted/50 to-background">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              「ただ、Googleカレンダーを美しく印刷するためだけに。」
            </h2>
            <p className="text-xl text-muted-foreground">
              JFPYG
              calは、GoogleカレンダーのデータをA4サイズでの印刷・PDF出力に100%最適化して描画する、ステートレスなマンスリーカレンダー型Webビューアです。
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" onClick={() => navigate("/app")}>
                今すぐ開始
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  const element = document.getElementById("features");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                特徴を見る
              </Button>
            </div>
          </div>
        </section>

        <Separator />

        {/* Features Section */}
        <section id="features" className="py-20 px-4 max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">選ばれる理由</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <ShieldCheck className="h-10 w-10 text-primary mb-2" />
                <CardTitle>セキュリティ第一</CardTitle>
                <CardDescription>No Database</CardDescription>
              </CardHeader>
              <CardContent>
                アクセストークンやカレンダーデータはブラウザのメモリ内のみで処理。サーバーに一切の個人情報を残さないセキュアな設計。
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="h-10 w-10 text-primary mb-2" />
                <CardTitle>複数カレンダー統合</CardTitle>
                <CardDescription>Multi-Calendar Merge</CardDescription>
              </CardHeader>
              <CardContent>
                複数のカレンダーAPIから予定を並列取得し、1つの美しいマンスリーグリッドにマージして表示します。
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Printer className="h-10 w-10 text-primary mb-2" />
                <CardTitle>A4印刷最適化</CardTitle>
                <CardDescription>CSS @media print</CardDescription>
              </CardHeader>
              <CardContent>
                独自のA4比率グリッドデザインと、ピクセルパーフェクトな印刷制御。背景色や文字サイズも最適化済み。
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Calendar className="h-10 w-10 text-primary mb-2" />
                <CardTitle>ステートレス</CardTitle>
                <CardDescription>Stateless App</CardDescription>
              </CardHeader>
              <CardContent>
                データベースを持たないため、ログインしたその瞬間だけ、安全かつ最速で最高の印刷用カレンダーを出力します。
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How to use */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-12">使い方</h3>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">
                  1
                </div>
                <div>
                  <h4 className="text-lg font-bold">Googleでログイン</h4>
                  <p className="text-muted-foreground">
                    「使ってみる」ボタンからGoogleアカウントでログインします。カレンダーの読み取り権限のみを使用します。
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">
                  2
                </div>
                <div>
                  <h4 className="text-lg font-bold">カレンダーを選択</h4>
                  <p className="text-muted-foreground">
                    左側のサイドバーから印刷したいカレンダー（複数可）を選択します。
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">
                  3
                </div>
                <div>
                  <h4 className="text-lg font-bold">印刷・PDF出力</h4>
                  <p className="text-muted-foreground">
                    「A4
                    印刷する」ボタンをクリックし、ブラウザの印刷ダイアログから出力します。
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-12 text-center">
              <Button size="lg" onClick={() => navigate("/app")}>
                今すぐカレンダーを作る
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 px-4 bg-muted/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <span className="font-semibold text-muted-foreground">
              JFPYG cal
            </span>
          </div>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:underline">
              プライバシーポリシー
            </Link>
            <a
              href="https://github.com/luxenjade/jfpyg-cal"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              GitHub
            </a>
          </div>
          <p className="text-xs text-muted-foreground">
            &copy; 2026 JFPYG cal - Privacy First.
          </p>
        </div>
      </footer>
    </div>
  );
}
