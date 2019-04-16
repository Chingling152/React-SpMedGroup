import React, { Component } from 'react';

class InformacoesPaciente extends Component {
	render() {
		return (
			<div className="informacoes--paciente grid--container grid--container-corpo" key={this.props.paciente.id}>
				<p>{this.props.paciente.nome}</p>
				<p>{parseInt(2019) - parseInt(this.props.paciente.dataNascimento.split("/")[2]) + " anos"}</p>
				<p>{this.props.paciente.telefone}</p>
				<p>{this.props.paciente.dataNascimento}</p>
			</div>
		);
	}
}

export default InformacoesPaciente;
