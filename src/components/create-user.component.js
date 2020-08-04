import React, { Component } from 'react'
import axios from 'axios';

export default class createUser extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value,
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const user = {
            username: this.state.username,
        };
        console.log(user);
        axios.post('http://localhost:5000/users/add',user)
            .then(res => console.log(res.data));
            
        this.setState({
            username: ''
        })
    }

    render() {
        return (
            <div className="container p-5 bg-secondary text-white">
                <h1 className="text-center pb-5">Create Exercise Log</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label> Username : </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="submit"
                            value="Create User"
                            className="btn btn-dark"
                        ></input>
                    </div>
                </form>
            </div>
        )
    }
}