import React, { Component } from 'react';
import axios from 'axios';

import styles from './Homepage.module.css';
import Station from '../../components/Station/Station';
import Navbar from '../../components/Navigation/Navbar/Navbar';

class Homepage extends Component {

    state = {
        stations: [],
        loading: true,
        error: false
    }

    componentDidMount() {
        // res.data.data.stations.filter(station => station['availability']['num_bikes_available'] ? true : false)

        const body = {
            query: `{
                stations {
                    station_id
                    name
                    address
                    lat
                    lon
                    availability {
                        num_bikes_available
                        num_docks_available
                    }
                }
            }`
        } 

        axios.post('https://gbfs-graphql.vercel.app/api/graphql', body)
            .then(res => {
                const stations = res.data.data.stations.filter(station => {
                    if (station['availability']['num_bikes_available'] && station['availability']['num_docks_available']) {
                        station.selected = false;
                        return true;
                    }
                    return false;
                });
                console.log(stations)
                this.setState({stations: stations})
            })
            .catch(err => this.setState({error: true}))
    }

    selectStationHandler = (i) => {
        const stations = this.state.stations.map(s => {
            const station = {...s}
            station.selected = false;
            return station;
        });
        stations[i].selected = true;
        this.setState({ stations: stations });
    }

    render() {
        let stations = null;
        console.time('Try')
        if (this.state.error) {
            stations = (
                <div>
                    <h3 style={{textAlign: 'center', color: 'red'}}>Something went wrong!</h3>
                </div>
            );
        }

        if (!this.state.error && this.state.stations.length) {
            stations = this.state.stations
                .map((station, i) => {
                    return <Station 
                                key={station['station_id']}
                                name={station['name']}
                                address={station['address']}
                                lat={station['lat']}
                                lon={station['lon']}
                                availBike={station['availability']['num_bikes_available']}
                                availDock={station['availability']['num_docks_available']}
                                selected={station.selected}
                                select={() => this.selectStationHandler(i)} />
                });
        }
        console.timeEnd('Try')
        return (
            <div className={styles.Homepage}>
                <Navbar />
                <h1 className={styles.Header}>Available bikes at:</h1>
                <main>
                    <div className={styles.StationsList}>
                        {stations}
                    </div>
                </main>
            </div>
        )
    }
}

export default Homepage;