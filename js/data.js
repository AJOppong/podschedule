// ─── PodSchedule Data Layer ───────────────────────────────────────────────────
// Data is persisted in Supabase under the "bookings" table

(function() {

const SUPABASE_URL = 'https://ukwdxrireauvimdnepra.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrd2R4cmlyZWF1dmltZG5lcHJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2MjE4MDgsImV4cCI6MjA5MDE5NzgwOH0.0Lac_F6k6Mi8NNwqSw3tKxKii9xYheEq7yjbToFewgU';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const TIME_SLOTS = [
  '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM',
  '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM'
];

const STATUSES = ['Booked', 'Recorded', 'Editing', 'Published'];

function initData() {
  // No longer needed for Supabase. Kept for backwards UI compatibility.
}

async function getBookings() {
  const { data, error } = await supabase.from('bookings').select('*');
  if (error) {
    console.error('Error fetching bookings:', error);
    return [];
  }
  return data || [];
}

async function addBooking({ name, email, podcastTitle, date, time }) {
  const id = 'b' + Date.now();
  const booking = { id, name, email, podcastTitle, date, time, status: 'Booked', createdAt: new Date().toISOString() };
  
  const { data, error } = await supabase.from('bookings').insert([booking]).select();
  if (error) {
    console.error('Error adding booking:', error);
    return null;
  }
  return data[0];
}

async function isSlotAvailable(date, time) {
  const { data, error } = await supabase
    .from('bookings')
    .select('id')
    .eq('date', date)
    .eq('time', time);
    
  if (error) {
     console.error('Error checking availability:', error);
     return false; // Fail safe
  }
  return data.length === 0;
}

async function updateStatus(id, status) {
  const { data, error } = await supabase
    .from('bookings')
    .update({ status: status })
    .eq('id', id);
  if (error) {
    console.error('Error updating status:', error);
    return false;
  }
  return true;
}

async function deleteBooking(id) {
  const { error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', id);
  if (error) {
    console.error('Error deleting booking:', error);
  }
}

async function getBookingById(id) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('id', id)
    .single();
  if (error) return null;
  return data;
}

async function getBookingsForDate(date) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('date', date);
  if (error) return [];
  return data;
}

async function getStats() {
  const bookings = await getBookings();
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];
  return {
    total: bookings.length,
    upcoming: bookings.filter(b => b.date >= todayStr && b.status === 'Booked').length,
    editing: bookings.filter(b => b.status === 'Editing').length,
    published: bookings.filter(b => b.status === 'Published').length,
  };
}

async function getSlotsForDate(date) {
  const bookings = await getBookingsForDate(date);
  const bookedTimes = bookings.map(b => b.time);
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

})();
