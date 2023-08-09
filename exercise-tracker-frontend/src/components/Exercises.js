import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>
            <Link className='edit-link' to={`/edit/${props.exercise._id}`}>edit</Link> | 
            <button 
                className='delete-link' 
                onClick={() => { props.deleteExercise(props.exercise._id) }}
            >delete</button>
        </td>
    </tr>
)


export default class Exercises extends Component {
    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = { exercises: [], users: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:5500/exercises/')
            .then(res => {
                this.setState({ exercises: res.data })
            })
            .catch((err) => console.log(err))
        ;
    }

    deleteExercise(id) {
        axios.delete('http://localhost:5500/exercises/'+id)
            .then(result => console.log(result.data))
            .catch(err => console.log(err))
        ;

        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }

    exerciseList() {
        return this.state.exercises.map(currentExercise => {
            return <Exercise 
                    exercise={currentExercise} 
                    deleteExercise={this.deleteExercise}
                    key={currentExercise._id}
                />
        })
    }

    render() {
        return (
            <div>
                <h3>Logged Exercises</h3>
                <div className='exercise-list-con'>
                    <table className='table'>
                        <thead className='thead'>
                            <tr>
                                <th>Username</th>
                                <th>Description</th>
                                <th>Duration</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.exerciseList() }
                        </tbody>
                    </table>
                </div>

            </div>
        )
    }
}
