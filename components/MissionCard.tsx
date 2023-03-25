import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { MISSION_STATUS } from "@prisma/client";
import { cookies } from "next/headers";
import Button from "./Button";
import Card from "./Card";

const getData = async () => {
    const user = await getUserFromCookie(cookies())

    const missions = await db.mission.findMany({
        where: {
            ownerId: user?.id,
            NOT: {
                status: MISSION_STATUS.ACCOMPLISHED,
                deleted: false
            },
        },
        take: 5,
        orderBy: {
            createdAt: 'asc'
        }
    })

    return missions;
}

const MissionCard = async ({missions, title}) => {
    const data = missions || await getData() //get the missions from param or getData

    return (
        <Card>
          <div className="flex justify-between items-center">
            <div>
              <span className="text-3xl text-gray-600">{title}</span>
            </div>
            <div>
              <Button intent="text" className="text-violet-600">
                + Create New
              </Button>
            </div>
          </div>
          <div>
            {data && data.length ? (
              <div>
                {data.map((mission) => (
                  <div className="py-2 ">
                    <div>
                      <span className="text-gray-800">{mission.name}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">
                        {mission.description}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>no missions</div>
            )}
          </div>
        </Card>
      );
}

export default MissionCard;