const { Resend } = require('resend');

const resend = new Resend('re_LqGJ61rf_Mf386qEaN2ARdB52TwmF96r1');

async function test() {
  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'growtoglow44@gmail.com',
      subject: '[CreatorFlow] Debug Test',
      html: '<p>This is a test from the backend console.</p>'
    });
    console.log("Resend API Response:", data);
  } catch (error) {
    console.error("Resend API Error:", error.message);
  }
}

test();
