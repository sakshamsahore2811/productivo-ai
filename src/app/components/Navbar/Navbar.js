import React from 'react';
import styles from './style.module.css';
import Image from 'next/image';
import tech from '../../../../public/images/tech.png';
import target from '../../../../public/images/octopus.png';

const Navbar = () =>{
    return(
            
    <div className={styles.navbar}>
      <div className={styles.left}>
        <span className={styles.username}><Image src={tech} height={30} width={30}/>John Doe</span>
      </div>
      <div className={styles.center}>
        <Image src={target} height={40} width={50}/>Productivo AI
      </div>
      <div className={styles.right}>
        <ul className={styles.navLinks}>
          <li><a href="https://productivoai.vercel.app/">Instructions</a></li>
          <li><a href="#tasks">Tasks</a></li>
          <li><a href="#">Progress</a></li>
          <li><a href="https://productivoai.vercel.app/">Logout</a></li>
        </ul>
      </div>
    </div>
    );
}

export default Navbar;