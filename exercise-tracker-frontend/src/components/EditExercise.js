import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { useParams } from 'react-router-dom';

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />
}

class EditExercise extends Component {
    constructor (props) {
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

    componentDidMount() {
        axios.get('http://localhost:5500/exercises/' + this.props.params.id)
            .then(res => {
                this.setState({
                    username: res.data.username,
                    description: res.data.description,
                    duration: res.data.duration,
                    date: new Date(res.data.date)
                })
            })
            .catch(err => console.log(err))
        ;

        axios.get('http://localhost:5500/users/')
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({
                        users: res.data.map(user => user.username),
                    })
                }
            })
            .catch(err => console.log(err))
    }

    onChangeUsername (e) {
        this.setState({
            username: e.target.value
        })
    }

    onChangeDescription (e) {
        this.setState({
            description: e.target.value
        })
    }

    onChangeDuration (e) {
        this.setState({
            duration: e.target.value
        })
    }

    onChangeDate (date) {
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

        console.log(exercise);

        axios.put('http://localhost:5500/exercises/update/' + this.props.params.id, exercise)
            .then(result => console.log(result.data))
        ;

        window.location = '/';
    }

    render() {
        return (
            <div className='form-con'>
                <h3>Edit Exercise Log</h3>
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
                                    return <option
                                            key={user}
                                            value={user}
                                        >
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
                            value="Edit Exercise Log"
                        />
                    </div>
                </form>
            </div>
        )
    }
}

export default withParams(EditExercise);
