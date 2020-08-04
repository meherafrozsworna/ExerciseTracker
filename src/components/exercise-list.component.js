import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = (props) => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date}</td>
        <td>
            <Link to={'/edit/' + props.exercise._id}>
                <button type="button" className="btn btn-info ">
                    edit
                </button>
            </Link>
            {'  '}
            <button
                type="button"
                className="btn btn-info"
                onClick={() => {
                    props.deleteExercise(props.exercise._id);
                }}
            >
                delete
            </button>
        </td>
    </tr>
);

export default class exerciseList extends Component {
    constructor(props) {
        super(props);
        this.deleteExercise = this.deleteExercise.bind(this);
        this.state = { exercise: [] };
    }

    componentDidMount() {
        axios
            .get('http://localhost:5000/exercise/')
            .then((res) => {
                this.setState({ exercise: res.data });
            })
            .catch((err) => console.log(err));
    }

    deleteExercise(id) {
        axios
            .delete('http://localhost:5000/exercise/' + id)
            .then((res) => {
                console.log(res.data);
                this.setState({
                    exercise: this.state.exercise.filter((ex) => ex._id !== id),
                });
            })
            .catch((err) => console.log(err));
    }

    exercise_List() {
        return this.state.exercise.map((currentExercise) => {
            return (
                <Exercise
                    exercise={currentExercise}
                    deleteExercise={this.deleteExercise}
                    key={currentExercise._id}
                />
            );
        });
    }

    render() {
        return (
            <div className="container p-5 bg-secondary text-white">
                <h1 className="text-center p-5">Logged Exercises</h1>
                <table className="table text-white">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>{this.exercise_List()}</tbody>
                </table>
            </div>
        );
    }
}
