export const fetchHours = async (id: string) => {
    try {
        const res = await fetch(
            `http://localhost:3000/api/restaurants/hours/?id=${id}`
        );
        if (!res.ok) {
            const error = await res.json();
            throw error;
        }
        const info = await res.json();

        return info;
    } catch (e) {
        console.log(e);
        return e;
    }
};
