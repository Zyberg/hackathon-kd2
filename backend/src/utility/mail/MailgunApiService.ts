import Mailgun from 'mailgun.js';
// import type Mailgun from 'mailgun.js';
//@ts-ignore
import { default as FormData } from "form-data";
import { AppError } from '../../exceptions/AppError';
import Client from 'mailgun.js/client';

class MailgunApiService {
    _service!: MailgunApiService;

    _mailgun!: Client;
  
    constructor() {
      if (!this._service) {
        this._service = this;
        return this._service;
      }

      const mailgun = new Mailgun(FormData);
      this._mailgun = mailgun.client({ username: 'api', key: process.env.API_MAIL_KEY || 'key'})
      
      return this._service;
    }
    
  
    async sendEmail(data:any)
    {
      const mailgun = new Mailgun(FormData);
      const mg = mailgun.client({ username: 'api', key: process.env.API_MAIL_KEY || 'key'})

      mg.messages.create(process.env.DOMAIN || "", data)
      .then(msg => console.log(msg))
      .catch(err => console.error(err));
    }
  }
  
  export default new MailgunApiService();