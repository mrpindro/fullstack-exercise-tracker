import axios from 'axios';
import React, { Component } from 'react'

export default class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            image: '',
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    onChangeImage(e) {
        this.setState({
            image: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
            image: this.state.image
        }

        axios.post('http://localhost:5500/users/add', user)
            .then(result => console.log(result.data))
            .catch(err => console.log(err))
        ;

        this.setState({
            username: '',
            image: ''
        })
    }

    render() {
        return (
            <div className='form-con'>
                <h3>Create User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label>Username</label>
                        <input 
                            className='form-control'
                            required
                            type='text'
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className='form-group'>
                        <label>Image</label>
                        <input 
                            className='form-control'
                            // required
                            type='file'
                            // value={this.state.image}
                            onChange={this.onChangeImage}
                        />
                        <img src={this.state.image} alt='' />
                    </div>
                    <div className='form-group'>
                        <input 
                            className='submit-btn'
                            type='submit'
                            value='Create User'
                        />
                    </div>
                </form>
            </div>
        )
    }
}

