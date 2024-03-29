import React from 'react';
import styles from './style.module.css';
import Image from 'next/image';
import gmail from '../../../../public/images/gmail.png';
import social from '../../../../public/images/social.png';
import twitter from '../../../../public/images/twitter.png';
import instagram from '../../../../public/images/instagram.png';

export default function Footer() {
  return (
    <div>
        <div className={styles.container}>
            <div className={styles.socials}>
                <div className={styles.gmail}><Image src={gmail} height={20} width={20}/></div>
                <div className={styles.social}><Image src={social} height={20} width={20}/></div>
                <div className={styles.twitter}><Image src={twitter} height={20} width={20}/></div>
                <div className={styles.instagram}><Image src={instagram} height={20} width={20}/></div>
            </div>
            <div className={styles.middle}>
              Contribute at <a href="https://www.github.com/sakshamsahore2811" target="_blank">Repository Link</a>
            </div>
            <div className={styles.copyright}>
                Copyright©  <a href="https://www.github.com/sakshamsahore2811" target="_blank">Saksham Sharma</a> 2024
            </div>
        </div>
      
    </div>
  )
}
