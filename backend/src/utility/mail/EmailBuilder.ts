import { TemplateFailure } from "./TemplateFailure";
import { TemplateSuccess } from "./TemplateSuccess";

export default {
  makeChallengeCompleteSuccessEmail: async (
    senderEmail: string,
    receiverEmail: string,
    emailSubject: string,
    challengeTitle: string
  ) => {
    const body = {
      from: senderEmail,
      to: receiverEmail,
      subject: emailSubject,
      html: TemplateSuccess(challengeTitle),
    };
    return body;
  },

  makeChallengeCompleteFailureEmail: async (
    senderEmail: string,
    receiverEmail: string,
    emailSubject: string,
    challengeTitle: string
  ) => {
    const body = {
      from: senderEmail,
      to: receiverEmail,
      subject: emailSubject,
      html: TemplateFailure(challengeTitle),
    };
    return body;
  },
};
