import React, { Component } from 'react';
import './components.css';

class CountriesList extends Component {

    render() {
        return <ul>
            {this.props.citiesArray.map((city) =>
                <li key={city['Zip Code']}
                    className={city['Zip Code'] === this.props.selectedCityCode ? 'selected' : ''}
                    onClick={this.props.onClick.bind(null, city)}>
                    {city['Place Name']}, {city['State Abbreviation']}
                </li> )}
        </ul>
    }
}

export default CountriesList;