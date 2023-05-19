import { NextResponse } from "next/server";

export async function GET() {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: "Bearer " + process.env.YELP_API_KEY,
        },
    };

    const res = await fetch(
        "https://api.yelp.com/v3/businesses/search?location=chicago&open_now=true&sort_by=best_match&limit=20",
        options
    );

    const data = await res.json();
    // console.log(data);

    return NextResponse.json(data);
}

//filter options
/*
location
term
reviews
open status
sort_by :(best_match,rating,distance..)

*/
