import styles from "../page.module.css";
import SearchAndFilter from "../components/SearchAndFilter";
import HandleErrors from "./HandleErrors";

export default function Home({ searchParams }) {
    return (
        <main className={styles.main}>
            <SearchAndFilter />

            {/* @ts-expect-error Async Server Component */}
            <HandleErrors searchParams={searchParams} />
        </main>
    );
}
