import stravaClient from "../src/strava/stravaClient";
import { prisma } from "../src/boot/prisma";

async function SyncStravaToLocal() {
  console.log("Start synchronization of Strava data...");

  const users = await prisma.user.findMany({
    include: {
      stravaProfile: true,
      challengesParticipant: {
        include: {
          challenge: true,
        },
      },
    },
  });

  for (let user of users) {
    if (!user.stravaProfile) continue;
    if (!user.challengesParticipant) continue;
    console.log(`Synchronizing the user ${user.name}`)

    console.log(user.challengesParticipant)

    let userChallenges = user.challengesParticipant
      .map((cp) => cp.challenge)

    if (userChallenges.length != 0)
        userChallenges = userChallenges.sort((a, b) => +new Date(a.startAt) - +new Date(b.startAt));

    const earliestChallengeAt = userChallenges.length !== 0 ? new Date(userChallenges[0].startAt) : new Date();
    const lastSyncAt = new Date(user.stravaProfile.syncedAt);

    const syncFromdate = new Date(Math.min(+earliestChallengeAt, +lastSyncAt));

    console.log(`Synchronizing from date: ${syncFromdate.toString()}`)

    // TODO: type
    let activities = null as any;
    try {
      activities = await stravaClient.getMyActivities(
        user.stravaProfile.accessToken,
        Math.floor(syncFromdate.getTime() / 1000)
      );
    } catch (e) {
      console.log(e);
      return;
    }

    const data = activities.map((a: any) => ({
        id: a.id,
        type: a.type,
        sport_type: a.sport_type,
        distance: a.distance,
        moving_time: a.moving_time,
        total_elevation_gain: a.total_elevation_gain,
        start_date: a.start_date,
        manual: a.manual,
        average_speed: a.average_speed,
        max_speed: a.max_speed,
        data: a,
        profileId: user.stravaProfile!.id_strava,
      }))

    console.log(data)

    const activitiesSaved = await prisma.userStravaProfileActivity.createMany({
      data
    });

    console.log(`Finished synchronizing the user ${user.name}`)

    //TODO: update sync time

    await prisma.userStravaProfile.update({
        where: {
            userId: user.id
        },
        data: {
            syncedAt: new Date()
        }
    })

    // TODO: a job to calculte current points and add to history
  }

  // after saving calculate the total points for all the challenges the user attends
  // For active challenges in user
  // if challenge date period is intercepted by the new sync
  // add relevant points to challengeUserPointer
}

SyncStravaToLocal();



