export default {
  makeChallengeInviteEmail: async (
    senderEmail: string,
    receiverEmail: string,
    emailSubject: string,
    emailBody: string
  ) => {
    const body = {
      from: senderEmail,
      to: receiverEmail,
      subject: emailSubject,
      html: emailBody, // TODO: dont pass emailbody here
    };
    return body;
  },
};
