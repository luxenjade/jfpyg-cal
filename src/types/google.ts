export type GoogleAccessTokenResponse = {
  access_token: string
  expires_in: number
  scope: string
  token_type: "Bearer"
}

export type GoogleCalendarListEntry = {
  id: string
  summary: string
  backgroundColor?: string
  foregroundColor?: string
  primary?: boolean
  selected?: boolean
  accessRole?: string
}

export type GoogleCalendarListResponse = {
  items: GoogleCalendarListEntry[]
}

export type GoogleCalendarEvent = {
  id: string
  summary: string
  description?: string
  start: {
    dateTime?: string
    date?: string
  }
  end: {
    dateTime?: string
    date?: string
  }
  backgroundColor?: string
  colorId?: string
}

export type GoogleCalendarEventsResponse = {
  items: GoogleCalendarEvent[]
  summary: string
  timeZone: string
}
