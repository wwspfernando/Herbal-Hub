const nodemailer = require('nodemailer');
const config = require('../config/config');

// Function to send the contact us email
const sendContactUsEmail = async (req, res, next) => {
  const { name, email, mobile, comment } = req.body;

  // Create a transporter using SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'herbalhub.enquiries@gmail.com', 
      pass: 'kevydlqoqdqglsfp', 
    },
  });

  // Setup email data
  const mailOptions = {
    from: 'Herbal-Hub <herbalhub.enquiries@gmail.com>', // Sender address 
    to: email, // Use the user's provided email as the receiver address
    subject: 'Contact Us Form Submission',
    html: `
    <div style="background-color: rgb(244, 249, 233); padding: 20px; border-radius: 15px">
    <img src="https://www.meripharmacy.in/uploads/blog_image/blog_1.jpg" alt="Ayurweda Logo" style="display: block; margin: 0 auto; max-width: 200px;">
    <p style="font-family: 'Philosopher', sans-serif;">Thank You, ${name} for your submission. <br> We will look into your enquiry and hope to hear more from you !</p>
    </div>`,
  };
  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email.' });
  }
};

module.exports = {
  sendContactUsEmail,
};
