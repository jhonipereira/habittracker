import { FC } from "react";
import { MISSION_STATUS, Prisma } from "@prisma/client";
import Card from "./Card";
import clsx from "clsx";

const habitWithMissions = Prisma.validator<Prisma.HabitArgs>()({
    include: {missions: true}
})

type HabitWithMissions = Prisma.HabitGetPayload<typeof habitWithMissions>

const formatDate = (date) => {
    new Date(date).toLocaleDateString("en-us",{
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric"
    })
}

const HabitCard: FC<{habit: HabitWithMissions}> = ({habit}) => {
    const completedCount = habit.missions.map( mission => mission.status === MISSION_STATUS.ACCOMPLISHED).length

    const progress = Math.ceil((completedCount / habit.missions.length) * 100)

    return (
        <Card className="!px-6 !py-8 hover:scale-105 transition-all ease-in-out duration-200">
      <div>
        <span className="text-sm text-gray-300">
          { formatDate(habit.createdAt) as any }
        </span>
      </div>
      <div className="mb-6">
        <span className="text-3xl text-gray-600">{habit.name}</span>
      </div>
      <div className="mb-2">
        <span className="text-gray-400">
          {completedCount}/{habit.missions.length} completed
        </span>
      </div>
      <div>
        <div className="w-full h-2 bg-violet-200 rounded-full mb-2">
          <div
            className={clsx(
              "h-full text-center text-xs text-white bg-violet-600 rounded-full"
            )}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-right">
          <span className="text-sm text-gray-600 font-semibold">
            {progress}%
          </span>
        </div>
      </div>
    </Card>
    )
}

export default HabitCard;