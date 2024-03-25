import React from 'react';
import styles from './style.module.css';
import Image from 'next/image';
import tech from '../../../../public/images/tech.png';
import target from '../../../../public/images/target.png';

const Navbar = () =>{
    return(
            
    <div className={styles.navbar}>
      <div className={styles.left}>
        <span className={styles.username}><Image src={tech} height={30} width={30}/>John Doe</span>
      </div>
      <div className={styles.center}>
        <Image src={target} height={30} width={40}/>Productivo AI
      </div>
      <div className={styles.right}>
        <ul className={styles.navLinks}>
          <li><a href="/">Home</a></li>
          <li><a href="#tasks">Tasks</a></li>
          <li><a href="#">Progress</a></li>
          <li><a href="https://productivoai.vercel.app/">Logout</a></li>
        </ul>
      </div>
    </div>
    );
}

export default Navbar;