import { useState } from 'react';
import { motion } from 'motion/react';
import styles from './BookingCalendar.module.css';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// TODO: Replace with your Calendly/Cal.com link
const BOOKING_URL = 'https://calendly.com/chideraibe482005/30min';

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function BookingCalendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDay(null);
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDay(null);
  };

  const isToday = (day: number) =>
    day === today.getDate() &&
    currentMonth === today.getMonth() &&
    currentYear === today.getFullYear();

  const isPast = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return date < todayStart;
  };

  const handleDayClick = (day: number) => {
    if (!isPast(day)) {
      setSelectedDay(day);
    }
  };

  const handleBook = () => {
    window.open(BOOKING_URL, '_blank', 'noopener,noreferrer');
  };

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <motion.div
      className={styles.calendar}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className={styles.header}>
        <button className={styles.navBtn} onClick={prevMonth} aria-label="Previous month">
          &lsaquo;
        </button>
        <span className={styles.monthLabel}>
          {MONTHS[currentMonth]} {currentYear}
        </span>
        <button className={styles.navBtn} onClick={nextMonth} aria-label="Next month">
          &rsaquo;
        </button>
      </div>

      <div className={styles.dayNames}>
        {DAYS.map((d) => (
          <span key={d} className={styles.dayName}>{d}</span>
        ))}
      </div>

      <div className={styles.grid}>
        {cells.map((day, i) => (
          <button
            key={i}
            className={`${styles.cell} ${day === null ? styles.empty : ''} ${day && isToday(day) ? styles.today : ''} ${day && selectedDay === day ? styles.selected : ''} ${day && isPast(day) ? styles.past : ''}`}
            onClick={() => day && handleDayClick(day)}
            disabled={day === null || isPast(day)}
          >
            {day}
          </button>
        ))}
      </div>

      <button className={styles.bookBtn} onClick={handleBook}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" />
        </svg>
        {selectedDay
          ? `Book a call · ${MONTHS[currentMonth]} ${selectedDay}`
          : 'Book a call'}
      </button>
    </motion.div>
  );
}
