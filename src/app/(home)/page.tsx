import styles from "../page.module.css";
import SearchAndFilter from "../components/SearchAndFilter";
import Restaurants from "./Restaurants";
import StoreInitializer from "../components/StoreInitializer";
import { useStore } from "../store";
export default function Home({ searchParams }) {
    const restaurants = useStore.getState().restaurants;
    const favorites = useStore.getState().favorites;
    console.log(useStore.getState().favorites, "init", restaurants[0]);
    return (
        <main className={styles.main}>
            <StoreInitializer restaurants={restaurants} favorites={favorites} />
            <SearchAndFilter />

            {/* @ts-expect-error Async Server Component */}
            <Restaurants searchParams={searchParams} />
        </main>
    );
}
