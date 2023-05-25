import styles from "../page.module.css";
import SearchAndFilter from "../components/SearchAndFilter";
import Restaurants from "./Restaurants";
import StoreInitializer from "../components/StoreInitializer";
import { useStore } from "../store";
import Test from "../components/test";

export default function Home() {
    const keyterms = useStore.getState().keyterms;
    return (
        <main className={styles.main}>
            <StoreInitializer keyterms={keyterms} />
            <Test />
            <SearchAndFilter />
            {/* @ts-expect-error Async Server Component */}
            <Restaurants />
        </main>
    );
}
