import React, { Component } from 'react';

class InformacoesMedico extends Component {
	render() {
		return (
			<div className="informacoes--medico" key={this.props.id}>
				<p>{this.props.medico.nome}</p>
				<p>{this.props.medico.especialidade}</p>
			</div>
		);
	}
}

export default InformacoesMedico;
