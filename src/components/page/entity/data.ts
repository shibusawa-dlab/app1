import { promises as fs } from 'node:fs';
import path from 'node:path';

export type EntityRecord = {
  id: string;
  value: number;
  image?: string;
  description?: string | { value: string };
};

export type EntityData = {
  agential: EntityRecord[];
  spatial: EntityRecord[];
};

export type EntityType = 'agential' | 'spatial';

let cache: EntityData | null = null;

/**
 * Load entity.json from public/data. Cached in memory per server process.
 * Called only at build time (server components).
 */
export async function loadEntityData(): Promise<EntityData> {
  if (cache) return cache;
  const filePath = path.join(process.cwd(), 'public', 'data', 'entity.json');
  const raw = await fs.readFile(filePath, 'utf-8');
  cache = JSON.parse(raw) as EntityData;
  return cache;
}

/**
 * The URL slug for the entity type list — the legacy site used `agential`
 * and `place` as URL slugs, while the data key for places is `spatial`.
 */
export const TYPE_SLUG_TO_KEY: Record<string, EntityType> = {
  agential: 'agential',
  place: 'spatial',
  spatial: 'spatial',
};

/** Allowed URL slugs for /entity/[id] */
export const ENTITY_TYPE_SLUGS = ['agential', 'place'] as const;

export function describeValue(
  record: EntityRecord | undefined
): string | undefined {
  if (!record?.description) return undefined;
  if (typeof record.description === 'string') return record.description;
  return record.description.value;
}
