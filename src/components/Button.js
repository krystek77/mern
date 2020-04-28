import React from 'react';

const Button = ({ children, click, id }) => {
	let className = ['btn btn-sm mr-2'];

	switch (children) {
		case 'DELETE':
			className = className.concat('btn-outline-danger').join(' ');
			break;
		case 'FINISH':
			className = className.concat('btn-outline-success').join(' ');
			break;
		default:
			break;
	}
	return (
		<button className={className} onClick={() => click(id)}>
			{children}
		</button>
	);
};

export default Button;
