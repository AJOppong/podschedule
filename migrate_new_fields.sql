-- Add new columns to the bookings table
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS whatsapp TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS department TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS "podType" TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS participants INTEGER;
