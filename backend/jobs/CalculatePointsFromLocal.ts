import { prisma } from "../src/boot/prisma";

async function CalculatePointsFromLocal() {
  console.log("Start points calculation of the  data...");

  const users = await prisma.user.findMany({
    include: {
        stravaProfile: {
            include: {
                UserStravaProfileActivity: true
            }
        },
      challengesParticipant: true
    },
  });

  for (let user of users) {
    if (!user.challengesParticipant) continue;

    if (!user.stravaProfile) continue;


    // TODO: dynamic points calculation depending on challenge unit
    const value = user.stravaProfile.UserStravaProfileActivity
        .reduce((acc, activity) => (acc += activity.distance, acc), 0)

    for (let cP of user.challengesParticipant) {
        // TODO: dont create, if the value is the same
        await prisma.challengesOnUsers.update({
            where: {
                id: cP.id
            },
            data: {
                userPoints: {
                    create: {
                        value
                    }
                }
            }
        })
    }

    console.log(`Finished calculating points for the user ${user.name}`)
  }

  console.log('Finished points calculation!')
}

CalculatePointsFromLocal();
