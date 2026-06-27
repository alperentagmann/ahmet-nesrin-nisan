import { Redis } from "@upstash/redis"

let redis: Redis | null = null

function getRedis(): Redis {
  if (!redis) {
    const url = process.env.UPSTASH_REDIS_REST_URL
    const token = process.env.UPSTASH_REDIS_REST_TOKEN
    if (!url || !token) {
      throw new Error(
        "UPSTASH_REDIS_REST_URL ve UPSTASH_REDIS_REST_TOKEN environment variable'ları eksik. " +
        "Vercel Dashboard > Settings > Environment Variables bölümünden ekleyin."
      )
    }
    redis = new Redis({ url, token })
  }
  return redis
}

const RSVP_KEY = "rsvp:entries"

export type RsvpEntry = {
  id: string
  name: string
  attending: boolean
  allergies: string
  createdAt: string
}

export async function addRsvp(input: {
  name: string
  attending: boolean
  allergies: string
}): Promise<RsvpEntry> {
  const entry: RsvpEntry = {
    id: crypto.randomUUID(),
    name: input.name.trim(),
    attending: input.attending,
    allergies: input.allergies.trim(),
    createdAt: new Date().toISOString(),
  }
  await getRedis().lpush(RSVP_KEY, JSON.stringify(entry))
  return entry
}

export async function getAllRsvps(): Promise<RsvpEntry[]> {
  const raw = await getRedis().lrange(RSVP_KEY, 0, -1)
  return (raw ?? []) as unknown as RsvpEntry[]
}

export async function getRsvpSummary(): Promise<{
  total: number
  attending: number
  notAttending: number
}> {
  const entries = await getAllRsvps()
  return {
    total: entries.length,
    attending: entries.filter((e) => e.attending).length,
    notAttending: entries.filter((e) => !e.attending).length,
  }
}

/* ─── Guest Notes ─── */
const NOTES_KEY = "rsvp:notes"

export type NoteEntry = {
  id: string
  name: string
  message: string
  createdAt: string
}

export async function addNote(input: {
  name: string
  message: string
}): Promise<NoteEntry> {
  const entry: NoteEntry = {
    id: crypto.randomUUID(),
    name: input.name.trim(),
    message: input.message.trim(),
    createdAt: new Date().toISOString(),
  }
  await getRedis().lpush(NOTES_KEY, JSON.stringify(entry))
  return entry
}

export async function getAllNotes(): Promise<NoteEntry[]> {
  const raw = await getRedis().lrange(NOTES_KEY, 0, -1)
  return (raw ?? []) as unknown as NoteEntry[]
}
