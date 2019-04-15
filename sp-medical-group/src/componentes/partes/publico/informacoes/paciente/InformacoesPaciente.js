import React, { Component } from 'react';

class InformacoesPaciente extends Component {
	render() {
		return (
			<div className="informacoes--paciente" key={this.props.id}>
				<p>{this.props.nome}</p>
				<p>{this.state.idade + " anos"}</p>
				<p>{this.props.telefone}</p>
				<p>{this.props.dataNascimento}</p>
			</div>
		);
	}
}

export default InformacoesPaciente;
