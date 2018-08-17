import React, { Component } from 'react';
import './components.css';

class InputView extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(e) {
        e.preventDefault();
        this.props.onClick(this.props.zipCode);
        this.inputForm.reset();
    }

    render() {
        return <form onSubmit={this.handleSubmit}
                     ref={(el) => this.inputForm = el}>
                <label>
                    Type Zip Code:
                </label>
                <input type='number'
                       value = {this.props.zipCode}
                       onInput={this.props.onInput}/>
                <button type='submit'>
                    Go
                </button>
            </form>
    }
}

export default InputView;