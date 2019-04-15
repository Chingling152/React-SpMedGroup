import React, { Component } from 'react';

class MensagemAviso extends Component {
	render() {
		return (
			<span className="mensagem--aviso">{this.props.mensagem}</span>
		);
	}
}

export default MensagemAviso;
