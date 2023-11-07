import Link from "next/link";
import styles from "./index.module.css";
// import Image from "next/image";

export default function NavMenu() {
  return (
    <nav className={styles.nav}>
      <h1>Assessments</h1>
      <ul className={styles.links}>
        <li>
          <Link href={"/editor"}>Editor</Link>
        </li>
        <li>
          <Link href={"/form"}>Form</Link>
        </li>
      </ul>
    </nav>
  );
}
