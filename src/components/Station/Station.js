import React from 'react';

import styles from './Station.module.css';

const Station = (props) => {

    const classes = [styles.Station];

    if (props.selected) {
        classes.push(styles.Station_Selected);
    }

    return (
        <div className={classes.join(' ')} onClick={props.select}>
            <p>Oslo Station</p>
            <a href="http://www.google.com/maps/place/49.46800006494457,17.11514008755796" target="_blank" rel="noreferrer">Show on map</a>
        </div>
    )
}

export default Station;