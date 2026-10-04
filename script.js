// Mobile menu toggle
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu when link clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ===== WELCOME SPLASH — Show Only On Fresh Visit =====
document.addEventListener('DOMContentLoaded', function() {
  const splash = document.getElementById('welcome-splash');
  if (!splash) return; // Skip if not on Home page

  // Check if this is a fresh page load (not from clicking Home)
  const isPageReloaded = performance.getEntriesByType('navigation')[0].type === 'reload';
  const isDirectEntry = performance.getEntriesByType('navigation')[0].type === 'navigate';

  // Show splash only on fresh open/reload
  if (sessionStorage.getItem('splashShown') === 'true' && !isPageReloaded) {
    // Already saw it this session — hide instantly
    splash.style.display = 'none';
    return;
  }

  // Mark as shown for this session
  sessionStorage.setItem('splashShown', 'true');

  // Hide splash after animation
  setTimeout(() => {
    splash.classList.add('hidden');
  }, 2500); // 2.5 seconds — adjust if you want shorter/longer
});

// === FLOATING CALENDAR FUNCTION ===
const dateToggle = document.getElementById('dateToggle');
const calendarPopup = document.getElementById('calendarPopup');
const monthYearEl = document.getElementById('monthYear');
const calendarDatesEl = document.getElementById('calendarDates');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');

let currentDate = new Date();

// Show today's date on the small button
function updateDisplayDate() {
  const now = new Date();
  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  dateToggle.textContent = now.toLocaleDateString('en-PH', options);
}

// Build the calendar
function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  monthYearEl.textContent = 
    new Date(year, month).toLocaleDateString('en-PH', { month: 'long', year: 'numeric' });
  
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const today = new Date();
  
  calendarDatesEl.innerHTML = '';
  
  // Previous month days
  for (let i = firstDay - 1; i >= 0; i--) {
    const span = document.createElement('span');
    span.textContent = daysInPrevMonth - i;
    span.classList.add('other-month');
    calendarDatesEl.appendChild(span);
  }
  
  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const span = document.createElement('span');
    span.textContent = day;
    if (day === today.getDate() && 
        month === today.getMonth() && 
        year === today.getFullYear()) {
      span.classList.add('today');
    }
    calendarDatesEl.appendChild(span);
  }
}

// Toggle open/close
dateToggle.addEventListener('click', () => {
  calendarPopup.classList.toggle('show');
});

// Month navigation
prevMonthBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextMonthBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

// Start
updateDisplayDate();
renderCalendar();

// === SLIDE-OUT UPDATES PANEL ===
const updatesToggle = document.getElementById('updatesToggle');
const updatesDrawer = document.getElementById('updatesDrawer');
const toggleLabel = document.getElementById('toggleLabel');

updatesToggle.addEventListener('click', () => {
  updatesDrawer.classList.toggle('open');
  // Rotate label text when open
  if (updatesDrawer.classList.contains('open')) {
    toggleLabel.textContent = 'Close';
  } else {
    toggleLabel.textContent = 'Updates';
  }
});

