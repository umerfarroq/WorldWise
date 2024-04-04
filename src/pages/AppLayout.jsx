import Slidebar from "../components/Slidebar";
import styles from "./AppLayout.module.css";
import Map from "../components/Map";
import User from "../components/User";
export default function AppLayout() {
  return (
    <div className={styles.app}>
      <Slidebar />
      <Map />
      <User />
    </div>
  );
}
