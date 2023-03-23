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

  sendEmail(/*Čia kažkokie paramterai general turi būti */)
  {
    MailgunApiService.sendEmail(/** Čia permappink parametrus tiesiog */)
    throw Error("Not implemented");
  }
}

export default new EmailService();
