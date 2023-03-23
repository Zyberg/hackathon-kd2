import Mailgun from "mailgun.js";
//@ts-ignore
import { default as FormData } from "form-data";
import { AppError } from "../../exceptions/AppError";
import Client from "mailgun.js/client";
import { Email } from "../../types/email/Email";

class MailgunApiService {
  _service!: MailgunApiService;

  _mailgun!: Client;

  constructor() {
    if (!this._service) {
      this._service = this;
      return this._service;
    }

    const mailgun = new Mailgun(FormData);
    this._mailgun = mailgun.client({
      username: "api",
      key: process.env.API_MAIL_KEY || "key",
    });

    return this._service;
  }

  async sendEmail(data: Email) {
    let response = null;

    try {
      response = await this._mailgun.messages.create(process.env.DOMAIN || "", data);
    } catch (e: any) {
      throw new AppError({ ...e, httpCode: 500, isOperational: true });
    }

    return response;
  }
}

export default new MailgunApiService();
