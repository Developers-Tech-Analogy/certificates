import { NodeMailgun } from "ts-mailgun";

const mailer = new NodeMailgun();
mailer.apiKey = process.env.API_KEY;
mailer.domain = process.env.DOMAIN;
mailer.fromEmail = `certificates@${process.env.DOMAIN}`;
mailer.fromTitle = "Certificates @ Tech Analogy";
mailer.init();

const mailgun = async (receiver: string, subject: string, content: string) => {
  const data = await mailer.send(receiver, subject, content);
  console.log(data);
};
export default mailgun;
