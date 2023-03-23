import EmailService from "./EmailService"

export default {
    makeChallengeInviteEmail: async (senderEmail:string, receiverEmail:string, emailSubject:string, emailBody:string) => {
        const body = {
            "from": senderEmail,
            "to": receiverEmail,
            "subject": emailSubject,
            "text": emailBody
          };
        return body;
    }
}
