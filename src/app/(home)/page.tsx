import styles from "../page.module.css";
import SearchAndFilter from "../components/SearchAndFilter";

export default function Home() {
    return (
        <main className={styles.main}>
            <SearchAndFilter />
        </main>
    );
}
