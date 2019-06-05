import React, { Component } from 'react';

class InformacoesClinica extends Component {
	render() {
		const endereco = `${this.props.clinica.endereco} - ${this.props.clinica.numero}`
		return (
			<div className="informacoes--clinica">
				<p><b>Clinica : </b>{this.props.clinica.nomeFantasia}</p>
				<p><b>Endereço : </b>{this.props.clinica.endereco}</p>
				<p><b>Numero : </b>{this.props.clinica.numero}</p>
				<p><b>CEP : </b>{this.props.clinica.cep}</p>
				<a href={`/minha-area/localizacao?endereco=${endereco}`} className="link--endereco">Veja como chegar</a>
			</div>
		);
	}
}

export default InformacoesClinica;
