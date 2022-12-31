//@ts-ignore
import nodeoutlook from "nodejs-nodemailer-outlook";

//
const user = "gymcontrol123@outlook.com";
const pass = "cartago23";
//
//

/**
 *
 * @param To  receiver email
 * @returns true if successfully sent, false otherwise
 */
const sendQrEmail = (To: string) => {
  try {
    nodeoutlook.sendEmail({
      auth: {
        user: user,
        pass: pass,
      },
      from: user,
      to: To,
      subject: "Hey you, awesome!",
      html: "<b>This is bold text</b>",
      text: "This is text version!",
      replyTo: "valverdejareth@gmail.com",
    });
  } catch (err) {
    return false;
  }
  return true;
};

export default sendQrEmail;
