import { useNavigate, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { Calendar, ArrowLeft } from "lucide-react";

export function Privacy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b bg-card">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <Calendar className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold tracking-tight">gcal2paper</h1>
          </Link>
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="flex gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> 戻る
          </Button>
        </div>
      </header>

      <main className="flex-1 py-12 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-extrabold mb-8 text-center">
          プライバシーポリシー
        </h2>

        <div className="space-y-8 prose prose-slate max-w-none">
          <section>
            <h3 className="text-xl font-bold border-b pb-2 mb-4">
              1. 基本方針
            </h3>
            <p>
              gcal2paper（以下「本サービス」）は、ユーザーのプライバシーを最優先に考え、データベースを持たない「ステートレス」なアーキテクチャを採用しています。本サービスがユーザーのカレンダー情報を永続的に保存したり、外部の第三者に送信したりすることはありません。
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold border-b pb-2 mb-4">
              2. 取得する情報と利用目的
            </h3>
            <p>
              本サービスは、Google OAuth
              2.0を利用してユーザーから以下の情報を取得しますが、これらはブラウザ内のメモリ上でのみ一時的に利用され、印刷レイアウトの生成目的以外には使用されません。
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Googleカレンダーのリスト:</strong>{" "}
                表示・選択するカレンダーを特定するため。
              </li>
              <li>
                <strong>カレンダーのイベント情報:</strong>{" "}
                カレンダー上に予定を描画し、印刷用データを生成するため。
              </li>
              <li>
                <strong>Googleアクセストークン:</strong> Google
                APIへ安全にアクセスするため（ブラウザを閉じると破棄されます）。
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold border-b pb-2 mb-4">
              3. データの保存とセキュリティ
            </h3>
            <p>
              本サービスはサーバーサイドのデータベースを一切保持していません。すべての処理はユーザーのブラウザ内（クライアントサイド）で完結します。アクセストークンはメモリ（React
              State）に保持され、ブラウザのリロードやタブの閉鎖によって即座に破棄されます。
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold border-b pb-2 mb-4">
              4. 第三者への提供
            </h3>
            <p>
              本サービスは、取得した情報をいかなる第三者にも提供しません。広告ネットワークやアナリティクスツール（Google
              Analytics等）への情報送信も行っていません。
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold border-b pb-2 mb-4">
              5. Google APIの限定利用
            </h3>
            <p>
              本サービスによるGoogleユーザーデータの使用および他のアプリへの転送は、
              <a
                href="https://developers.google.com/terms/api-services-user-data-policy#additional_requirements_for_specific_api_scopes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Google APIサービスユーザーデータポリシー
              </a>
              （限定公開要件を含む）に従います。
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold border-b pb-2 mb-4">
              6. お問い合わせ
            </h3>
            <p>
              本サービスに関するご質問やご意見がある場合は、GitHubリポジトリのIssue等を通じてご連絡ください。
            </p>
          </section>
        </div>

        <Separator className="my-12" />

        <div className="flex justify-center">
          <Button size="lg" onClick={() => navigate("/")}>
            トップページへ戻る
          </Button>
        </div>
      </main>

      <footer className="border-t py-8 px-4 bg-muted/20 text-center text-sm text-muted-foreground">
        &copy; 2026 gcal2paper - Privacy First.
      </footer>
    </div>
  );
}
