import type {
  GoogleCalendarEvent,
  GoogleCalendarEventsResponse,
  GoogleCalendarListEntry,
  GoogleCalendarListResponse,
} from "../types/google";

const CALENDAR_LIST_ENDPOINT =
  "https://www.googleapis.com/calendar/v3/users/me/calendarList";

export async function fetchCalendarList(
  accessToken: string,
): Promise<GoogleCalendarListEntry[]> {
  const response = await fetch(CALENDAR_LIST_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Google Calendar API error: ${response.status}`);
  }

  const data = (await response.json()) as GoogleCalendarListResponse;
  return data.items ?? [];
}

export async function fetchEvents(
  accessToken: string,
  calendarId: string,
  timeMin: string,
  timeMax: string,
): Promise<GoogleCalendarEvent[]> {
  const url = new URL(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`,
  );
  url.searchParams.append("timeMin", timeMin);
  url.searchParams.append("timeMax", timeMax);
  url.searchParams.append("singleEvents", "true");
  url.searchParams.append("orderBy", "startTime");

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    // If we can't fetch one calendar, we might still want to proceed with others,
    // but for now let's just throw.
    throw new Error(`Google Calendar Events API error: ${response.status}`);
  }

  const data = (await response.json()) as GoogleCalendarEventsResponse;
  return data.items ?? [];
}

export async function revokeToken(accessToken: string): Promise<void> {
  // GoogleのOAuth2トークン失効エンドポイント
  const url = "https://oauth2.googleapis.com/revoke";

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      token: accessToken,
    }),
  });
}
