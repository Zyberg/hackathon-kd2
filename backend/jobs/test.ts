import dotenv from "dotenv";
dotenv.config();

import EmailService from "../src/utility/mail/EmailService"
import EmailBuilder from "../src/utility/mail/EmailBuilder"


async function sendChallengeCompleteEmail() {
    const data = await EmailBuilder.makeChallengeCompleteEmail("nikolajus.elkana@gmail.com", "nikolajus.elkana@gmail.com", "Challenge complete", 'testinis challenge')

    await EmailService.sendEmail(data)
}

sendChallengeCompleteEmail();