-- Items: diary entries from docs.json (~10,872 records)
CREATE TABLE IF NOT EXISTS items (
  id TEXT PRIMARY KEY,
  label TEXT,
  description TEXT,
  xml TEXT,
  agential TEXT,        -- JSON array of person names
  spatial TEXT,         -- JSON array of place names
  temporal TEXT,
  date_lvl0 TEXT,       -- year e.g. "1868"
  date_lvl1 TEXT,       -- year-month e.g. "1868 > 1868-08"
  date_lvl2 TEXT,       -- full date e.g. "1868 > 1868-08 > 1868-08-02"
  category_lvl0 TEXT,
  category_lvl1 TEXT,
  year INTEGER,
  year_and_month TEXT,
  manifest TEXT,
  canvas TEXT,
  source TEXT,
  prev_id TEXT,
  next_id TEXT,
  sort_key TEXT,
  type TEXT
);

CREATE INDEX IF NOT EXISTS idx_items_year ON items(year);
CREATE INDEX IF NOT EXISTS idx_items_date_lvl0 ON items(date_lvl0);
CREATE INDEX IF NOT EXISTS idx_items_category_lvl0 ON items(category_lvl0);
CREATE INDEX IF NOT EXISTS idx_items_type ON items(type);

-- Entities: persons and places from entity.json (~8,079 records)
CREATE TABLE IF NOT EXISTS entities (
  id TEXT NOT NULL,
  type TEXT NOT NULL,   -- 'agential' or 'spatial'
  value INTEGER DEFAULT 0,
  description TEXT,
  image TEXT,
  PRIMARY KEY (type, id)
);

CREATE INDEX IF NOT EXISTS idx_entities_type_value ON entities(type, value DESC);

-- Calendar entries: per-day JSON data (~9,682 records)
CREATE TABLE IF NOT EXISTS calendar_entries (
  date TEXT PRIMARY KEY, -- YYYY-MM-DD
  year INTEGER,
  month INTEGER,
  day INTEGER,
  data TEXT              -- full JSON blob for the day
);

CREATE INDEX IF NOT EXISTS idx_calendar_year_month ON calendar_entries(year, month);

-- Ngram: word frequency data per term per year
CREATE TABLE IF NOT EXISTS ngrams (
  term TEXT NOT NULL,
  year INTEGER NOT NULL,
  freq INTEGER DEFAULT 0,
  PRIMARY KEY (term, year)
);

CREATE INDEX IF NOT EXISTS idx_ngrams_term ON ngrams(term);

-- Ngram yearly totals (for ratio calculation)
CREATE TABLE IF NOT EXISTS ngram_totals (
  year INTEGER PRIMARY KEY,
  total INTEGER DEFAULT 0
);

-- Network: co-occurrence edges between persons
CREATE TABLE IF NOT EXISTS network_edges (
  person1 TEXT NOT NULL,
  person2 TEXT NOT NULL,
  weight INTEGER DEFAULT 0,
  PRIMARY KEY (person1, person2)
);

CREATE INDEX IF NOT EXISTS idx_network_person1 ON network_edges(person1);
CREATE INDEX IF NOT EXISTS idx_network_person2 ON network_edges(person2);

-- AD: archival descriptions
CREATE TABLE IF NOT EXISTS ad_items (
  id TEXT PRIMARY KEY,
  data TEXT              -- full JSON blob
);

-- Full-text search index on items
CREATE VIRTUAL TABLE IF NOT EXISTS items_fts USING fts5(
  id,
  label,
  description,
  agential,
  spatial,
  content='items',
  content_rowid='rowid'
);
