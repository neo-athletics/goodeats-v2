import styles from "../page.module.css";
import SearchAndFilter from "../components/SearchAndFilter";
import Restaurants from "./Restaurants";
import StoreInitializer from "../components/StoreInitializer";
import { useStore } from "../store";
export default function Home({ searchParams }) {
    const restaurants = useStore.getState().restaurants;
    return (
        <main className={styles.main}>
            <StoreInitializer restaurants={restaurants} />
            <SearchAndFilter />

            {/* @ts-expect-error Async Server Component */}
            <Restaurants searchParams={searchParams} />
        </main>
    );
}
