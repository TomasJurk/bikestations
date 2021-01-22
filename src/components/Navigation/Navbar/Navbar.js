import React from 'react';

import styles from './Navbar.module.css';

const Navbar = (props) => (
    <ul className={styles.Navbar}>
        <li className={[styles.Navbar_Item, styles.Navbar_Logo].join(' ')}></li>
        <li className="spacer"></li>
        <li className={styles.Navbar_Item}>About</li>
        <li className={[styles.Navbar_Item, styles.Navbar_Item_Login].join(' ')}>Login</li>
    </ul>
)

export default Navbar;