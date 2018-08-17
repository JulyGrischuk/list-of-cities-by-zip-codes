import React, { Component } from 'react';
import InputView from './components/input';
import CountriesList from './components/contries-list';
import data from './source-list.json';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.onClickBtnGo = this.onClickBtnGo.bind(this);
        this.onCityClick = this.onCityClick.bind(this);
        this.onInputZipCode = this.onInputZipCode.bind(this);

        this.selectedCity = {};
        this.state = {
            zipCodesArray: [],
            citiesArray: [],
            currZipCode: '',
            error: ''
        }
    }

    onInputZipCode(e) {
        this.setState({ currZipCode: parseInt(e.target.value, 10)});
    }

    onClickBtnGo(zipCode) {
        if (this.state.zipCodesArray.includes(zipCode)) {
            return this.setState({error: 'Duplicated'
            });
        }
        this.getCity(zipCode, this.index);
        this.index = undefined;
        this.setState({currZipCode: '',
                       selectedCityCode: ''
                    });
    }

    onCityClick(city) {
        if (this.state.selectedCityCode === city['Zip Code']) {
            this.index = undefined;
            this.setState({
                currZipCode: '',
                selectedCityCode: ''
            });
        } else {
            this.index = this.state.zipCodesArray.indexOf(city['Zip Code']);
            this.setState({
                currZipCode: city['Zip Code'],
                selectedCityCode: city['Zip Code']
            });
        }
    }

    getCity(zipCode, index) {
        const citiesArray = this.state.citiesArray,
              zipCodesArray = this.state.zipCodesArray;

        var city = data.filter(city => (
            city['Zip Code'] === zipCode
        ));
        if (city.length) {

            if (index !== undefined) {
                citiesArray.splice(index, 1, city[0]);
                zipCodesArray.splice(index, 1, zipCode);

            } else {
                citiesArray.push(city[0]);
                zipCodesArray.push(zipCode);
            }

            this.setState({
                citiesArray: citiesArray,
                zipCodesArray: zipCodesArray,
                error: ''
            });
        } else {
            this.setState({error: 'Not found'});
        }
    }

    render() {
        return (
            <div className="App">
                <InputView onClick={this.onClickBtnGo} onInput={this.onInputZipCode} zipCode={this.state.currZipCode}/>
                <p className='err-msg'>{this.state.error}</p>
                <CountriesList citiesArray={this.state.citiesArray} selectedCityCode={ this.state.selectedCityCode} onClick={this.onCityClick}/>
            </div>
        );
    }
}

export default App;
