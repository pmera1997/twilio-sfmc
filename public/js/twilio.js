require('dotenv').config();

const accountSid = 'ACefb6762e119ac9accff0d345636a6ee8';
const authToken = '5db48de6e246012766ba0634ca4d22bd';
const twilionumber='+16106098635';
const sendSms = (phone, message) => {
  const client = require('twilio')(accountSid, authToken);
  client.messages
    .create({
       body: message,
       from: twilionumber,
       to: phone
     })
    .then(message => console.log(message.sid));
}

module.exports = sendSms;
