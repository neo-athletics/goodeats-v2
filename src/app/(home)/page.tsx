import styles from "../page.module.css";
import Restaurants from "./Restaurants";
import SearchAndFilter from "../components/SearchAndFilter";

export default function Home() {
    return (
        <main className={styles.main}>
            <SearchAndFilter />
            {/* @ts-expect-error Async Server Component */}
            {/* <Restaurants /> */}
        </main>
    );
}
