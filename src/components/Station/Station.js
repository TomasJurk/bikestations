import React from 'react';

import styles from './Station.module.css';

const Station = (props) => {


    const googleMapLink = `http://www.google.com/maps/place/${props.lat},${props.lon}`

    return (
        <div className={[styles.Station, props.selected ? styles.Station_Selected : null].join(' ')} onClick={props.select}>
            <h4>Station: "{props.name}"</h4>
            <div className={['spacer', styles.Station_Info, props.selected ? null : styles.Station_Info_Fade].join(' ')}>
                <p>Address: {props.address}</p>

                <a className={styles.MapLink} href={googleMapLink} target="_blank" rel="noreferrer">Show on map</a>
            </div>
        </div>
    )
}

export default Station;