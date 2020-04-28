import React, { Component } from 'react';
import axios from 'axios';

class CreateTask extends Component {
	minDate = new Date().toISOString().slice(0, 10);

	constructor(props) {
		super(props);

		this.state = {
			description: '',
			prioryty: '',
			finished: false,
			untilWhen: this.minDate,
		};

		this.onChangeDescription = this.onChangeDescription.bind(this);
		this.onChangePrioryty = this.onChangePrioryty.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onChangeUntilWhenDate = this.onChangeUntilWhenDate.bind(this);
	}

	onChangeDescription(event) {
		this.setState({
			description: event.target.value,
		});
	}
	onChangePrioryty(event) {
		this.setState({
			prioryty: event.target.value,
		});
	}
	onChangeUntilWhenDate(event) {
		this.setState({
			untilWhen: event.target.value,
		});
	}

	onSubmit(event) {
		event.preventDefault();

		const { description, prioryty, finished, untilWhen } = this.state;
		const token = localStorage.getItem('token');
		const userID = localStorage.getItem('userID');
		console.log(token);
		console.log(userID);
		const newTask = {
			description,
			prioryty,
			finished,
			untilWhen,
		};

		axios
			.post('http://localhost:4000/todos/add', newTask, {
				headers: {
					Authorization: 'Bearer ' + token,
				},
			})
			.then(res => {
				if (this.unmount) return;
				console.log(res);
			})
			.catch(error => console.log(error));

		this.setState({
			description: '',
			prioryty: '',
			finished: false,
			untilWhen: new Date().toISOString().slice(0, 10),
		});
		this.props.history.push('/todos');
	}

	componentWillUnmount() {
		this.unmount = true;
		// console.log('componentWillUnmount CreateTask', this.unmount);
	}

	render() {
		let maxDate = this.minDate.slice(0, 4) * 1 + 2;
		maxDate = maxDate + '-12-31';

		return (
			<div
				className="form-create-task"
				style={{
					padding: '1rem',
					borderRadius: '0.5rem',
					boxShadow: '0px 0px 6px 0px rgba(0,0,0,0.6)',
					maxWidth: '650px',
					margin: '3rem auto',
				}}
			>
				<h2 className="text-center text-uppercase" style={{ marginTop: '2rem' }}>
					Create task
				</h2>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label htmlFor="description">Description</label>
						<input
							type="text"
							id="description"
							className="form-control"
							onChange={this.onChangeDescription}
							value={this.state.description}
						/>
					</div>
					<div className="form-group">
						<div className="form-check form-check-inline">
							<input
								type="radio"
								id="priorytyHigh"
								className="form-check-input"
								name="priorytyOptions"
								onChange={this.onChangePrioryty}
								value="high"
								checked={this.state.prioryty === 'high'}
							/>
							<label htmlFor="priorytyHigh" className="form-check-label mb-0">
								high
							</label>
						</div>
						<div className="form-check form-check-inline">
							<input
								type="radio"
								id="priorytyMedium"
								className="form-check-input"
								name="priorytyOptions"
								onChange={this.onChangePrioryty}
								value="medium"
								checked={this.state.prioryty === 'medium'}
							/>
							<label htmlFor="priorytyHigh" className="form-check-label mb-0">
								medium
							</label>
						</div>
						<div className="form-check form-check-inline">
							<input
								type="radio"
								id="priorytyLow"
								className="form-check-input"
								name="priorytyOptions"
								onChange={this.onChangePrioryty}
								value="low"
								checked={this.state.prioryty === 'low'}
							/>
							<label htmlFor="priorytyHigh" className="form-check-label mb-0">
								low
							</label>
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="untilWhen">Until when</label>
						<input
							className="form-control"
							type="date"
							name=""
							id="untilWhen"
							min={this.minDate}
							max={maxDate}
							value={this.state.untilWhen}
							onChange={this.onChangeUntilWhenDate}
						/>
					</div>
					<div className="form-group">
						<input type="submit" value="add task" className="btn btn-primary" />
					</div>
				</form>
			</div>
		);
	}
}

export default CreateTask;
