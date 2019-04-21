import React, { Component } from 'react';

class InformacoesClinica extends Component {
	render() {
		return (
			<div className="informacoes--clinica">
				<p><b>Clinica : </b>{this.props.clinica.nomeFantasia}</p>
				<p><b>Endereço : </b>{this.props.clinica.endereco}</p>
				<p><b>Numero : </b>{this.props.clinica.numero}</p>
				<p><b>CEP : </b>{this.props.clinica.cep}</p>
			</div>
		);
	}
}

export default InformacoesClinica;
