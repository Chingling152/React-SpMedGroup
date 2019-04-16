import React, { Component } from 'react';

class TituloSublinhado extends Component {
	render() {
		return (
			<div>
				<h3>{this.props.mensagem}</h3>
				<hr style={{maxWidth:this.props.tamanho}}/>
			</div>
		);
	}
}

export default TituloSublinhado;
