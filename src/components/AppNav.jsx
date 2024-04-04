import styles from './AppNav.module.css'
import { Link, NavLink } from 'react-router-dom'
export default function AppNav() {
  return (
    <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink to='cities'>Cities</NavLink>
          </li>
          <li>
            <NavLink to='countries'>Countries</NavLink>
          </li>
        </ul>
    </nav>
  )
}
