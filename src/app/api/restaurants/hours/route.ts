import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const id = searchParams.get("id");
    console.log(searchParams, id);
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: "Bearer " + process.env.YELP_API_KEY,
        },
    };

    try {
        const res = await fetch(
            `https://api.yelp.com/v3/businesses/${id}`,
            options
        );
        if (!res.ok) {
            throw await res.json();
        }
        const hours = await res.json();

        return NextResponse.json(hours);
    } catch (error) {
        console.log(error);
        return NextResponse.json(error);
    }
}
