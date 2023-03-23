class MailgunApiService {
    _service!: MailgunApiService;
  
    constructor() {
      if (!this._service) {
        this._service = this;
        return this._service;
      }
      return this._service;
    }
    
  
    // sendEmail(/*Čia kažkokie paramterai, specifi6ki mailgun turi būti */)
    sendEmail(sender_email:string, receiver_email:string, email_subject:string, email_body:string)
    {
      throw Error("Not implemented");
    }
  }
  
  export default new MailgunApiService();
  