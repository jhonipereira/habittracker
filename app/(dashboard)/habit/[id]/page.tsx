import MissionCard from "@/components/MissionCard";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";

const getData = async (id) => {
    const user = await getUserFromCookie(cookies())
    const habit = await db.habit.findFirst({
        where:{
            id,
            ownerId: user?.id
        },
        include:{
            missions: true
        }
    })

    return habit
}

export default async function HabitPage({params}){
    const habit = await getData(params.id)

    return (
        <div className="h-full overflow-y-auto pr-6 w-full">
            <MissionCard missions={habit?.missions} title={habit?.name} />
        </div>
    )
}