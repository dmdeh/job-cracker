import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.page}>
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>
          <span className={styles.mobileTitle}>JOB </span>
          <span className={styles.mobileTitle}>Cracker</span>
        </h1>
      </div>
      <Image
        src="/cracker.png"
        alt="cracker"
        width={500}
        height={500}
        priority
      />
      <Link href="/selection/developer" className={styles.nav}>
        시작하기
      </Link>
    </main>
  );
}
