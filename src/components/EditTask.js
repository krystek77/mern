import React, { Component } from 'react';
import axios from 'axios';

class EditTask extends Component {
	_isMounted = false;

	constructor(props) {
		super(props);
		this.state = {
			description: '',
			prioryty: '',
			date: '',
			untilWhen: '',
			finished: false,
		};
		this.onSubmit = this.onSubmit.bind(this);
		this.onChangeDescription = this.onChangeDescription.bind(this);
		this.onChangePrioryty = this.onChangePrioryty.bind(this);
		this.onChangeFinished = this.onChangeFinished.bind(this);
		this.onChangeCreatedDate = this.onChangeCreatedDate.bind(this);
		this.onChangeUntilWhenDate = this.onChangeUntilWhenDate.bind(this);
	}

	componentDidUpdate() {
		console.log('componentdidupdate edit task');
	}

	componentDidMount() {
		this._isMounted = true;
		axios
			.get('http://localhost:4000/todos/' + this.props.match.params.id)
			.then(response => {
				if (this._isMounted) {
					const { description, prioryty, date, untilWhen, finished } = response.data;
					this.setState({
						description,
						prioryty,
						date,
						untilWhen,
						finished,
					});
				}
			})
			.catch(error => console.log(error.message));
	}

	componentWillUnmount() {
		console.log('componentWillUnmount EditTask');
		this._isMounted = false;
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
	onChangeFinished(event) {
		this.setState({
			finished: !this.state.finished,
		});
	}
	onChangeCreatedDate(event) {
		this.setState({
			date: event.target.value,
		});
	}
	onChangeUntilWhenDate(event) {
		this.setState({
			untilWhen: event.target.value,
		});
	}
	onSubmit(event) {
		event.preventDefault();
		const updatedTask = {
			...this.state,
		};
		axios
			.post('http://localhost:4000/todos/update/' + this.props.match.params.id, updatedTask)
			.then(result => {
				console.log(result.data);
			})
			.catch(error => console.log(error));

		this.props.history.push('/todos');
	}
	render() {
		const { description, prioryty, date, untilWhen, finished } = this.state;

		return (
			<div
				className="form-edit-task"
				style={{
					padding: '1rem',
					borderRadius: '0.5rem',
					boxShadow: '0px 0px 6px 0px rgba(0,0,0,0.6)',
					maxWidth: '650px',
					margin: '3rem auto',
				}}
			>
				<h2
					className="text-center text-uppercase"
					style={{
						marginTop: '2rem',
					}}
				>
					Edit to do task form
				</h2>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label htmlFor="description">Description</label>
						<input
							type="text"
							id="description"
							value={description}
							className="form-control"
							onChange={this.onChangeDescription}
						/>
					</div>
					<div className="form-group">
						<div className="form-check form-check-inline">
							<input
								className="form-check-input"
								type="radio"
								id="priorityHigh"
								value="high"
								checked={prioryty === 'high'}
								onChange={this.onChangePrioryty}
							/>
							<label className="form-check-label mb-0" htmlFor="priorityHigh">
								high
							</label>
						</div>
						<div className="form-check form-check-inline">
							<input
								type="radio"
								id="priorityMedium"
								className="form-check-input"
								value="medium"
								checked={prioryty === 'medium'}
								onChange={this.onChangePrioryty}
							/>
							<label className="form-check-label mb-0" htmlFor="priorityMedium">
								medium
							</label>
						</div>
						<div className="form-check form-check-inline">
							<input
								type="radio"
								id="priorityLow"
								className="form-check-input"
								value="low"
								checked={prioryty === 'low'}
								onChange={this.onChangePrioryty}
							/>
							<label className="form-check-label mb-0" htmlFor="priorityLow">
								low
							</label>
						</div>
					</div>
					<div className="form-group">
						<div className="form-check form-check-inline">
							<input
								className="form-check-input"
								type="checkbox"
								id="finished"
								value={finished}
								checked={finished}
								onChange={this.onChangeFinished}
							/>
							<label className="form-check-label" htmlFor="finished">
								finished
							</label>
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="createdAt">Created at</label>
						<input
							id="createdAd"
							className="form-control"
							type="date"
							min={date}
							max="2021-12-31"
							value={date}
							onChange={this.onChangeCreatedDate}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="untilWhen">Until when</label>
						<input
							id="untilWhen"
							className="form-control"
							type="date"
							min={untilWhen}
							max="2021-12-31"
							value={untilWhen}
							onChange={this.onChangeUntilWhenDate}
						/>
					</div>
					<div className="form-group">
						<input type="submit" value="update task" className="btn btn-primary" />
					</div>
				</form>
			</div>
		);
	}
}

export default EditTask;
