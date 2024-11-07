import React from 'react';
import './CounselingService.css';

const CounselingService = () => {
  return (
    <div className="counseling-service">
      <h1>Counseling Service</h1>
      <section className="description">
        <p>
          We offers a free, telephone and email-based counseling service for individuals experiencing emotional and psychological distress.
        </p>
        <p>
          This service is available across age, language, gender, sexual orientation, and covers a range of issues, through a team of qualified and trained mental health professionals.
          Our Counsellors can speak <strong>English, Hindi, Marathi, Gujarati, Assamese, Bengali, Punjabi, and Malayalam.</strong>
        </p>
      </section>
      
      <section className="contact-details">
        <h2>Contact Us</h2>
        <p><strong>Book Appointment:</strong> Email us at <a href="mailto:wearethere@gmail.com">wearethere@gmail.com</a> <br/>Or Call us at <a href="tel:+919876543210">9876543210</a></p>
        <p><strong>Telephone Counseling:</strong> Call us at <a href="tel:+919152987821">9152987821</a></p>
        <p><em>Available from Monday to Saturday: 10:00 am to 8:00 pm</em></p>
      </section>
    </div>
  );
};

export default CounselingService;
