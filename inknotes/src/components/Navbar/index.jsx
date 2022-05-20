import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar(){
  return(
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink
          to="/"
          className={styles.brand}
        >
          InkNotes
        </NavLink>

        <ul className={styles.links}>
          <li>
            <NavLink
              to="/"
              className={styles.link}
            >
              Home
            </NavLink>
          </li>
          
          <li>
            <NavLink
              to="/create"
              className={styles.link}
            >
              Create
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}