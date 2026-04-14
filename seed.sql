-- 1. Create the bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
    "id" text PRIMARY KEY,
    "name" text NOT NULL,
    "email" text NOT NULL,
    "whatsapp" text,
    "department" text,
    "podcastTitle" text NOT NULL,
    "description" text,
    "podType" text,
    "participants" integer,
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
INSERT INTO public.bookings ("id", "name", "email", "whatsapp", "department", "podcastTitle", "description", "podType", "participants", "date", "time", "status", "createdAt")
VALUES 
('demo_1', 'Kai Foster', 'kai.foster@knust.edu.gh', '+233 24 111 2222', 'Dept. of Computer Engineering', 'Crypto Daily', 'Exploring the latest trends in cryptocurrency and blockchain technology for students.', 'One-on-One', 2, '2026-04-10', '06:00 PM', 'Published', '2026-03-01T08:00:00Z'),
('demo_2', 'River Reed', 'river.reed@knust.edu.gh', '+233 20 333 4444', 'KNUST Counselling Centre', 'Personal Finance', 'Tips and strategies for managing personal finances as a university student.', 'One-on-One', 2, '2026-04-10', '09:00 AM', 'Published', '2026-03-01T08:00:00Z'),
('demo_3', 'Camden Bell', 'camden.bell@knust.edu.gh', '+233 55 555 6666', 'Dept. of Computer Science', 'Tech Talk Weekly', 'Weekly deep dives into emerging technologies and their impact on education.', 'Group', 4, '2026-04-11', '04:00 PM', 'Editing', '2026-03-01T08:00:00Z'),
('demo_4', 'Morgan Chase', 'morgan.chase@knust.edu.gh', '+233 24 777 8888', 'Dept. of History & Political Studies', 'History Mysteries', 'Uncovering fascinating historical events and their relevance to modern Ghana.', 'One-on-One', 2, '2026-04-11', '03:00 PM', 'Recorded', '2026-03-01T08:00:00Z'),
('demo_5', 'Taylor Nguyen', 'taylor.nguyen@knust.edu.gh', '+233 50 999 0000', 'Office of the Dean of Students', 'Student Life Unplugged', 'Discussing campus life, challenges, and opportunities for KNUST students.', 'Group', 5, '2026-04-12', '04:00 PM', 'Booked', '2026-03-01T08:00:00Z'),
('demo_6', 'Drew Evans', 'drew.evans@knust.edu.gh', '+233 20 111 3333', 'Dept. of Electrical Engineering', 'Tech Talk Weekly', 'Innovations in electrical engineering and renewable energy solutions.', 'One-on-One', 2, '2026-04-12', '12:00 PM', 'Booked', '2026-03-01T08:00:00Z'),
('demo_7', 'Jordan Lee', 'jordan.lee@knust.edu.gh', '+233 24 444 5555', 'Dept. of Food Science', 'Chef Secrets', 'Exploring food science research and traditional Ghanaian cuisine preservation.', 'Group', 3, '2026-04-13', '08:00 AM', 'Booked', '2026-03-01T08:00:00Z'),
('demo_8', 'Avery Clark', 'avery.clark@knust.edu.gh', '+233 55 666 7777', 'Dept. of Biological Sciences', 'The Science Hour', 'Breaking down complex scientific discoveries for everyday understanding.', 'One-on-One', 2, '2026-04-13', '04:00 PM', 'Booked', '2026-03-01T08:00:00Z'),
('demo_9', 'Alex Rivera', 'alex.rivera@knust.edu.gh', '+233 50 888 9999', 'Dept. of Food Science', 'Chef Secrets', 'Interviews with top chefs and food scientists about future food trends.', 'Group', 4, '2026-04-14', '01:00 PM', 'Booked', '2026-03-01T08:00:00Z'),
('demo_10', 'Morgan Chase', 'morgan.chase2@knust.edu.gh', '+233 20 222 4444', 'Dept. of Sports & Exercise Science', 'Fitness Forward', 'Discussing the science behind athletic performance and student wellness.', 'One-on-One', 2, '2026-04-14', '05:00 PM', 'Booked', '2026-03-01T08:00:00Z'),
('demo_11', 'Finley Moore', 'finley.moore@knust.edu.gh', '+233 24 555 6666', 'Dept. of History & Political Studies', 'History Mysteries', 'Exploring pre-colonial Ashanti Kingdom history and governance systems.', 'One-on-One', 2, '2026-04-15', '04:00 PM', 'Booked', '2026-03-01T08:00:00Z'),
('demo_12', 'Sam Torres', 'sam.torres@knust.edu.gh', '+233 55 777 8888', 'Office of the URO', 'Research Spotlight', 'Highlighting groundbreaking research projects from KNUST departments.', 'Group', 6, '2026-04-15', '03:00 PM', 'Booked', '2026-03-01T08:00:00Z'),
('demo_13', 'Quinn Hayes', 'quinn.hayes@knust.edu.gh', '+233 50 999 1111', 'Dept. of Communication Design', 'Design Principles', 'Modern design thinking and its application in African visual communication.', 'One-on-One', 2, '2026-04-18', '09:00 AM', 'Booked', '2026-03-01T08:00:00Z'),
('demo_14', 'Rory Sanders', 'rory.sanders@knust.edu.gh', '+233 20 333 5555', 'University Health Services', 'Health & Wellness', 'Student health awareness, mental wellness, and campus health resources.', 'Group', 3, '2026-04-18', '05:00 PM', 'Booked', '2026-03-01T08:00:00Z'),
('demo_15', 'Quinn Hayes', 'quinn.hayes2@knust.edu.gh', '+233 24 666 7777', 'KNUST Business School', 'Marketing Metrics', 'Data-driven marketing strategies for student-led businesses in Ghana.', 'One-on-One', 2, '2026-04-20', '10:00 AM', 'Booked', '2026-03-01T08:00:00Z'),
('demo_16', 'Morgan Chase', 'morgan.chase3@knust.edu.gh', '+233 55 888 9999', 'Dept. of Computer Science', 'Code & Coffee', 'Casual conversations about coding culture, open source, and tech careers.', 'Group', 5, '2026-04-22', '09:00 AM', 'Booked', '2026-03-01T08:00:00Z'),
('demo_17', 'Avery Clark', 'avery.clark2@knust.edu.gh', '+233 50 111 2222', 'Dept. of Sports & Exercise Science', 'Fitness Forward', 'Exercise routines and nutrition plans tailored for busy university students.', 'One-on-One', 2, '2026-04-22', '04:00 PM', 'Booked', '2026-03-01T08:00:00Z'),
('demo_18', 'Dana Smith', 'dana.smith@knust.edu.gh', '+233 20 444 5555', 'Dept. of Computer Science', 'Indie Game Devs', 'Spotlight on student game developers and the growing gaming industry in Africa.', 'Group', 4, '2026-04-28', '01:00 PM', 'Booked', '2026-03-01T08:00:00Z'),
('demo_19', 'Casey Kim', 'casey.kim@knust.edu.gh', '+233 24 777 8888', 'Dept. of English', 'Creative Conversations', 'Discussions on literature, creative writing, and storytelling across cultures.', 'One-on-One', 2, '2026-04-29', '09:00 AM', 'Booked', '2026-03-01T08:00:00Z'),
('demo_20', 'Blake Wilson', 'blake.wilson@knust.edu.gh', '+233 55 999 0000', 'Dept. of Architecture', 'Design Principles', 'Exploring sustainable architecture and inclusive design in West Africa.', 'Group', 3, '2026-04-30', '03:00 PM', 'Booked', '2026-03-01T08:00:00Z');
