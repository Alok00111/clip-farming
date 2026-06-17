import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailPayload) {
  // If no API key is provided, mock the email sending for development
  if (!resend) {
    console.log('\n==================================================================');
    console.log('MOCK EMAIL SENT');
    console.log('To:', to);
    console.log('Subject:', subject);
    console.log('HTML Payload:', html);
    console.log('==================================================================\n');
    return { success: true, mocked: true };
  }

  try {
    const data = await resend.emails.send({
      from: 'ClippingAgency <noreply@clippingagency.com>', // Update this when you have a verified domain
      to,
      subject,
      html,
    });

    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}
