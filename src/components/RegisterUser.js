import React, { Component, Fragment } from 'react';
import axios from 'axios';

class RegisterUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			confirmPassword: '',
			isRegulations: false,
		};
		this.onSubmit = this.onSubmit.bind(this);
		this.handleInputs = this.handleInputs.bind(this);
		this.handleRegulations = this.handleRegulations.bind(this);
	}

	handleInputs(event) {
		console.log(event.target.name);
		const input = event.target.name;
		this.setState({
			[input]: event.target.value,
		});
	}
	handleRegulations(event) {
		this.setState(prevState => ({
			isRegulations: !prevState.isRegulations,
		}));
	}
	validationForm() {
		if (this.state.isRegulations === false) return false;
		return true;
	}
	onSubmit(event) {
		event.preventDefault();
		console.log('Try register');
		const { email, password } = this.state;

		const newUser = {
			email,
			password,
		};
		if (this.validationForm()) {
			axios
				.post('http://localhost:4000/users/register', newUser)
				.then(result => {
					console.log(result.data.message);
				})
				.catch(error => console.log(error));

			this.setState({
				email: '',
				password: '',
				confirmPassword: '',
				isRegulations: false,
			});
			this.props.history.push('/users/login');
		} else {
			const { email, password, confirmPassword, isRegulations } = this.state;
			this.setState({
				email,
				password,
				confirmPassword,
				isRegulations,
			});
		}
	}
	render() {
		return (
			<Fragment>
				<h1
					className="text-center text-black-90"
					style={{ marginTop: '2rem', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '2rem' }}
				>
					Register form
				</h1>
				<div
					className="login-form"
					style={{
						padding: '1rem',
						borderRadius: '0.5rem',
						boxShadow: '0px 0px 6px 0px rgba(0,0,0,0.6)',
						maxWidth: '450px',
						margin: '2rem auto 2rem',
						overflow: 'hidden',
					}}
				>
					<h2
						style={{
							margin: '-1rem -1rem 0rem -1rem',
							padding: '1rem',
							backgroundColor: '#28a745',
							textAlign: 'center',
							color: 'white',
						}}
					>
						<span role="img" aria-label="logo">
							{' '}
							🦅{' '}
						</span>
						likeABird
					</h2>
					<form onSubmit={this.onSubmit} style={{ padding: '0rem 2rem' }}>
						<div className="form-group" style={{ marginTop: '2rem' }}>
							<label htmlFor="email">e-mail</label>
							<input
								type="text"
								id="email"
								name="email"
								placeholder="kowalski@gmail.com"
								className="form-control"
								value={this.state.email}
								onChange={this.handleInputs}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="password">password</label>
							<input
								type="text"
								id="password"
								name="password"
								placeholder="password"
								className="form-control"
								value={this.state.password}
								onChange={this.handleInputs}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="confirmPassword">confirm password</label>
							<input
								type="text"
								id="confirmPassword"
								name="confirmPassword"
								placeholder="confirm password"
								className="form-control"
								value={this.state.confirmPassword}
								onChange={this.handleInputs}
							/>
						</div>
						<div className="form-check">
							<input
								type="checkbox"
								name="regulations"
								id="regulations"
								className="form-check-input"
								value={this.state.isRegulations}
								checked={this.state.isRegulations}
								onChange={this.handleRegulations}
							/>
							<label htmlFor="regulations" className="form-check-label text-primary">
								<strong>I agree</strong> to the terms of service
							</label>
						</div>
						<div className="form-group">
							<button type="submit" className="btn btn-success d-block ml-auto btn-lg">
								Register
							</button>
						</div>
					</form>
				</div>
				<hr />
			</Fragment>
		);
	}
}

export default RegisterUser;
