
import AppNav from './AppNav'
import styles from './Slidebar.module.css'
import Logo from './Logo'
import { Outlet } from 'react-router-dom'
export default function Slidebar() {
  return (
    <div className={styles.sidebar}>
        <Logo/>
        <AppNav/>
        <Outlet/>
        <footer className={styles.footer}>
            <p className={styles.copyright}> &copy:Copyright{new Date().getFullYear()} by WorldWise Inc.</p>
        </footer>
    </div>
  )
}
