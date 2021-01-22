import React, { Component } from 'react';

import styles from './Homepage.module.css';
import Station from '../../components/Station/Station';
import StationsMap from '../../components/StationsMap/StationsMap';
import Navbar from '../../components/Navigation/Navbar/Navbar';

class Homepage extends Component {

    state = {
        stations: [
            {
              "station_id": "2280",
              "name": "Klingenberggata",
              "address": "Olav Vs Gate 5",
              "lat": 59.913150534075015,
              "lon": 10.732281291700133,
              "availability": {
                "num_bikes_available": 2
              },
              selected: false
            },
            {
              "station_id": "2270",
              "name": "Lørenporten",
              "address": "Lørenveien 63",
              "lat": 59.92883258499495,
              "lon": 10.799770383800876,
              "availability": {
                "num_bikes_available": 2
              },
              selected: false
            },
            {
              "station_id": "1919",
              "name": "Kværnerveien",
              "address": "Kværnerveien 5",
              "lat": 59.90591083488326,
              "lon": 10.778592132296495,
              "availability": {
                "num_bikes_available": 0
              },
              selected: false
            }
        ],
        selectedStation: null,
        loading: true,
        error: null
    }

    componentDidMount() {
        // fetch stations
    }

    selectStationHandler = (i) => {
        const stations = [...this.state.stations];
        const stationToMark = {...stations[i]};
        stationToMark.selected = true;
        const stationToUnmark = {...stations[this.state.selectedStation]}
        stationToUnmark.selected = false;
        stations[i] = stationToMark;
        stations[this.state.selectedStation] = stationToUnmark;
        this.setState({
            stations: stations,
            selectedStation: i
        });
    }

    render() {
        let stations = null;

        if (this.state.error) {
            stations = (
                <div>
                    <p style={{textAlign: 'center'}}>Something went wrong!</p>
                    <p style={{textAlign: 'center'}}>{this.state.error}</p>
                </div>
            );
        }

        if (!this.state.error && this.state.stations.length) {
            stations = this.state.stations
                .filter(station => station['availability']['num_bikes_available'] ? true : false)
                .map((station, i) => {
                    return <Station 
                                key={station['station_id']}
                                name={station['name']}
                                address={station['address']}
                                lat={station['lat']}
                                lon={station['lon']}
                                availability={station['availability']['num_bikes_available']}
                                selected={station.selected}
                                select={() => this.selectStationHandler(i)} />
                });
        }

        return (
            <div className={styles.Homepage}>
                <Navbar />
                <h1 className={styles.Header}>Available bikes at:</h1>
                <main>
                    <StationsMap />
                    <div className={styles.StationsList}>
                        {stations}
                    </div>
                </main>
            </div>
        )
    }
}

export default Homepage;