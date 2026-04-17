/**
 * Entity data helpers — backed by the D1 `entities` table.
 * Replaces the previous `public/data/entity.json` loader.
 */
import { getEntity, listEntities, type EntityRow } from '@/lib/db';

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

function rowToEntity(row: EntityRow): EntityRecord {
  const rec: EntityRecord = { id: row.id, value: row.value };
  if (row.image) rec.image = row.image;
  if (row.description) rec.description = row.description;
  return rec;
}

/**
 * Convenience wrapper that returns the same shape callers used to expect,
 * fetching both types in parallel. Callers that only need one type should
 * prefer `getEntityList(type)`.
 */
export async function loadEntityData(): Promise<EntityData> {
  const [agential, spatial] = await Promise.all([
    getEntityList('agential'),
    getEntityList('spatial'),
  ]);
  return { agential, spatial };
}

export async function getEntityList(
  type: EntityType,
  limit = 10000
): Promise<EntityRecord[]> {
  const rows = await listEntities(type, limit, 0);
  return rows.map(rowToEntity);
}

export async function getEntityRecord(
  type: EntityType,
  id: string
): Promise<EntityRecord | null> {
  const row = await getEntity(type, id);
  return row ? rowToEntity(row) : null;
}

export function describeValue(
  record: EntityRecord | undefined | null
): string | undefined {
  if (!record?.description) return undefined;
  if (typeof record.description === 'string') return record.description;
  return record.description.value;
}
