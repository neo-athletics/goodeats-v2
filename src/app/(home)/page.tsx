import styles from "../page.module.css";
import SearchAndFilter from "../components/SearchAndFilter";
import Restaurants from "./Restaurants";

export default function Home({ searchParams }) {
    return (
        <main className={styles.main}>
            <SearchAndFilter />
            {/* @ts-expect-error Async Server Component */}
            <Restaurants searchParams={searchParams} />
        </main>
    );
}
