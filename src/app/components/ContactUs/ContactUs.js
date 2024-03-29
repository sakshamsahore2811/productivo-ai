import React from 'react';
import styles from './style.module.css';
import Image from 'next/image';
import oct from '../../../../public/images/octopusgraduate.png';

const ContactUs = () => {
  return (
    <>
    <div className={styles.heading}>Contact Us</div>
    
    <div className={styles.contactcontainer}>
      {/* Left Side: Picture */}
      <div className={styles.leftside}>
        <Image src={oct} height={300} width={300} />
      </div>
      <div className={styles.rightside}>
      <div className={styles.contactcard}>
        <form action="#" method="post">
          <div className={styles.formgroup}>
            <label for="name">Name</label><br/>
            <input type="text" id="name" rows="2" name="name" required/>
          </div>
          <div className={styles.formgroup}>
            <label for="email">Email Address</label><br/>
            <input type="email" id="email" rows="2" name="email" required/>
          </div>
          <div className={styles.formgroup}>
            <label for="message">Message</label><br/>
            <textarea id="message" name="message" rows="4" required></textarea>
          </div>
          <button type="submit" style={{ backgroundColor: '#a44ed9', color: 'white', borderRadius: '5px', padding: '8px 16px', border: 'none' }}>Send message</button>
        </form>
      </div>
    </div>
    </div>
    </>
  );
}

export default ContactUs;
