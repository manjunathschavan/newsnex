import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import countries from "./countries";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const categories = ["business", "entertainment", "general", "health", "science", "sports", "technology"];

const categoryIcons = {
  business: "💼", entertainment: "🎬", general: "🌐",
  health: "🏥", science: "🔬", sports: "⚽", technology: "💻"
};

function Header() {
  const [active, setActive] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const { darkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const closeAll = () => {
    setActive(false);
    setShowCategoryDropdown(false);
    setShowCountryDropdown(false);
  };

  return (
    <header>
      {/* Breaking news ticker */}
      <div className="ticker-wrap flex items-center" style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 20 }}>
        <span className="ticker-label">Breaking</span>
        <span className="ticker-content">
          Live updates from around the world &nbsp;•&nbsp; Politics &nbsp;•&nbsp; Business &nbsp;•&nbsp; Technology &nbsp;•&nbsp; Sports &nbsp;•&nbsp; Health &nbsp;•&nbsp; Science &nbsp;•&nbsp; Entertainment &nbsp;•&nbsp; Stay informed with NewsNex
        </span>
      </div>

      <nav className="fixed left-0 w-full z-20 flex items-center justify-between px-6 md:px-12" style={{ top: '32px' }}>
        {/* Brand */}
        <Link to="/" className="nav-brand no-underline" onClick={closeAll}>
          News<span>Nex</span>
        </Link>

        {/* Nav links */}
        <ul className={active ? "nav-ul flex gap-8 md:gap-10 active" : "nav-ul flex gap-8 md:gap-10"}>
          <li>
            <Link className="no-underline font-semibold" to="/" onClick={closeAll}>Home</Link>
          </li>
          <li>
            <Link className="no-underline font-semibold" to="/all-news" onClick={closeAll}>All News</Link>
          </li>

          {/* Categories dropdown */}
          <li className="dropdown-li">
            <Link
              className="no-underline font-semibold flex items-center gap-2"
              onClick={() => { setShowCategoryDropdown(!showCategoryDropdown); setShowCountryDropdown(false); }}
            >
              Headlines <FontAwesomeIcon className={showCategoryDropdown ? "down-arrow-icon down-arrow-icon-active" : "down-arrow-icon"} icon={faCircleArrowDown} />
            </Link>
            <ul className={showCategoryDropdown ? "dropdown show-dropdown" : "dropdown"}>
              {categories.map((cat, i) => (
                <li key={i} onClick={closeAll}>
                  <Link to={`/top-headlines/${cat}`} className="capitalize">
                    <span>{categoryIcons[cat]}</span> {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          {/* Country dropdown */}
          <li className="dropdown-li">
            <Link
              className="no-underline font-semibold flex items-center gap-2"
              onClick={() => { setShowCountryDropdown(!showCountryDropdown); setShowCategoryDropdown(false); }}
            >
              Country <FontAwesomeIcon className={showCountryDropdown ? "down-arrow-icon down-arrow-icon-active" : "down-arrow-icon"} icon={faCircleArrowDown} />
            </Link>
            <ul className={showCountryDropdown ? "dropdown show-dropdown" : "dropdown"}>
              {countries.map((el, i) => (
                <li key={i} onClick={closeAll}>
                  <Link to={`/country/${el?.iso_2_alpha}`} className="flex gap-3 items-center">
                    <img src={el?.png} srcSet={`https://flagcdn.com/32x24/${el?.iso_2_alpha}.png 2x`} alt={el?.countryName} style={{ width: 22, height: 16, objectFit: 'cover', borderRadius: 2 }} />
                    <span>{el?.countryName}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          {/* Bookmarks */}
          {user && (
            <li>
              <Link className="no-underline font-semibold flex items-center gap-1" to="/bookmarks" onClick={closeAll}>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                Saved
              </Link>
            </li>
          )}

          {/* Auth */}
          <li>
            {user ? (
              <button onClick={() => { if (window.confirm('Are you sure you want to logout?')) { logout(); navigate('/'); closeAll(); } }} style={{
                background: 'var(--accent)', color: '#fff', padding: '7px 16px',
                borderRadius: '6px', border: 'none', fontWeight: 600,
                fontSize: '0.82rem', cursor: 'pointer'
              }}>
                Logout
              </button>
            ) : (
              <Link to="/auth" onClick={closeAll} style={{
                background: 'var(--accent)', color: '#fff', padding: '7px 16px',
                borderRadius: '6px', fontWeight: 600, fontSize: '0.82rem',
                textDecoration: 'none'
              }}>
                Login
              </Link>
            )}
          </li>

          {/* Theme toggle */}
          <li className="flex items-center">
            <input type="checkbox" className="checkbox" id="checkbox" checked={darkMode} onChange={toggleTheme} />
            <label htmlFor="checkbox" className="checkbox-label">
              <i className="fas fa-moon"></i>
              <i className="fas fa-sun"></i>
              <span className="ball"></span>
            </label>
          </li>
        </ul>

        {/* Hamburger */}
        <div className={active ? "ham-burger ham-open" : "ham-burger"} onClick={() => setActive(!active)}>
          <span className="lines line-1"></span>
          <span className="lines line-2"></span>
          <span className="lines line-3"></span>
        </div>
      </nav>
    </header>
  );
}

export default Header;
