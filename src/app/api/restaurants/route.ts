import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const location = searchParams.get("location");
    const food = searchParams.get("term");
    const sort_by = searchParams.get("sort_by");

    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: "Bearer " + process.env.YELP_API_KEY,
        },
    };

    //check for input of the searchparams

    try {
        const res = await fetch(
            `https://api.yelp.com/v3/businesses/search?location=${location}&term=${food}&sort_by=${sort_by}&limit=20`,
            options
        );

        if (!res.ok) {
            throw await res.json();
        }
        const data = await res.json();
        return NextResponse.json(data);
    } catch (error: any) {
        console.log(typeof error, "route", error);
        return NextResponse.json(
            { error: error.error.description },
            { status: 500 }
        );
    }
}
