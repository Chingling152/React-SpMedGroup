import React, { Component } from 'react';

class InformacoesMedico extends Component {
	render() {
		return (
			<div className="informacoes--medico grid--container" key={this.props.id}>
				<p><b>Medico : </b>{this.props.medico.nome}</p>
				<p><b>Especialidade : </b>{this.props.medico.idEspecialidadeNavigation.nome}</p>
			</div>
		);
	}
}

export default InformacoesMedico;
