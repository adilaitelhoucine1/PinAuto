CREATE TABLE IF NOT EXISTS image_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name VARCHAR(255) NOT NULL,
  original_name VARCHAR(255) NOT NULL,
  file_path VARCHAR(500) NOT NULL,
  mime_type VARCHAR(50) NOT NULL,
  size BIGINT NOT NULL,
  width INTEGER,
  height INTEGER,
  status VARCHAR(50) DEFAULT 'uploaded',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS pin_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  destination_url VARCHAR(500) NOT NULL,
  board_name VARCHAR(255) NOT NULL,
  keywords TEXT[] DEFAULT '{}',
  alt_text TEXT,
  tags TEXT[] DEFAULT '{}',
  schedule_date TIMESTAMPTZ,
  notes TEXT,
  status VARCHAR(50) DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS pin_campaign_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES pin_campaigns(id) ON DELETE CASCADE,
  image_id UUID NOT NULL REFERENCES image_assets(id) ON DELETE CASCADE,
  sort_order INTEGER DEFAULT 0
);
