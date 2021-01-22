import React, { Component } from 'react';

import styles from './Homepage.module.css';
import Stations from '../../components/Stations/Stations';
import StationsMap from '../../components/StationsMap/StationsMap';


class Homepage extends Component {


    render() {
        return (
            <div className={styles.Homepage}>
                <StationsMap />
                <Stations />
            </div>
        )
    }
}

export default Homepage;