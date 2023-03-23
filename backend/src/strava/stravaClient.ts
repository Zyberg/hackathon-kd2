import strava from "strava-v3";

strava.config({
    "access_token"  : "3bb60388fb51c614eb29b1317a0912cb82cd214f",
    "client_id"     : process.env.STRAVA_CLIENT_ID || "",
    "client_secret" : process.env.STRAVA_CLIENT_SECRET || "",
    "redirect_uri"  : process.env.STRAVA_CLIENT_CALLBACK || ""
});
  
export default {
    async getMyData() {
        const payload = await strava.athlete.get({ id: 114907055 })

        console.log(payload)
    }
}