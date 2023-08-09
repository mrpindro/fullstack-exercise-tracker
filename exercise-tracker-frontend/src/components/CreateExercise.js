import axios from 'axios';
import React, { Component } from 'react';
import DatePicker from 'react-datepicker';

export default class CreateExercise extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    componentDidMount () {
        axios.get('http://localhost:5500/users')
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({
                        users: res.data.map(user => user.username),
                        username: res.data[0].username
                    })
                }
            })
            .catch(err => console.log(err))

    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        })
    }

    onChangeDate(date) {
        this.setState({
            date: date
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        axios.post('http://localhost:5500/exercises/add', exercise)
            .then(result => console.log(result.data))
            .catch(err => console.log(err))
        ;

        window.location = '/';
    }
    render() {
        return (
            <div className='form-con'>
                <h3>Create Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label>Username</label>
                        <select
                            className='form-control'
                            required
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        >
                            { 
                                this.state.users.map((user) => {
                                    return <option key={user} value={user}>
                                        {user}
                                    </option>
                                })
                            }
                        </select>
                    </div>
                    <div className='form-group'>
                        <label>Description</label>
                        <input 
                            className='form-control'
                            required
                            type='text'
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className='form-group'>
                        <label>Duration</label>
                        <input 
                            className='form-control'
                            required
                            type='text'
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                        />
                    </div>
                    <div className='form-group'>
                        <label>Date</label>
                        <DatePicker  
                            className='date-picker'                     
                            selected={this.state.date}
                            onChange={this.onChangeDate}
                        />
                    </div>
                    <div className='form-group'>
                        <input 
                            className='submit-btn'
                            type='submit'
                            value='Create Exercise Log'
                        />
                    </div>
                </form>
            </div>
        )
    }
}
