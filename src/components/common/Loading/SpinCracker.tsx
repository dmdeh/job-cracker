import Image from "next/image";
import styles from "./SpinCracker.module.css";

const SpinCracker = () => {
  return (
    <Image
      src="/spinCracker.gif"
      width={200}
      height={200}
      alt="spincracker"
      priority
      className={styles.cracker}
    />
  );
};

export default SpinCracker;
