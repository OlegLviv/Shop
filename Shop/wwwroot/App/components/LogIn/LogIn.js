import React from 'react';

class LogIn extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.onDidMount();
	}

	render() {
		return (
			<div>login</div>
		);
	}
}

export default LogIn;