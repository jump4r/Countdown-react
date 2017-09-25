import React from 'react';
import ReactDOM from 'react-dom';
import '../src/index.css';

var addName, addTime;
Date.prototype.toISODurationString = function () {
	return "P" + this.getDurationDays() + "D" + this.getDurationHours() + "H" + this.getDurationMinutes() + "M" + this.getDurationSeconds() + "S";
}
Date.prototype.getDurationDays = function () {
	return Math.floor(this.getTime() / (1000 * 60 * 60 * 24));
}
Date.prototype.getDurationHours = function () {
	return Math.floor((this.getTime() % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
}
Date.prototype.getDurationMinutes = function () {
	return Math.floor((this.getTime() % (1000 * 60 * 60)) / (1000 * 60));
}
Date.prototype.getDurationSeconds = function () {
	return Math.floor((this.getTime() % (1000 * 60)) / 1000);
}

function CountdownElement(props) {
    return(
        <tr scope='row' class='countdown-row'>
            <td class='countdown-id'>{props.id}</td>
            <td class='countdown-time-remaining'>{props.timeRemaining}</td>
            <td class='countdown-end-time'>End Time</td>
            <td>
                <button class='btn btn-outline-dark btn-coutndown-remove'>&times;</button>
            </td>
        </tr>
    );
}

class CountdownTable extends React.Component {
    constructor() {
        super();    
        this.state = {
            countdowns: [
                {
                    id: '',
                    timeRemaining: 0,
                }
            ],
        };
    }

    OpenModal() {
        ReactDOM.render(<Modal onClick={() => this.AddCountdown()} />, document.getElementById('modal-wrapper'));
    }

    AddCountdown() {
        const countdowns = this.state.countdowns;
        this.setState({
            countdowns: countdowns.concat([{
                id: '',
                timeReamining: 1,
            }]),
        });
        console.log(this.state.countdowns);
    }

    render() {
        const countdowns = '';
        return(
            <div className='countdown-class-wrapper'> 
                <h1 className='title'>Countdown</h1>
                <div className='table-wrapper'>
                    <table className='table'>
                        <thead>
                            <tr scope='row'>
                                <th colSpan='4'>Your Countdowns</th>    
                            </tr>
                        </thead>
                        <tbody>
                            <tr scope='row'>
                                <td>Countdown Label</td>
                                <td>Time Remaining</td>
                                <td>End Time</td>
                                <td className='text-center'>Remove</td>
                            </tr>
                            {/*countdowns*/}
                            <tr scope='row'>    
                                <td className='new-button' colSpan='4'>
                                    <button id='modal-open' className='btn btn-outline-dark' onClick={() => this.OpenModal()}>
                                        New Countdown
                                        <span className="glyphicon glyphicon-asterisk"></span>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
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
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
    }

    handleIdChange(event) {
        this.setState({
            idValue: event.target.value,
        });
    }

    handleEndDateChange(event) {
        this.setState({
            endDateValue: event.target.value.toString(),
        });
    }

    
    handleClose() {
        document.querySelector('#create-countdown-modal').remove();
    }

    handleSubmit() {
        this.props.onClick();
        this.handleClose();
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
}

// ------------------------------------------------------------------
ReactDOM.render(<CountdownTable />, document.getElementById('countdown-wrapper'));