import { delay } from "@/lib/async";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";
import Greetings from "@/components/Greetings";
import GreetingsSkeleton from "@/components/GreetingsSkeleton";
import HabitCard from "@/components/HabitCard";
import MissionCard from "@/components/MissionCard";
import NewHabitModal from "@/components/NewHabitModal";

// TODO make a high order fn to verify authentication (e.g. withAuth)
const getData = async () => {
  await delay(2000);
  const user = await getUserFromCookie(cookies());
  const habits = await db.habit.findMany({
    where: {
      ownerId: user?.id,
    },
    include: {
      missions: true,
    },
  });
  
  return {habits};
};


export default async function Page() {
  
  const {habits} = await getData()

  return (
    <div className="h-full overflow-y-auto pr-6 w-full">
      <div className=" h-full  items-stretch justify-center min-h-[content]">
        <div className="flex-1 grow flex">
            <Suspense fallback={<GreetingsSkeleton/>}>
                <Greetings />
            </Suspense>
        </div>
        <div className="flex flex-2 grow items-center flex-wrap mt-3 -m-3 ">
          {
            habits.map(habit => (
              <div className="w-1/3 p-3" key={habit.id}>
                <Link href={`/habit/${habit.id}`}> 
                  <HabitCard habit={habit} />
                </Link>
              </div>
            ))
          }
          <div className="w-1/3 p-3">
            <NewHabitModal />
          </div>
        </div>
        <div className="mt-6 flex-2 grow w-full flex">
          <div className="w-full">
            <MissionCard />
          </div>
        </div>
      </div>
    </div>
  );
}