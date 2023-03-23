import MailgunApiService from "./MailgunApiService";

class EmailService {
  _service!: EmailService;

  constructor() {
    if (!this._service) {
      this._service = this;
      return this._service;
    }
    return this._service;
  }

  // sendEmail(/*Čia kažkokie paramterai general turi būti */)
  sendEmail(sender_email:string, receiver_email:string, email_subject:string, email_body:string)
  {
    MailgunApiService.sendEmail(sender_email, receiver_email,email_subject, email_body)
    throw Error("Not implemented");
  }
}

export default new EmailService();
