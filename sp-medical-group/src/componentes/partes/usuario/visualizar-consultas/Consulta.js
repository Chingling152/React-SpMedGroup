import React, { Component } from 'react';

class Consulta extends Component {
	render() {
		const Usuario = this.props.medico?
			<p>{this.props.medico}</p>:
			<p>{this.props.paciente}</p>;
		return (
			<section className="consulta--container">
				<h3>Consulta #{this.props.id}</h3>
				<div className="informacoes--consulta grid--container grid--container-corpo">
					<p>{this.props.data}</p>
					{Usuario}
					<p>{this.props.endereco}</p>
					<p>{this.props.situacao}</p>
				</div>
				<p className="descricao--consulta">{this.props.descricao.slice(0,117)+"..."}</p>
				<button>Ver mais informações</button>
				<hr />
			</section>
		);
	}
}

export default Consulta;
