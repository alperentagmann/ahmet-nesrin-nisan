import { Redis } from "@upstash/redis"

let redis: Redis | null = null

function getRedis(): Redis {
  if (!redis) {
    const url = process.env.KV_REST_API_URL
    const token = process.env.KV_REST_API_TOKEN
    if (!url || !token) {
      throw new Error(
        "KV_REST_API_URL ve KV_REST_API_TOKEN environment variable'ları eksik. " +
        "Vercel Dashboard > Storage > KV bağlantısını kontrol edin."
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
