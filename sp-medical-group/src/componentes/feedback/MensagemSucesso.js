import React, { Component } from 'react';

class MensagemSucesso extends Component {
	render() {
		return (
			<span className="mensagem--sucesso">{this.props.mensagem}</span>
		);
	}
}

export default MensagemSucesso;
