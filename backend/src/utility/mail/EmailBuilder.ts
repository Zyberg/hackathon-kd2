import Mailgun from "mailgun.js"
import EmailService from "./EmailService"


var API_KEY = 'Your_Api_Key';
var DOMAIN = 'Your_Domain';

// var mailgun = require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN});

var sender_email = 'sender@gmail.com'
var receiver_email = 'receiver@gmail.com'
var email_subject = 'Challenges'
var email_body = 'Challenge from ...'

export default {
    makeChallengeInviteEmail: () => {
        
        EmailService.sendEmail(sender_email, receiver_email,
            email_subject, email_body); {

            const data = {
                "from": sender_email,
                "to": receiver_email,
                "subject": email_subject,
                "text": email_body
              };


            mailgun.messages().send(data, (error: any, body: any) => {
                if(error) console.log(error)
                else console.log(body);
              });

            
        }
    }
}