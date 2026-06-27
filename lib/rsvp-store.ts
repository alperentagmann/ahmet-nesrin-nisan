import { promises as fs } from "fs";
import path from "path";

export type RsvpEntry = {
  id: string;
  name: string;
  attending: boolean;
  allergies: string;
  createdAt: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "rsvp.json");

async function ensureFile(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2), "utf-8");
  }
}

async function readAll(): Promise<RsvpEntry[]> {
  await ensureFile();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  try {
    return JSON.parse(raw) as RsvpEntry[];
  } catch {
    return [];
  }
}

async function writeAll(entries: RsvpEntry[]): Promise<void> {
  await ensureFile();
  await fs.writeFile(DATA_FILE, JSON.stringify(entries, null, 2), "utf-8");
}

export async function addRsvp(input: {
  name: string;
  attending: boolean;
  allergies: string;
}): Promise<RsvpEntry> {
  const entries = await readAll();
  const entry: RsvpEntry = {
    id: crypto.randomUUID(),
    name: input.name.trim(),
    attending: input.attending,
    allergies: input.allergies.trim(),
    createdAt: new Date().toISOString(),
  };
  entries.push(entry);
  await writeAll(entries);
  return entry;
}

export async function getAllRsvps(): Promise<RsvpEntry[]> {
  const entries = await readAll();
  return entries.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getRsvpSummary(): Promise<{
  total: number;
  attending: number;
  notAttending: number;
}> {
  const entries = await readAll();
  return {
    total: entries.length,
    attending: entries.filter((e) => e.attending).length,
    notAttending: entries.filter((e) => !e.attending).length,
  };
}
