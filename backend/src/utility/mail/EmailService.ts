import { email } from "./email";
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

  async sendEmail(data:email)
  {
    await MailgunApiService.sendEmail(data)
  }
}

export default new EmailService();
