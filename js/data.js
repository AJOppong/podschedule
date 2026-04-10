// ─── PodSchedule Data Layer ───────────────────────────────────────────────────
// All data is persisted in localStorage under "podschedule_bookings"

const STORAGE_KEY = 'podschedule_bookings_v3';

const TIME_SLOTS = [
  '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM',
  '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM'
];

const STATUSES = ['Booked', 'Recorded', 'Editing', 'Published'];

// Seed data — expanded for realistic presentation
const SEED_BOOKINGS = [
  {"id":"r11","name":"Kai Foster","email":"user12@email.com","podcastTitle":"Crypto Daily","date":"2026-03-01","time":"06:00 PM","status":"Published","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r16","name":"River Reed","email":"user17@email.com","podcastTitle":"Personal Finance","date":"2026-03-01","time":"09:00 AM","status":"Published","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r47","name":"Camden Bell","email":"user48@email.com","podcastTitle":"Tech Talk Weekly","date":"2026-03-01","time":"04:00 PM","status":"Published","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r54","name":"Morgan Chase","email":"user55@email.com","podcastTitle":"History Mysteries","date":"2026-03-01","time":"03:00 PM","status":"Published","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r13","name":"Taylor Nguyen","email":"user14@email.com","podcastTitle":"History Mysteries","date":"2026-03-02","time":"04:00 PM","status":"Published","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r40","name":"Drew Evans","email":"user41@email.com","podcastTitle":"Tech Talk Weekly","date":"2026-03-02","time":"12:00 PM","status":"Published","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r23","name":"Jordan Lee","email":"user24@email.com","podcastTitle":"Chef Secrets","date":"2026-03-03","time":"08:00 AM","status":"Published","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r24","name":"Avery Clark","email":"user25@email.com","podcastTitle":"The Science Hour","date":"2026-03-03","time":"04:00 PM","status":"Published","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r77","name":"Alex Rivera","email":"user78@email.com","podcastTitle":"Chef Secrets","date":"2026-03-03","time":"01:00 PM","status":"Published","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r79","name":"Morgan Chase","email":"user80@email.com","podcastTitle":"Fitness Forward","date":"2026-03-03","time":"05:00 PM","status":"Published","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r43","name":"Finley Moore","email":"user44@email.com","podcastTitle":"History Mysteries","date":"2026-03-04","time":"04:00 PM","status":"Published","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r53","name":"Sam Torres","email":"user54@email.com","podcastTitle":"History Mysteries","date":"2026-03-04","time":"03:00 PM","status":"Published","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r66","name":"Quinn Hayes","email":"user67@email.com","podcastTitle":"Design Principles","date":"2026-03-05","time":"09:00 AM","status":"Published","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r74","name":"Rory Sanders","email":"user75@email.com","podcastTitle":"Health & Wellness","date":"2026-03-05","time":"05:00 PM","status":"Published","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r35","name":"Quinn Hayes","email":"user36@email.com","podcastTitle":"Marketing Metrics","date":"2026-03-07","time":"10:00 AM","status":"Published","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r52","name":"Morgan Chase","email":"user53@email.com","podcastTitle":"Code & Coffee","date":"2026-03-07","time":"09:00 AM","status":"Published","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r3","name":"Avery Clark","email":"user4@email.com","podcastTitle":"Fitness Forward","date":"2026-03-08","time":"04:00 PM","status":"Published","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r31","name":"Dana Smith","email":"user32@email.com","podcastTitle":"Indie Game Devs","date":"2026-03-08","time":"01:00 PM","status":"Published","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r59","name":"Casey Kim","email":"user60@email.com","podcastTitle":"Creative Conversations","date":"2026-03-08","time":"09:00 AM","status":"Published","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r2","name":"Blake Wilson","email":"user3@email.com","podcastTitle":"Design Principles","date":"2026-03-09","time":"03:00 PM","status":"Published","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r15","name":"Avery Clark","email":"user16@email.com","podcastTitle":"Design Principles","date":"2026-03-09","time":"02:00 PM","status":"Published","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r33","name":"Dana Smith","email":"user34@email.com","podcastTitle":"Local Politics","date":"2026-03-09","time":"09:00 AM","status":"Published","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r67","name":"Drew Evans","email":"user68@email.com","podcastTitle":"Startup Stories","date":"2026-03-09","time":"04:00 PM","status":"Published","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r78","name":"Jamie Fox","email":"user79@email.com","podcastTitle":"Real Estate 101","date":"2026-03-09","time":"08:00 AM","status":"Published","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r22","name":"Quinn Hayes","email":"user23@email.com","podcastTitle":"Personal Finance","date":"2026-03-10","time":"05:00 PM","status":"Published","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r30","name":"Ellis Carter","email":"user31@email.com","podcastTitle":"History Mysteries","date":"2026-03-10","time":"08:00 AM","status":"Published","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r48","name":"Jamie Fox","email":"user49@email.com","podcastTitle":"Crypto Daily","date":"2026-03-11","time":"02:00 PM","status":"Published","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r51","name":"Rory Sanders","email":"user52@email.com","podcastTitle":"Culture Deep Dive","date":"2026-03-11","time":"07:00 PM","status":"Published","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r62","name":"Riley Brown","email":"user63@email.com","podcastTitle":"Design Principles","date":"2026-03-11","time":"09:00 AM","status":"Published","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r73","name":"Casey Kim","email":"user74@email.com","podcastTitle":"Modern Architecture","date":"2026-03-11","time":"03:00 PM","status":"Published","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r36","name":"Camden Bell","email":"user37@email.com","podcastTitle":"Crypto Daily","date":"2026-03-12","time":"09:00 AM","status":"Published","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r42","name":"Casey Kim","email":"user43@email.com","podcastTitle":"Culture Deep Dive","date":"2026-03-13","time":"01:00 PM","status":"Published","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r75","name":"Dana Smith","email":"user76@email.com","podcastTitle":"Health & Wellness","date":"2026-03-13","time":"03:00 PM","status":"Published","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r29","name":"Dana Smith","email":"user30@email.com","podcastTitle":"Marketing Metrics","date":"2026-03-14","time":"07:00 PM","status":"Published","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r14","name":"Kai Foster","email":"user15@email.com","podcastTitle":"SaaS Insights","date":"2026-03-15","time":"02:00 PM","status":"Published","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r8","name":"Finley Moore","email":"user9@email.com","podcastTitle":"Crypto Daily","date":"2026-03-16","time":"02:00 PM","status":"Published","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r60","name":"Jules Ford","email":"user61@email.com","podcastTitle":"The Science Hour","date":"2026-03-16","time":"03:00 PM","status":"Published","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r69","name":"Blake Wilson","email":"user70@email.com","podcastTitle":"Health & Wellness","date":"2026-03-16","time":"08:00 AM","status":"Published","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r1","name":"Kai Foster","email":"user2@email.com","podcastTitle":"Design Principles","date":"2026-03-17","time":"10:00 AM","status":"Published","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r9","name":"Taylor Nguyen","email":"user10@email.com","podcastTitle":"Chef Secrets","date":"2026-03-17","time":"04:00 PM","status":"Published","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r20","name":"Drew Evans","email":"user21@email.com","podcastTitle":"SaaS Insights","date":"2026-03-17","time":"08:00 AM","status":"Published","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r32","name":"Riley Brown","email":"user33@email.com","podcastTitle":"Mindset Mastery","date":"2026-03-17","time":"03:00 PM","status":"Published","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r50","name":"Dana Smith","email":"user51@email.com","podcastTitle":"Space Exploration","date":"2026-03-18","time":"12:00 PM","status":"Published","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r5","name":"Finley Moore","email":"user6@email.com","podcastTitle":"Modern Architecture","date":"2026-03-19","time":"02:00 PM","status":"Published","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r19","name":"Rowan Brooks","email":"user20@email.com","podcastTitle":"Indie Game Devs","date":"2026-03-19","time":"03:00 PM","status":"Published","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r46","name":"Taylor Nguyen","email":"user47@email.com","podcastTitle":"Future Computing","date":"2026-03-19","time":"09:00 AM","status":"Published","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r61","name":"Camden Bell","email":"user62@email.com","podcastTitle":"Indie Game Devs","date":"2026-03-19","time":"05:00 PM","status":"Published","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r6","name":"Jordan Lee","email":"user7@email.com","podcastTitle":"Culture Deep Dive","date":"2026-03-20","time":"12:00 PM","status":"Editing","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r64","name":"River Reed","email":"user65@email.com","podcastTitle":"Music Industry Now","date":"2026-03-20","time":"03:00 PM","status":"Editing","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r41","name":"Rowan Brooks","email":"user42@email.com","podcastTitle":"The Science Hour","date":"2026-03-21","time":"08:00 AM","status":"Recorded","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r57","name":"Quinn Hayes","email":"user58@email.com","podcastTitle":"Culture Deep Dive","date":"2026-03-21","time":"12:00 PM","status":"Recorded","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r18","name":"Rory Sanders","email":"user19@email.com","podcastTitle":"Marketing Metrics","date":"2026-03-22","time":"10:00 AM","status":"Editing","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r44","name":"Camden Bell","email":"user45@email.com","podcastTitle":"Health & Wellness","date":"2026-03-22","time":"07:00 PM","status":"Recorded","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r83","name":"Jamie Fox","email":"user84@email.com","podcastTitle":"Code & Coffee","date":"2026-03-22","time":"02:00 PM","status":"Recorded","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r12","name":"Drew Evans","email":"user13@email.com","podcastTitle":"Startup Stories","date":"2026-03-23","time":"07:00 PM","status":"Editing","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r25","name":"Finley Moore","email":"user26@email.com","podcastTitle":"Photography Tips","date":"2026-03-23","time":"08:00 AM","status":"Editing","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r34","name":"Taylor Nguyen","email":"user35@email.com","podcastTitle":"Creative Conversations","date":"2026-03-25","time":"01:00 PM","status":"Recorded","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r38","name":"Camden Bell","email":"user39@email.com","podcastTitle":"Indie Game Devs","date":"2026-03-25","time":"02:00 PM","status":"Recorded","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r27","name":"Skyler Webb","email":"user28@email.com","podcastTitle":"Business Unlocked","date":"2026-03-26","time":"10:00 AM","status":"Recorded","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r55","name":"Casey Kim","email":"user56@email.com","podcastTitle":"Mindset Mastery","date":"2026-03-26","time":"04:00 PM","status":"Recorded","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r65","name":"Alex Rivera","email":"user66@email.com","podcastTitle":"Indie Game Devs","date":"2026-03-28","time":"05:00 PM","status":"Booked","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r81","name":"Jordan Lee","email":"user82@email.com","podcastTitle":"SaaS Insights","date":"2026-03-28","time":"02:00 PM","status":"Booked","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r26","name":"River Reed","email":"user27@email.com","podcastTitle":"Indie Game Devs","date":"2026-03-29","time":"10:00 AM","status":"Booked","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r7","name":"Avery Clark","email":"user8@email.com","podcastTitle":"Marketing Metrics","date":"2026-03-30","time":"08:00 AM","status":"Booked","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r28","name":"Rory Sanders","email":"user29@email.com","podcastTitle":"Design Principles","date":"2026-03-30","time":"06:00 PM","status":"Booked","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r39","name":"Jordan Lee","email":"user40@email.com","podcastTitle":"SaaS Insights","date":"2026-03-30","time":"12:00 PM","status":"Booked","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r71","name":"River Reed","email":"user72@email.com","podcastTitle":"Space Exploration","date":"2026-03-31","time":"01:00 PM","status":"Booked","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r45","name":"Jamie Fox","email":"user46@email.com","podcastTitle":"Design Principles","date":"2026-04-01","time":"12:00 PM","status":"Booked","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r72","name":"Rowan Brooks","email":"user73@email.com","podcastTitle":"Crypto Daily","date":"2026-04-01","time":"10:00 AM","status":"Booked","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r21","name":"Drew Evans","email":"user22@email.com","podcastTitle":"Future Computing","date":"2026-04-02","time":"07:00 PM","status":"Booked","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r76","name":"Sam Torres","email":"user77@email.com","podcastTitle":"Future Computing","date":"2026-04-02","time":"10:00 AM","status":"Booked","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r63","name":"Quinn Hayes","email":"user64@email.com","podcastTitle":"SaaS Insights","date":"2026-04-03","time":"08:00 AM","status":"Booked","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r17","name":"Morgan Chase","email":"user18@email.com","podcastTitle":"Space Exploration","date":"2026-04-04","time":"06:00 PM","status":"Booked","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r10","name":"Casey Kim","email":"user11@email.com","podcastTitle":"Indie Game Devs","date":"2026-04-05","time":"01:00 PM","status":"Booked","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r56","name":"Riley Brown","email":"user57@email.com","podcastTitle":"Design Principles","date":"2026-04-05","time":"09:00 AM","status":"Booked","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r80","name":"Blake Wilson","email":"user81@email.com","podcastTitle":"Real Estate 101","date":"2026-04-05","time":"08:00 AM","status":"Booked","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r68","name":"Ellis Carter","email":"user69@email.com","podcastTitle":"Mindset Mastery","date":"2026-04-06","time":"05:00 PM","status":"Booked","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r82","name":"Rory Sanders","email":"user83@email.com","podcastTitle":"Crypto Daily","date":"2026-04-06","time":"11:00 AM","status":"Booked","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r49","name":"Drew Evans","email":"user50@email.com","podcastTitle":"Music Industry Now","date":"2026-04-07","time":"02:00 PM","status":"Booked","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r4","name":"River Reed","email":"user5@email.com","podcastTitle":"Fitness Forward","date":"2026-04-10","time":"05:00 PM","status":"Booked","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r58","name":"Reese Stone","email":"user59@email.com","podcastTitle":"Real Estate 101","date":"2026-04-11","time":"06:00 PM","status":"Booked","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r37","name":"Elias Vance","email":"user38@email.com","podcastTitle":"Photography Tips","date":"2026-04-12","time":"04:00 PM","status":"Booked","createdAt":"2026-03-01T08:00:00Z"},
  {"id":"r70","name":"Skyler Webb","email":"user71@email.com","podcastTitle":"Photography Tips","date":"2026-04-15","time":"11:00 AM","status":"Booked","createdAt":"2026-03-01T08:00:00Z"}
];

function initData() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_BOOKINGS));
  }
}

function getBookings() {
  initData();
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveBookings(bookings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

function addBooking({ name, email, podcastTitle, date, time }) {
  const bookings = getBookings();
  const id = 'b' + Date.now();
  const booking = { id, name, email, podcastTitle, date, time, status: 'Booked', createdAt: new Date().toISOString() };
  bookings.push(booking);
  saveBookings(bookings);
  return booking;
}

function isSlotAvailable(date, time) {
  const bookings = getBookings();
  return !bookings.some(b => b.date === date && b.time === time);
}

function updateStatus(id, status) {
  const bookings = getBookings();
  const idx = bookings.findIndex(b => b.id === id);
  if (idx !== -1) {
    bookings[idx].status = status;
    saveBookings(bookings);
    return true;
  }
  return false;
}

function deleteBooking(id) {
  const bookings = getBookings().filter(b => b.id !== id);
  saveBookings(bookings);
}

function getBookingById(id) {
  return getBookings().find(b => b.id === id) || null;
}

function getBookingsForDate(date) {
  return getBookings().filter(b => b.date === date);
}

function getStats() {
  const bookings = getBookings();
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];
  return {
    total: bookings.length,
    upcoming: bookings.filter(b => b.date >= todayStr && b.status === 'Booked').length,
    editing: bookings.filter(b => b.status === 'Editing').length,
    published: bookings.filter(b => b.status === 'Published').length,
  };
}

function getSlotsForDate(date) {
  const bookedTimes = getBookingsForDate(date).map(b => b.time);
  return TIME_SLOTS.map(time => ({
    time,
    available: !bookedTimes.includes(time)
  }));
}

function buildGoogleCalendarUrl(booking) {
  const datePart = booking.date.replace(/-/g, '');
  // Parse time to 24h for Google Calendar
  const [timePart, meridiem] = booking.time.split(' ');
  let [hours, minutes] = timePart.split(':').map(Number);
  if (meridiem === 'PM' && hours !== 12) hours += 12;
  if (meridiem === 'AM' && hours === 12) hours = 0;
  const startTime = `${String(hours).padStart(2,'0')}${String(minutes).padStart(2,'0')}00`;
  const endHours = (hours + 1) % 24;
  const endTime = `${String(endHours).padStart(2,'0')}${String(minutes).padStart(2,'0')}00`;
  const title = encodeURIComponent(`Podcast Session: ${booking.podcastTitle}`);
  const details = encodeURIComponent(`Podcast recording session for "${booking.podcastTitle}" by ${booking.name}.`);
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${datePart}T${startTime}/${datePart}T${endTime}&details=${details}`;
}

// Expose globally
window.PodData = {
  TIME_SLOTS, STATUSES,
  getBookings, addBooking, isSlotAvailable,
  updateStatus, deleteBooking, getBookingById,
  getBookingsForDate, getStats, getSlotsForDate,
  buildGoogleCalendarUrl, initData
};
