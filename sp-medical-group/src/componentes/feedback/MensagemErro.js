import React, { Component } from 'react';

class MensagemErro extends Component {
	render() {
		return (
			<span className="mensagem--erro">{this.props.mensagem}</span>
		);
	}
}

export default MensagemErro;
