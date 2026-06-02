import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { useGoogleLogin } from "@react-oauth/google"
import { Button } from "../components/ui/button"
import { Separator } from "../components/ui/separator"
import { MonthlyGrid } from "../components/calendar/MonthlyGrid"
import { fetchCalendarList, fetchEvents, revokeToken } from "../lib/googleCalendar"
import { getMonthBoundaries } from "../lib/dateUtils"
import type { GoogleAccessTokenResponse, GoogleCalendarEvent, GoogleCalendarListEntry } from "../types/google"

export function CalendarApp() {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [calendars, setCalendars] = useState<GoogleCalendarListEntry[]>([])
  const [selectedCalendarIds, setSelectedCalendarIds] = useState<string[]>([])
  const [events, setEvents] = useState<GoogleCalendarEvent[]>([])
  const [isLoadingCalendars, setIsLoadingCalendars] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const [currentDate, setCurrentDate] = useState(new Date())
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
  const isClientIdConfigured = Boolean(clientId)

  const login = useGoogleLogin({
    scope: "https://www.googleapis.com/auth/calendar.readonly",
    onSuccess: async (tokenResponse: Omit<GoogleAccessTokenResponse, "token_type">) => {
      setErrorMessage(null)
      setIsLoadingCalendars(true)

      try {
        const items = await fetchCalendarList(tokenResponse.access_token)
        setAccessToken(tokenResponse.access_token)
        setCalendars(items)
        setSelectedCalendarIds(items.filter((item) => item.selected || item.primary).map((item) => item.id))
      } catch {
        setAccessToken(null)
        setCalendars([])
        setSelectedCalendarIds([])
        setErrorMessage("カレンダー一覧の取得に失敗しました。再ログインしてください。")
      } finally {
        setIsLoadingCalendars(false)
      }
    },
    onError: () => {
      setErrorMessage("Googleログインに失敗しました。再度お試しください。")
    },
  })

  // Fetch events when selected calendars or month changes
  useEffect(() => {
    if (!accessToken || selectedCalendarIds.length === 0) {
      setEvents([])
      return
    }

    const loadEvents = async () => {
      const { timeMin, timeMax } = getMonthBoundaries(year, month)

      try {
        const allEventsPromises = selectedCalendarIds.map(async (id) => {
          const calendar = calendars.find((c) => c.id === id)
          const items = await fetchEvents(accessToken, id, timeMin, timeMax)
          // Inject calendar background color if not present on event
          return items.map((item) => ({
            ...item,
            backgroundColor: item.backgroundColor || calendar?.backgroundColor,
          }))
        })

        const results = await Promise.all(allEventsPromises)
        const mergedEvents = results.flat()

        // Sort: All-day events first, then by start time
        mergedEvents.sort((a, b) => {
          const aStart = a.start.dateTime || a.start.date || ""
          const bStart = b.start.dateTime || b.start.date || ""
          
          if (!!a.start.date && !b.start.date) return -1
          if (!a.start.date && !!b.start.date) return 1
          
          return aStart.localeCompare(bStart)
        })

        setEvents(mergedEvents)
      } catch (error) {
        console.error("Failed to fetch events:", error)
        setErrorMessage("イベントの取得に失敗しました。")
      }
    }

    loadEvents()
  }, [accessToken, selectedCalendarIds, year, month, calendars])

  const toggleCalendar = (calendarId: string) => {
    setSelectedCalendarIds((previous) =>
      previous.includes(calendarId)
        ? previous.filter((id) => id !== calendarId)
        : [...previous, calendarId],
    )
  }

  const changeMonth = (offset: number) => {
    setCurrentDate((prev) => {
      const next = new Date(prev)
      next.setMonth(next.getMonth() + offset)
      return next
    })
  }

  const primaryCalendar = useMemo(
    () => calendars.find((calendar) => calendar.primary),
    [calendars],
  )

  const handleLogout = async () => {
    if (accessToken) {
      await revokeToken(accessToken)
    }
    setAccessToken(null)
    setCalendars([])
    setSelectedCalendarIds([])
    setEvents([])
    setIsLoadingCalendars(false)
    setErrorMessage(null)
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b bg-card print:hidden">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-base font-semibold tracking-tight">JFPYG cal</h1>
              <p className="text-xs text-muted-foreground">
                Just for printing your google calendar
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {accessToken ? (
              <Button size="sm" variant="outline" onClick={() => void handleLogout()}>
                ログアウト
              </Button>
            ) : (
              <Button size="sm" onClick={() => login()} disabled={!isClientIdConfigured}>
                Googleでログイン
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 p-4 lg:grid-cols-[300px_1fr] print:block print:p-0 print:max-w-none">
        <aside className="space-y-4 print:hidden">
          <section className="rounded-lg border bg-card p-4">
            <h2 className="text-sm font-semibold">表示月</h2>
            <div className="mt-3 flex items-center justify-between">
              <Button variant="outline" size="sm" onClick={() => changeMonth(-1)}>前月</Button>
              <span className="text-sm font-medium">{year}年 {month + 1}月</span>
              <Button variant="outline" size="sm" onClick={() => changeMonth(1)}>次月</Button>
            </div>
          </section>

          <section className="rounded-lg border bg-card p-4">
            <h2 className="text-sm font-semibold">カレンダー選択</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              {primaryCalendar
                ? `ログイン中: ${primaryCalendar.summary}`
                : "ログイン後にカレンダーを選択できます。"}
            </p>
            {!isClientIdConfigured && (
              <p className="mt-2 rounded-md border border-destructive/40 bg-destructive/10 px-2 py-1 text-xs text-destructive">
                `.env.local` に `VITE_GOOGLE_CLIENT_ID` を設定してください。
              </p>
            )}
            {errorMessage && (
              <p className="mt-2 rounded-md border border-destructive/40 bg-destructive/10 px-2 py-1 text-xs text-destructive">
                {errorMessage}
              </p>
            )}
            <Separator className="my-4" />
            <div className="max-h-[300px] space-y-2 overflow-y-auto pr-1 text-sm">
              {isLoadingCalendars && (
                <p className="text-xs text-muted-foreground">読み込み中...</p>
              )}
              {!isLoadingCalendars && calendars.length === 0 && (
                <p className="text-xs text-muted-foreground">
                  カレンダーがありません。
                </p>
              )}
              {calendars.map((calendar) => (
                <label key={calendar.id} className="flex items-center gap-2 cursor-pointer hover:bg-muted/50 p-1 rounded transition-colors">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300"
                    checked={selectedCalendarIds.includes(calendar.id)}
                    onChange={() => toggleCalendar(calendar.id)}
                  />
                  <span
                    className="inline-block h-2 w-2 rounded-full shrink-0"
                    style={{ backgroundColor: calendar.backgroundColor ?? "#6b7280" }}
                  />
                  <span className="truncate text-xs">{calendar.summary}</span>
                </label>
              ))}
            </div>
          </section>

          <Button 
            className="w-full" 
            onClick={handlePrint}
            disabled={!accessToken || selectedCalendarIds.length === 0}
          >
            A4 印刷する
          </Button>
          <p className="text-[10px] text-muted-foreground text-center">
            ※ブラウザの印刷設定で「背景のグラフィック」をオンにしてください。
          </p>
        </aside>

        <section className="flex flex-col gap-4 print:gap-0">
          <div className="relative flex-1 min-h-[600px] lg:min-h-0 print:min-h-0">
            {/* A4 Aspect Ratio Container */}
            <div className="w-full aspect-[1.414/1] bg-white shadow-xl print:shadow-none print:fixed print:top-0 print:left-0 print:w-[297mm] print:h-[210mm] print:z-[9999] overflow-hidden print-color-adjust">
              <MonthlyGrid year={year} month={month} events={events} />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-4 bg-muted/20 print:hidden">
        <div className="mx-auto max-w-7xl px-4 flex justify-between items-center text-[10px] text-muted-foreground">
          <p>JFPYG cal &copy; 2026 - No database, Privacy first.</p>
          <div className="flex gap-4">
            <Link to="/" className="hover:underline">トップページ</Link>
            <Link to="/privacy" className="hover:underline">プライバシーポリシー</Link>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page {
            size: A4 landscape;
            margin: 0;
          }
          body {
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          /* Hide everything by default during print */
          body > #root > div > *:not(main),
          main > *:not(section),
          section > *:not(div.relative) {
            display: none !important;
          }
          .print-color-adjust {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        }
      ` }} />
    </div>
  )
}
