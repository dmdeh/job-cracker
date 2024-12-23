"use client";

import styles from "./page.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className={styles.page}>
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>JOB Cracker</h1>
      </div>
      <Image
        src="/cracker.png"
        alt="cracker"
        width={500}
        height={500}
        priority
      />
      <button
        className={styles.button}
        onClick={() => router.push("/selection/developer")}
      >
        시작하기
      </button>
    </main>
  );
}
