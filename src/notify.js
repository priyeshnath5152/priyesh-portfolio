// Sends a phone alert when someone submits the contact form.
// Each channel is off until its keys are set in .env.local (see .env.example).
// Note: REACT_APP_* values are bundled into the public site, so only use
// keys that can at worst send messages to you.

const env = process.env;

const formatText = ({ name, contact, message }) =>
  `📩 New portfolio message\n\nName: ${name}\nContact: ${contact}\n\n${message}`;

// "no-cors" + form/query params keeps these simple requests (no preflight).
// We can't read the response, which is fine: alerts are fire-and-forget.
const sendWhatsApp = (text) =>
  fetch(
    `https://api.callmebot.com/whatsapp.php?phone=${env.REACT_APP_CALLMEBOT_PHONE}` +
      `&text=${encodeURIComponent(text)}&apikey=${env.REACT_APP_CALLMEBOT_APIKEY}`,
    { mode: "no-cors" }
  );

const sendTelegram = (text) =>
  fetch(`https://api.telegram.org/bot${env.REACT_APP_TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    mode: "no-cors",
    body: new URLSearchParams({ chat_id: env.REACT_APP_TELEGRAM_CHAT_ID, text }),
  });

export const notifyNewContact = async (data) => {
  const text = formatText(data);
  const jobs = [];
  if (env.REACT_APP_CALLMEBOT_PHONE && env.REACT_APP_CALLMEBOT_APIKEY) jobs.push(sendWhatsApp(text));
  if (env.REACT_APP_TELEGRAM_BOT_TOKEN && env.REACT_APP_TELEGRAM_CHAT_ID) jobs.push(sendTelegram(text));
  // Never let an alert failure affect the form itself.
  await Promise.allSettled(jobs);
};
