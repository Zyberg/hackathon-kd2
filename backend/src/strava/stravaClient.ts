import strava from "strava-v3";
import { AppError } from "../exceptions/AppError";


strava.config({
  access_token: "f442b8037a528342d4a09476af67cf1a770fa8c4",
  client_id: process.env.STRAVA_CLIENT_ID || "",
  client_secret: process.env.STRAVA_CLIENT_SECRET || "",
  redirect_uri: process.env.STRAVA_CLIENT_CALLBACK || "",
});

const makeStravaRequest = async (fetch: any) => {
  let payload = null;
  try {
    payload = fetch();
  } catch (e) {
    console.log(e)
    throw new AppError({
      description: "Failed to access Strava",
      httpCode: 500,
      isOperational: true,
    });
  }

  return payload;
};

export default {
  getUserProfile(access_token: string) {
    return makeStravaRequest(() => strava.athlete.get({ access_token }));
  },

  getMyActivities(access_token: string, after: number) {
    return makeStravaRequest(() => strava.athlete.listActivities({ after, access_token }))
  },
};
