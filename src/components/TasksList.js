import React, { Component } from 'react';
import axios from 'axios';
import Task from './Task';

class TaskList extends Component {
	_isMounted = false;

	constructor(props) {
		super(props);
		this.state = {
			count: null,
			todos: [],
			message: '',
			countFinishedTask: 0,
			sort: '', //"all","finished","byDateUp","byDateDown"
		};
		this.deleteTask = this.deleteTask.bind(this);
		this.finishingTask = this.finishingTask.bind(this);
		this.renderTasks = this.renderTasks.bind(this);
		this.rednderFinishedTaskList = this.rednderFinishedTaskList.bind(this);
		this.renderByDate = this.renderByDate.bind(this);
		this.renderByDateDown = this.renderByDateDown.bind(this);
		this.sortList = this.sortList.bind(this);
	}

	componentWillUnmount() {
		this._isMounted = false;
		// console.log('componentWillUnMount TasksList');
	}

	componentDidMount() {
		this._isMounted = true;

		axios
			.get(`http://localhost:4000/todos`)
			.then(result => {
				if (this._isMounted) {
					const { count, todos } = result.data;
					const countFinishedTask = todos.filter(task => task.finished === true).length;
					this.setState({
						count,
						todos,
						countFinishedTask,
					});
				}
			})
			.catch(error => {
				console.log(error);
			});
	}

	compareState(nextState, state) {
		if (typeof nextState !== 'object' || nextState === null || typeof state !== 'object' || state === null) {
			return false;
		}
		if (nextState === state) return true;
		if (nextState.length !== state.length) return false;

		for (let i = 0; i < nextState.length; i++) {
			if (!this.compare(nextState[i], state[i])) {
				return false;
			}
		}
		return true;
	}

	compare(obja, objb) {
		if (typeof obja !== 'object' || obja === null || typeof obja !== 'object' || objb === null) {
			return false;
		}

		if (obja === objb) return true;

		const keysa = Object.keys(obja);
		const keysb = Object.keys(objb);

		if (keysa.length !== keysb.length) return false;
		for (let i = 0; i < keysa.length; i++) {
			if (obja[keysa[i]] !== objb[keysb[i]]) {
				return false;
			}
		}

		return true;
	}

	shouldComponentUpdate(nextProps, nextState) {
		return (
			!this.compareState(nextState.todos, this.state.todos) ||
			this.props.location.search !== nextProps.location.search ||
			this.state.sort !== nextState.sort
		);
	}

	componentDidUpdate(prevProps, prevState) {
		axios
			.get(`http://localhost:4000/todos`)
			.then(result => {
				const { count, todos } = result.data;
				// console.log(todos);
				// console.log('componentDidUpdate TasksList', result.data);
				const countFinishedTask = todos.filter(task => task.finished === true).length;

				this.setState({
					count,
					todos,
					countFinishedTask,
				});
			})
			.catch(error => {
				console.log(error);
			});
	}

	finishingTask(id) {
		// console.log(id);
		let finishedTask = this.state.todos.find(task => task._id === id);
		finishedTask = {
			...finishedTask,
			finished: !finishedTask.finished,
		};
		axios
			.post('http://localhost:4000/todos/update/' + id, finishedTask)
			.then(result => {
				this.setState({
					todos: [],
				});
			})
			.catch(error => console.log(error));
	}

	deleteTask(id) {
		// console.log('deleted task', id);
		axios
			.delete('http://localhost:4000/todos/delete/' + id)
			.then(result => {
				console.log(result);
				const restTasks = this.state.todos.filter(task => task._id !== id);
				this.setState(prevState => ({
					count: restTasks.length,
					todos: restTasks,
					message: result.data.message,
				}));
			})
			.catch(error => console.log(error));
	}

	renderTasks() {
		// console.log('render tasklist', this.state.todos);
		const { todos } = this.state;
		const tasksList = todos.map((task, index) => {
			return (
				<Task
					key={task._id}
					task={task}
					index={index}
					deleteTask={this.deleteTask}
					finishingTask={this.finishingTask}
				/>
			);
		});
		return tasksList;
	}

	rednderFinishedTaskList() {
		console.log('Render finished list tasks');
		const { todos } = this.state;
		const finishedTasks = todos.filter(task => task.finished === true);
		return finishedTasks.map((task, index) => {
			return (
				<Task
					key={task._id}
					task={task}
					index={index}
					deleteTask={this.deleteTask}
					finishingTask={this.finishingTask}
				/>
			);
		});
	}
	sortList(event) {
		// console.log(event.target.name);
		this.setState({
			sort: event.target.name,
		});
	}
	renderByDate() {
		console.log('Sorting by date UP');
		const date = [...this.state.todos];

		const dateSort = date.sort(function(a, b) {
			if (a.date > b.date) return -1;
			if (a.date < b.date) return 1;
			return 0;
		});

		return dateSort.map((task, index) => {
			return (
				<Task
					key={task._id}
					task={task}
					index={index}
					deleteTask={this.deleteTask}
					finishingTask={this.finishingTask}
				/>
			);
		});
	}

	renderByDateDown() {
		console.log('Sorting by date DOWN');
		const date = [...this.state.todos];

		const dateSort = date.sort(function(b, a) {
			if (a.date > b.date) return -1;
			if (a.date < b.date) return 1;
			return 0;
		});

		return dateSort.map((task, index) => {
			return (
				<Task
					key={task._id}
					task={task}
					index={index}
					deleteTask={this.deleteTask}
					finishingTask={this.finishingTask}
				/>
			);
		});
	}

	render() {
		const { sort } = this.state;
		let sortList = null;
		switch (sort) {
			case 'all':
				console.log('all...');
				sortList = this.renderTasks;
				break;
			case 'finished':
				sortList = this.rednderFinishedTaskList;
				break;
			case 'byDateUp':
				sortList = this.renderByDate;
				break;
			case 'byDateDown':
				sortList = this.renderByDateDown;
				break;
			default:
				sortList = this.renderTasks;
				break;
		}

		return (
			<div className="" style={{ marginBottom: '3rem' }}>
				<h2 className="text-center text-uppercase" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
					List of tasks
				</h2>
				<div className="">
					<button
						onClick={this.sortList}
						name="all"
						type="button"
						className="btn btn-outline-light text-dark btn-sm mr-2 mb-2"
					>
						All tasks
						<span className="badge badge-dark ml-2">{this.state.count}</span>
						<span className="sr-only">unread messages</span>
					</button>
					<button
						onClick={this.sortList}
						type="button"
						name="finished"
						className="btn btn-outline-light text-dark btn-sm mr-2 mb-2"
					>
						Finished tasks
						<span className="badge badge-dark ml-2">{this.state.countFinishedTask}</span>
						<span className="sr-only">unread messages</span>
					</button>
					<button
						onClick={this.sortList}
						type="button"
						name="byDateUp"
						className="btn btn-outline-light text-dark btn-sm mr-2 mb-2"
					>
						UP
						<span className="sr-only">unread messages</span>
					</button>
					<button
						onClick={this.sortList}
						type="button"
						name="byDateDown"
						className="btn btn-outline-light text-dark btn-sm mr-2 mb-2"
					>
						DOWN
						<span className="sr-only">unread messages</span>
					</button>
				</div>
				<table className="table table-striped table-light">
					<thead className="thead-dark text-center">
						<tr>
							<th scope="col">ID</th>
							<th scope="col">Description</th>
							<th scope="col">Priority</th>
							<th scope="col">Added</th>
							<th scope="col">Until when</th>
							<th scope="col">Finished</th>
							<th scoper="col">Actions</th>
						</tr>
					</thead>
					<tbody>{sortList()}</tbody>
				</table>
			</div>
		);
	}
}

export default TaskList;
