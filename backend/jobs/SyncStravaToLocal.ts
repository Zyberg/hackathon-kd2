import stravaClient from "../src/strava/stravaClient"

// TODO: for all users in challenges save activities from relevant periods in DB
async function SyncStravaToLocal() {
    //For all users
        // find challenge that requires the oldest date
        // get that date
        // check, when was the last time user synced
        // if sync_date > oldest_challenge_require_date
            // date = sync_date
        // else
            // date = oldest_challenge_require_date
        // get all activities from strava after date
        // save the activities from strava to the DB via prisma ORM

        // after saving calculate the total points for all the challenges the user attends
            // For active challenges in user
                // if challenge date period is intercepted by the new sync
                // add relevant points to challengeUserPointer

    const activities = await stravaClient.getMyActivities("f442b8037a528342d4a09476af67cf1a770fa8c4");

    console.log(activities);
}

SyncStravaToLocal();