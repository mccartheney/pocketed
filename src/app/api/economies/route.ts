import { NextRequest, NextResponse } from "next/server";
import HandleEconomie from "@/utils/handles/handleEconomie";
import { historicType } from "@/types/economieTypes";
import economyType from "@/types/economieTypes";
const GET = async ( req: NextRequest ) => {

    // get the search params
    const { searchParams } = new URL(req.url);
    const allEconomies = searchParams.get("allEconomies");
    const economieId = searchParams.get("economieId");

    // if no search params are provided, return an error
    if (!economieId && !allEconomies) return NextResponse.json({ message: "Economie ID or allEconomies is required", status: 400 });

    // if allEconomies is true, get all economies
    if (allEconomies) {
        const handleEconomie = new HandleEconomie();
        const economies = await handleEconomie.getEconomies(Number(economieId));
        return NextResponse.json({ message: "Economies found", status: 200, economies });
    }

    // if economieId is provided, get the economy
    const handleEconomie = new HandleEconomie();
    const economy = await handleEconomie.getEconomie(Number(economieId));

    // if the economy is not found, return an error
    if (!economy) return NextResponse.json({ message: "Economie not found", status: 404 });

    // return the economy
    return NextResponse.json({ message: "Economie found", status: 200, economy });
}

const POST = async ( req: NextRequest ) => {
    const body = await req.json();
    const { historic, economy, economyId } : { historic: historicType, economy: economyType, economyId: number } = body;


    const handleEconomie = new HandleEconomie();

    if (!historic && !economy) return NextResponse.json({ message: "Historic or economy are required", status: 400 });

    if (historic) {
        // create a new historic
        const newHistoric = await handleEconomie.addHistoric(economyId, historic);

        // if the historic is not added, return an error
        if (!newHistoric) return NextResponse.json({ message: "Historic not added", status: 400 });

        // return the new historic
        return NextResponse.json({ message: "Historic added", status: 200, newHistoric });
    }

    if (economy) {
        // create a new economy
        const newEconomy = await handleEconomie.createEconomy(economy);

        // if the economy is not added, return an error
        if (newEconomy === "economy already exists") return NextResponse.json({ message: "Economie already exists", status: 400 });

        // return the new economy
        return NextResponse.json({ message: "Economie created", status: 200, newEconomy });
    }

    return NextResponse.json({ message: "No data provided", status: 400 });
}

const DELETE = async ( req: NextRequest ) => {
    const body = await req.json();
    const { historicId, economyId } = body

    if (!historicId && !economyId) return NextResponse.json({ message: "Historic ID or economy ID is required", status: 400 });

    if (historicId) {
        const handleEconomie = new HandleEconomie();
        const deletedHistoric = await handleEconomie.deleteHistoric(historicId);

        // if the historic is not deleted, return an error
        if (!deletedHistoric) return NextResponse.json({ message: "Historic not deleted", status: 400 });

        // return the deleted historic
        return NextResponse.json({ message: "Historic deleted", status: 200, deletedHistoric });
    }

    if (economyId) {
        const handleEconomie = new HandleEconomie();
        const deletedEconomy = await handleEconomie.deleteEconomy(economyId);

        if (!deletedEconomy) return NextResponse.json({ message: "Economie not deleted", status: 400 });

        return NextResponse.json({ message: "Economie deleted", status: 200, deletedEconomy });
    }
}

export { GET, POST, DELETE };