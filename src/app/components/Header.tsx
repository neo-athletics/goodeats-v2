import React from "react";
import Link from "next/link";
import styles from "../page.module.css";

const Header = () => {
    return (
        <nav className={styles.nav}>
            <Link href={"/"}>Home</Link>
            <Link href={"/favorites"}>Favorites</Link>
        </nav>
    );
};

export default Header;
