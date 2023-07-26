import React from "react";
import styles from "../page.module.css";
const ItemDate = ({ time }) => {
    //24 hour format create function to convert to 12 hour format
    if (time === undefined) return null;

    const openArr = time[0].open;

    const week = [
        { num: 0, day: "Monday" },
        { num: 1, day: "Tuesday" },
        { num: 2, day: "Wednesday" },
        { num: 3, day: "Thursday" },
        { num: 4, day: "Friday" },
        { num: 5, day: "Saturday" },
        { num: 6, day: "Sunday" },
    ];

    function fetchDate(d) {
        const dayOperating = week.find((obj) => obj.num === d);
        return dayOperating?.day;
    }

    function convert24Hour(t) {
        const h = t.substring(0, 2) === "00" ? "12" : t.substring(0, 2);

        const m = t.substring(2, 4);
        const hInt = Number.parseInt(h);
        const meridianT = hInt >= 12 && hInt % 12 != 0 ? "pm" : "am";

        if (hInt >= 12) {
            //do 12 conversion
            const afterH = hInt % 12 === 0 ? 12 : hInt % 12;
            //12||0 is am handle meridian
            return `${afterH}:${m} ${meridianT}`;
        }

        return `${h}:${m} ${meridianT}`;
    }

    return (
        <>
            <ul className={styles.week}>
                {openArr.map((obj, i) => (
                    <li key={i}>
                        {convert24Hour(obj.start)} - {convert24Hour(obj.end)}{" "}
                        <span className={styles.day}>{fetchDate(obj.day)}</span>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default ItemDate;
