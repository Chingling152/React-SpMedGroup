import React, { Component } from 'react';

class InformacoesClinica extends Component {
	render() {
		return (
			<div className="informacoes--clinica">
				<p>{this.props.clinica.nome}</p>
				<p>{this.props.clinica.endereco}</p>
				<p>{this.props.clinica.numero}</p>
				<p>{this.props.clinica.cep}</p>
			</div>
		);
	}
}

export default InformacoesClinica;
