import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink, Link, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import TasksList from './components/TasksList';
import CreateTask from './components/CreateTask';
import EditTask from './components/EditTask';
import LoginUser from './components/LoginUser';
import RegisterUser from './components/RegisterUser';

class App extends Component {
	
	render() {
		const { userEmail } = this.props.storage;
		return (
			<Router>
				<header className="header-app bg-dark">
					<h2
						className="text-center bg-info text-white"
						style={{ fontSize: '1rem', padding: '0.5rem', fontWeight: 'bold' }}
					>
						MERN TODO APP
					</h2>
					<div className="container">
						<nav className="navbar navbar-dark navbar-expand-md">
							<a href="http://www.pralma.pl" className="navbar-brand ">
								<span role="img" aria-label="logo">
									🦅
								</span>
							</a>
							<Link to="/" className="navbar-brand mr-auto">
								like aBird
							</Link>
							<button
								className="navbar-toggler"
								type="button"
								data-toggle="collapse"
								data-target="#navbarSupportedContent"
								aria-controls="navbarSupportedContent"
								aria-expanded="false"
								aria-label="Toggle navigation"
							>
								<span className="navbar-toggler-icon" />
							</button>
							<div className="collapse navbar-collapse" id="navbarSupportedContent">
								<ul className="navbar-nav ml-auto">
									<li className="nav-item">
										<NavLink to="/todos" exact className="nav-link">
											Tasks List To Do
										</NavLink>
									</li>
									<li className="nav-item">
										<NavLink to="/todos/create" className="nav-link">
											Create To Do task
										</NavLink>
									</li>
									<li className="nav-item">
										<NavLink to="/users/login" className="nav-link">
											Login
										</NavLink>
									</li>
									<li className="nav-item">
										<NavLink to="/users/register" className="nav-link">
											Register
										</NavLink>
									</li>
								</ul>
							</div>
						</nav>
					</div>
				</header>
				<main className="container">
					<div className="text-center pt-4 text-primary">
						{userEmail && (
							<p>
								<span className="text-dark">Witaj: </span>
								{userEmail}
							</p>
						)}
					</div>
					<Route path="/" exact component={TasksList} />
					<Route path="/todos" exact component={TasksList} />
					<Route path="/todos/create" component={CreateTask} />
					<Route path="/todos/edit/:id" component={EditTask} />
					<Route path="/users/login" component={LoginUser} />
					<Route path="/users/register" component={RegisterUser} />
					<div className="text-center">
						<span
							role="img"
							aria-label="logo"
							style={{
								fontSize: '3rem',
							}}
						>
							🦅
						</span>
					</div>
				</main>
				<footer className="bg-dark">
					<p className="container text-light text-center mb-0">&copy; Krystian Wrona 2019</p>
				</footer>
			</Router>
		);
	}
}

export default App;
