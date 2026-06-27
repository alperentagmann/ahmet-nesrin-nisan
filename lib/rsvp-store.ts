import { Redis } from "@upstash/redis"

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

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
  await redis.lpush(RSVP_KEY, JSON.stringify(entry))
  return entry
}

export async function getAllRsvps(): Promise<RsvpEntry[]> {
  const raw = await redis.lrange(RSVP_KEY, 0, -1)
  return raw.map((r) => JSON.parse(r as string) as RsvpEntry)
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
