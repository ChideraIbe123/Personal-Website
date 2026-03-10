import { NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

const routes = [
  { path: '/', label: 'Home' },
  { path: '/projects', label: 'Projects' },
  { path: '/publications', label: 'Publications' },
  { path: '/experience', label: 'Experience' },
  { path: '/about', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <nav className={styles.nav}>
      <NavLink to="/" className={styles.logo}>
        CI.
      </NavLink>
      <button
        className={`${styles.menuBtn} ${open ? styles.menuBtnOpen : ''}`}
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>
      <div className={`${styles.links} ${open ? styles.linksOpen : ''}`}>
        {routes.map((r) => (
          <NavLink
            key={r.path}
            to={r.path}
            end={r.path === '/'}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.linkActive : ''}`
            }
          >
            {r.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
