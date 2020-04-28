import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const Task = ({ task, index, deleteTask, finishingTask }) => {
	const { _id, description, prioryty, date, untilWhen, finished } = task;
	const ID = index + 1;
	let className = ['text-center', 'text-white'];

	switch (prioryty) {
		case 'high':
			className = className.concat('bg-danger').join(' ');
			break;
		case 'medium':
			className = className.concat('bg-warning').join(' ');
			break;
		default:
			className = className.concat('bg-success').join(' ');
			break;
	}
	return (
		<tr>
			<th scopre="row" style={finished ? { textDecoration: 'line-through' } : {}}>
				{ID}
			</th>
			<td className="text-left" style={finished ? { textDecoration: 'line-through' } : {}}>
				{description}
			</td>
			<td className={className} style={finished ? { textDecoration: 'line-through' } : {}}>
				{prioryty}
			</td>
			<td className="text-center" style={finished ? { textDecoration: 'line-through' } : {}}>
				{date}
			</td>
			<td className="text-center" style={finished ? { textDecoration: 'line-through' } : {}}>
				{untilWhen}
			</td>
			<td className="text-center">{finished ? 'true' : 'false'}</td>
			<td className="text-center">
				<Link to={'/todos/edit/' + _id} className="btn btn-outline-primary btn-sm mr-2">
					UPDATE
				</Link>
				<Button click={deleteTask} id={_id}>
					DELETE
				</Button>
				<Button click={finishingTask} id={_id}>
					FINISH
				</Button>
			</td>
		</tr>
	);
};

export default Task;
