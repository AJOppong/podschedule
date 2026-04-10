-- 1. Create the bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
    "id" text PRIMARY KEY,
    "name" text NOT NULL,
    "email" text NOT NULL,
    "podcastTitle" text NOT NULL,
    "date" text NOT NULL,
    "time" text NOT NULL,
    "status" text NOT NULL,
    "createdAt" timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Turn off Row Level Security so the frontend can read/write without user authentication
ALTER TABLE public.bookings DISABLE ROW LEVEL SECURITY;

-- 3. Clear any existing data if it exists
TRUNCATE TABLE public.bookings;

-- 4. Inject Demo Data
INSERT INTO public.bookings ("id", "name", "email", "podcastTitle", "date", "time", "status", "createdAt")
VALUES 
('demo_1', 'Kai Foster', 'user12@email.com', 'Crypto Daily', '2026-04-10', '06:00 PM', 'Published', '2026-03-01T08:00:00Z'),
('demo_2', 'River Reed', 'user17@email.com', 'Personal Finance', '2026-04-10', '09:00 AM', 'Published', '2026-03-01T08:00:00Z'),
('demo_3', 'Camden Bell', 'user48@email.com', 'Tech Talk Weekly', '2026-04-11', '04:00 PM', 'Editing', '2026-03-01T08:00:00Z'),
('demo_4', 'Morgan Chase', 'user55@email.com', 'History Mysteries', '2026-04-11', '03:00 PM', 'Recorded', '2026-03-01T08:00:00Z'),
('demo_5', 'Taylor Nguyen', 'user14@email.com', 'History Mysteries', '2026-04-12', '04:00 PM', 'Booked', '2026-03-01T08:00:00Z'),
('demo_6', 'Drew Evans', 'user41@email.com', 'Tech Talk Weekly', '2026-04-12', '12:00 PM', 'Booked', '2026-03-01T08:00:00Z'),
('demo_7', 'Jordan Lee', 'user24@email.com', 'Chef Secrets', '2026-04-13', '08:00 AM', 'Booked', '2026-03-01T08:00:00Z'),
('demo_8', 'Avery Clark', 'user25@email.com', 'The Science Hour', '2026-04-13', '04:00 PM', 'Booked', '2026-03-01T08:00:00Z'),
('demo_9', 'Alex Rivera', 'user78@email.com', 'Chef Secrets', '2026-04-14', '01:00 PM', 'Booked', '2026-03-01T08:00:00Z'),
('demo_10', 'Morgan Chase', 'user80@email.com', 'Fitness Forward', '2026-04-14', '05:00 PM', 'Booked', '2026-03-01T08:00:00Z'),
('demo_11', 'Finley Moore', 'user44@email.com', 'History Mysteries', '2026-04-15', '04:00 PM', 'Booked', '2026-03-01T08:00:00Z'),
('demo_12', 'Sam Torres', 'user54@email.com', 'History Mysteries', '2026-04-15', '03:00 PM', 'Booked', '2026-03-01T08:00:00Z'),
('demo_13', 'Quinn Hayes', 'user67@email.com', 'Design Principles', '2026-04-18', '09:00 AM', 'Booked', '2026-03-01T08:00:00Z'),
('demo_14', 'Rory Sanders', 'user75@email.com', 'Health & Wellness', '2026-04-18', '05:00 PM', 'Booked', '2026-03-01T08:00:00Z'),
('demo_15', 'Quinn Hayes', 'user36@email.com', 'Marketing Metrics', '2026-04-20', '10:00 AM', 'Booked', '2026-03-01T08:00:00Z'),
('demo_16', 'Morgan Chase', 'user53@email.com', 'Code & Coffee', '2026-04-22', '09:00 AM', 'Booked', '2026-03-01T08:00:00Z'),
('demo_17', 'Avery Clark', 'user4@email.com', 'Fitness Forward', '2026-04-22', '04:00 PM', 'Booked', '2026-03-01T08:00:00Z'),
('demo_18', 'Dana Smith', 'user32@email.com', 'Indie Game Devs', '2026-04-28', '01:00 PM', 'Booked', '2026-03-01T08:00:00Z'),
('demo_19', 'Casey Kim', 'user60@email.com', 'Creative Conversations', '2026-04-29', '09:00 AM', 'Booked', '2026-03-01T08:00:00Z'),
('demo_20', 'Blake Wilson', 'user3@email.com', 'Design Principles', '2026-04-30', '03:00 PM', 'Booked', '2026-03-01T08:00:00Z');
