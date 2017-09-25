import React from 'react';
import ReactDOM from 'react-dom';
import '../src/index.css';

document.addEventListener('DOMContentLoaded', _ => {
    document.querySelector('#modal-open').addEventListener('click', OpenModal);
});

class CountdownElement extends React.Component {
    constructor() {
        super();
        this.state = {
            id: '',
            timeRemaining: 0,
        }
    }

    render() {
        return(
            <tr scope='row' class='countdown-row'>
                <td class='countdown-id'>{this.state.id}</td>
                <td class='countdown-time-remaining'>{this.state.timeRemaining}</td>
                <td class='countdown-end-time'>End Time</td>
                <td>
                    <button class='btn btn-outline-dark btn-coutndown-remove'>&times;</button>
                </td>
            </tr>
        );
    }
}

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idValue: '',
            endDateValue: '',
        }

        this.handleIdChange = this.handleIdChange.bind(this);
        this.handleEndDatChange = this.handleEndDateChange.bind(this);
    }

    handleIdChange(event) {
        this.setState({
            idValue: event.target.value,
        });
    }

    handleEndDateChange(event) {
        this.setState({
            endDateValue: event.target.value,
        })
    }

    render() {
        return(
            <div className='modal' id='create-countdown-modal'>
                <div className='modal-content'>
                    <div className='modal-title'>Create Countdown</div>
                    <button id='modal-close' className='btn btn-outline-dark' onClick={() => this.handleClose()}>
                        <span className='modal-close'>&times;</span>
                     </button>
                    <div className='modal-input-container'>
                        <div className='input-row input-label'>
                            <label className='label-name'>Countdown Label</label>
                            <input type='text' id='user-label' value={this.state.idValue} onChange={this.handleIdChange}/>
                        </div>
                        <div className='input-row input-time'>
                            <label className='label-time'>What time will it end?</label>
                            <input type='datetime-local' id='user-time' value={this.state.endDateValue} onChange={this.handleEndDateChange}/>  
                        </div>
                    </div>
                <div className='modal-submit'>
                    <button id='modal-submit-button' className='btn btn-outline-dark' onClick={() => this.handleSubmit()}>Submit</button>
                </div>
            </div>
        </div>
        );
    }

    handleClose() {
        document.querySelector('#create-countdown-modal').remove();
    }

    handleSubmit() {
        this.handleClose();
    }
}

function OpenModal() {
    ReactDOM.render(<Modal />, document.getElementById('modal-wrapper'));
}

// ------------------------------------------------------------------
