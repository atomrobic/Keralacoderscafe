import Image from "next/image";
import styles from "./theme-logo.module.css";

type ThemeLogoProps = {
  className?: string;
};

export default function ThemeLogo({ className = "" }: ThemeLogoProps) {
  return (
    <span className={`${styles.shell} ${className}`}>
      <Image
        src="/pdf-ui/logo.png"
        alt=""
        width={143}
        height={65}
        sizes="64px"
        className={`${styles.image} ${styles.logoForLightTheme}`}
      />
      <Image
        src="/pdf-ui/logo-white.png"
        alt=""
        width={143}
        height={65}
        sizes="64px"
        className={`${styles.image} ${styles.logoForDarkTheme}`}
      />
    </span>
  );
}
