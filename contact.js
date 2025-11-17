const nodemailer = require('nodemailer');

const DESTINATION = process.env.PROTON_EMAIL;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;

const isSpam = (data) => data.website && data.website.trim() !== '';

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const form = require('formidable');
  const util = require('util');
  const parse = util.promisify(form.IncomingForm().parse);

  let fields;
  try {
    const result = await parse(event);
    fields = result.fields;
  } catch (err) {
    return { statusCode: 400, body: 'Bad Request' };
  }

  if (isSpam(fields)) {
    return { statusCode: 200, body: 'Thanks!' };
  }

  const mailOptions = {
    from: `"${fields.name}" <${SMTP_USER}>`,
    to: DESTINATION,
    subject: `Portfolio contact from ${fields.name}`,
    text: `
Name: ${fields.name}
E‑mail: ${fields.email}
Message:
${fields.message}
    `,
  };

  const transporter = nodemailer.createTransport({
    host: 'mail.protonmail.com',
    port: 465,
    secure: true,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail(mailOptions);
    return { statusCode: 200, body: 'Message sent' };
  } catch (error) {
    console.error('SMTP error:', error);
    return { statusCode: 500, body: 'Failed to send' };
  }
};