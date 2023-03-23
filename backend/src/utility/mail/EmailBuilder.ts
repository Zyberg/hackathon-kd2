import EmailService from "./EmailService"

export default {
    makeChallengeInviteEmail: async (senderEmail:any, receiverEmail:any, emailSubject:any, emailBody:any) => {
        const body = {
            "from": senderEmail,
            "to": receiverEmail,
            "subject": emailSubject,
            "text": emailBody
          };
        return body;
    }
}
