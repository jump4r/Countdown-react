import React from 'react';
import ReactDOM from 'react-dom';
import '../src/index.css';

function CompileTimeRemaining(time) {
    let days = Math.floor(time / (1000 * 60 * 60 * 24));
    let hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((time % (1000 * 60)) / 1000);
    return (days + ' Days ' + hours + ' Hours ' + minutes + ' Minutes ' + seconds + ' Seconds.');
}

function CountdownElement(props) {
    return(
        <tr scope='row' className='countdown-row'>
            <td className='countdown-id'>{props.id}</td>
            <td className='countdown-time-remaining'>{CompileTimeRemaining(props.timeRemaining)}</td>
            <td className='countdown-end-time'>{props.endDate}</td>
            <td>
                <button className='btn btn-outline-dark btn-countdown-remove' onClick={props.RemoveCountdown}>&times;</button>
            </td>
        </tr>
    );
}

class CountdownTable extends React.Component {
    constructor() {
        super();    
        this.state = {
            countdowns: [],
        };
    }

    componentDidMount() {
        requestAnimationFrame(() => {this.UpdateCountdowns()});
        this.LoadData();
    }

    OpenModal() {
        ReactDOM.render(<Modal onClick={(idValue, endDateValue) => this.AddCountdown(idValue, endDateValue)} />, document.getElementById('modal-wrapper'));
    }

    SaveData(countdowns) {
        console.log(JSON.stringify(countdowns));
        window.localStorage.setItem('SaveData', JSON.stringify(countdowns));
    }

    LoadData() {
        if (window.localStorage.getItem('SaveData')) {
            const countdowns = JSON.parse(window.localStorage.getItem('SaveData'));
            this.setState({
                countdowns: countdowns,
            });
        }
    }

    AddCountdown(idValue, endDateValue) {
        const countdowns = this.state.countdowns.slice();
        const time = Math.floor(new Date(endDateValue).getTime());
        const remaining = (time - Date.now());
        this.setState({
            countdowns: countdowns.concat([{
                id: idValue,
                timeRemaining: remaining,
                endDate: endDateValue,
            }]),
        }, function() {
            console.log(this.state.countdowns);
            this.SaveData(this.state.countdowns.slice());
        });
    }

    RemoveCountdown(index) {
        const countdowns = this.state.countdowns;
        // console.log(countdowns);
        // console.log(parseInt(index));
        countdowns.splice(index, 1);
        
        this.setState({
            countdowns: countdowns,
        }, function() {
            this.SaveData(countdowns);
        });
    }

    UpdateCountdowns() {
        const countdowns = this.state.countdowns.slice();
        
        for (let i = 0; i < countdowns.length; i++) {
            const time = new Date(countdowns[i].endDate).getTime();
            const remaining = (time - Date.now());
            countdowns[i].timeRemaining = remaining;
        }
        this.setState({
            countdowns: countdowns,
        });

        requestAnimationFrame(() => {this.UpdateCountdowns()});
    }

    render() {
        const countdowns = this.state.countdowns;
        const elements = countdowns.map((countdown, i) => {
            return (<CountdownElement
                key={countdown.id}
                index={parseInt(i)}
                id={countdown.id} 
                timeRemaining={countdown.timeRemaining} 
                endDate={countdown.endDate} 
                RemoveCountdown={(index) => this.RemoveCountdown(index)}
            />);
        });
        

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
                            {elements}
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

    handleSubmit(idValue, endDateValue) {
        this.props.onClick(idValue, endDateValue);
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
                    <button id='modal-submit-button' className='btn btn-outline-dark' onClick={() => this.handleSubmit(this.state.idValue, this.state.endDateValue)}>Submit</button>
                </div>
            </div>
        </div>
        );
    }
}

// ------------------------------------------------------------------
ReactDOM.render(<CountdownTable />, document.getElementById('countdown-wrapper'));