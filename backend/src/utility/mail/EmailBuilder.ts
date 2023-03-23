import EmailService from "./EmailService"

export default {
    makeChallengeInviteEmail: () => {
        EmailService.sendEmail(/**Čia įhardcodeini kažką pvz į template dalį */)
    }
}