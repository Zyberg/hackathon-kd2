import { prisma } from "../src/boot/prisma";

function calculateValue(activities: any, unitTitle: string) {
  let aggregate = 0;

  // TODO: seed the only possible
  if (unitTitle === "Km")
    aggregate =
      Math.round(
        activities.reduce(
          (acc: number, activity: any) => ((acc += activity.distance), acc),
          0
        ) / 10
      ) / 100;
  else if (unitTitle === "m")
    aggregate = Math.round(
      activities.reduce(
        (acc: number, activity: any) => ((acc += activity.distance), acc),
        0
      )
    );
  else if (unitTitle == "s")
    aggregate = Math.round(
      activities.reduce(
        (acc: number, activity: any) => ((acc += activity.moving_time), acc),
        0
      )
    );
  else if (unitTitle == "el_gain")
    aggregate = Math.round(
      activities.reduce(
        (acc: number, activity: any) => (
          (acc += activity.total_elevation_gain), acc
        ),
        0
      )
    );

  return aggregate;
}

async function CalculatePointsFromLocal() {
  console.log("Start points calculation of the  data...");

  const users = await prisma.user.findMany({
    include: {
      stravaProfile: {
        include: {
          UserStravaProfileActivity: true,
        },
      },
      challengesParticipant: {
        include: {
          challenge: {
            include: {
              unit: true,
            },
          },
        },
      },
    },
  });

  for (let user of users) {
    if (!user.challengesParticipant) continue;

    if (!user.stravaProfile) continue;

    // TODO: dynamic points calculation depending on challenge unit
    const activities = user.stravaProfile.UserStravaProfileActivity;

    for (let cP of user.challengesParticipant) {
      const unitTitle = cP.challenge.unit.title;

      const value = calculateValue(activities, unitTitle);

      // TODO: dont create, if the value is the same
      await prisma.challengesOnUsers.update({
        where: {
          id: cP.id,
        },
        data: {
          userPoints: {
            create: {
              value,
            },
          },
        },
      });
    }

    console.log(`Finished calculating points for the user ${user.name}`);
  }

  console.log("Finished points calculation!");
}

CalculatePointsFromLocal();
