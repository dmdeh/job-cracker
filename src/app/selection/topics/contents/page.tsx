"use client";

import { useSearchParams } from "next/navigation";
import styles from "./contents.module.css";

export default function Contents() {
  const searchParams = useSearchParams();
  const contents = searchParams.get("selected")?.split(",") || [];

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>주제를 선택해주세요. </h1>
      </div>
      <div className={styles.grid}></div>
    </div>
  );
}
