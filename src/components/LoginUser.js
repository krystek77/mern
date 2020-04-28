import React, { Component, Fragment } from 'react';
import axios from 'axios';

class LoginUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
		};
		this.onSubmit = this.onSubmit.bind(this);
		this.handleInputs = this.handleInputs.bind(this);
	}

	handleInputs(event) {
		console.log(event.target.name);
		const input = event.target.name;
		this.setState({
			[input]: event.target.value,
		});
	}
	onSubmit(event) {
		event.preventDefault();
		console.log('Try login');
		const { email, password } = this.state;
		const user = {
			email,
			password,
		};
		axios
			.post('http://localhost:4000/users/login', user)
			.then(result => {
				const { message, token, user } = result.data;
				console.log(message, token, user);
				localStorage.setItem('token', token);
				localStorage.setItem('userEmail', user.email);
				localStorage.setItem('userID', user.userID);
				console.log(localStorage);
				console.log('Witaj ', localStorage.getItem('userEmail'));
				console.log('Witaj ', localStorage.getItem('userID'));
			})
			.catch(error => console.log(error));
		this.props.history.push('/todos/create');
	}

	render() {
		return (
			<Fragment>
				<h1
					className="text-center text-black-90"
					style={{ marginTop: '2rem', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '2rem' }}
				>
					Login form
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
							<button type="submit" className="btn btn-success d-block ml-auto btn-lg">
								Login
							</button>
						</div>
					</form>
				</div>
				<hr />
			</Fragment>
		);
	}
}

export default LoginUser;
