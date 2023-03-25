// import { hashPassword } from "@/lib/auth";
import { hashPassword } from "@/lib/auth";
import { db } from "@/lib/db";
import { MISSION_STATUS } from "@prisma/client";

const getRandomMissionStatus = () => {
    const statuses = [
        MISSION_STATUS.UNCOMPLETED,
        MISSION_STATUS.WAITING,
        MISSION_STATUS.ACCOMPLISHED
    ];
    return statuses[Math.floor(Math.random() * statuses.length)];
};

async function main(){
    const user = await db.user.upsert({
        where: {email: "user@email.com"},
        update: {},
        create: {
            email: "user@email.com",
            firstName: "User",
            lastName: "Person",
            password: await hashPassword("password"),
            habits: {
                create: new Array(5).fill(1).map( (_, i) => ({
                    name: `Habit ${i}`,
                    due: new Date(2023,12,20),
                })),
            },
        },
        include: {
            habits: true,
        },
    });

    const habits = await Promise.all(
        user.habits.map( (habit) => 
        db.mission.createMany({
            data: new Array(10).fill(1).map( (_,i) => {
                return {
                    name: `Mission ${i}`,
                    ownerId: user.id,
                    habitId: habit.id,
                    description: `A mission to settle a new habit #${i}`,
                    status: getRandomMissionStatus(),
                };
            }),
        })
        )
    );

    console.log({user, habits});
}

main()
    .then(async () => {
        await db.$disconnect();
    })
    .catch( async (e) => {
        console.error(e);
        await db.$disconnect();
        process.exit(1);
    });