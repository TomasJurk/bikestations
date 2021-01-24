import React, { Component } from 'react';
import axios from 'axios';

import styles from './Homepage.module.css';
import Station from '../../components/Station/Station';
import Navbar from '../../components/Navigation/Navbar/Navbar';
import Spinner from '../../components/UI/Spinner/Spinner';

class Homepage extends Component {

    state = {
        stations: [],
        loading: true,
        error: false,
        stationsLoaded: 20
    }

    componentDidMount() {
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
                const stations = res.data.data.stations
                    .filter(station => {
                        if (station['availability']['num_bikes_available'] && station['availability']['num_docks_available']) {
                            station.selected = false;
                            return true;
                        }
                        return false;
                    });
                this.setState({stations: stations})
            })
            .catch(err => this.setState({error: true}))
    }

    selectStationHandler = (i) => {
        if (this.state.stations[i].selected) {
            return;
        }
        const stations = this.state.stations.map(s => {
            const station = {...s}
            station.selected = false;
            return station;
        });
        stations[i].selected = true;
        this.setState({ stations: stations });
    }

    loadMoreStationsHandler = () => {
        const loaded = this.state.stationsLoaded;
        this.setState({stationsLoaded: loaded + 20});
    }

    render() {
        let stations = <Spinner />;
        
        if (this.state.error) {
            stations = <h3 style={{textAlign: 'center', color: 'red'}}>Something went wrong!</h3>;
        }

        if (!this.state.error && this.state.stations.length) {
            stations = this.state.stations.slice(0, this.state.stationsLoaded)
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

        let loadBtnStyle = null;
        if (this.state.stationsLoaded >= this.state.stations.length) {
            loadBtnStyle = {display: 'none'}
        }
        
        return (
            <div className={styles.Homepage}>
                <Navbar />
                <h1 className={styles.Header}>Available bikes at:</h1>
                <main>
                    <div className={styles.Stations_List}>
                        {stations}
                        <div className={styles.Load_More} style={loadBtnStyle} onClick={() => this.loadMoreStationsHandler()}>
                            <p>Load more</p>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}

export default Homepage;