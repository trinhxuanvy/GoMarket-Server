const dotenv = require("dotenv");
const libPhoneNumber = require("libphonenumber-js");

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const myPhone = process.env.MY_PHONE;
const client = require("twilio")(accountSid, authToken);

const sendMessage = (message, phone, locate) => {
  const genaratePhone = getPhoneWithLocate(phone, locate);
  client.messages
    .create({
      body: "This is the ship that made the Kessel Run in fourteen parsecs?",
      from: myPhone,
      to: genaratePhone.number,
    })
    .then((message) => console.log(message))
    .catch((err) => {
      console.log(err);
    });
};

const getPhoneWithLocate = (phone, locate) => {
  return libPhoneNumber.parsePhoneNumber(phone, locate);
};

module.exports = { sendMessage, getPhoneWithLocate };
