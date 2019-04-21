import React, { Component } from 'react';

class InformacoesPaciente extends Component {
	render() {
		let dataNasc = this.props.paciente.dataNascimento.split(" ")[0];
		return (
			<div className="informacoes--paciente grid--container grid--container-corpo" key={this.props.paciente.id}>
				<p><b>Paciente</b><br/>{this.props.paciente.nome}</p>
				<p><b>Idade</b><br/>{parseInt(2019) - parseInt(dataNasc.split("-")[2]) + " anos"}</p>
				<p><b>Telefone</b><br/>{this.props.paciente.telefone}</p>
				<p><b>Data de nascimento</b> <br/>{dataNasc}</p>
			</div>
		);
	}
}

export default InformacoesPaciente;
