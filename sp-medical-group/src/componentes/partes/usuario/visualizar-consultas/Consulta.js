import React, { Component } from 'react';

class Consulta extends Component {
	render() {
		const Usuario = this.props.medico !== null?
			<p>{this.props.medico.nome}</p>:
			<p>{this.props.paciente.nome}</p>;
		
		const Descricao = this.props.descricao !== undefined?
		<p className="descricao--consulta">{this.props.descricao.slice(0,117)+"..."}</p>:
		<p>Sem descrição disponivel</p>
		;
		return (
			<section className="consulta--container" key={this.props.id}>
				<h3>Consulta #{this.props.id}</h3>
				<div className="informacoes--consulta grid--container grid--container-corpo">
					<p>{this.props.data}</p>
					{Usuario}
					<p>{this.props.medico.idClinicaNavigation.endereco}</p>
					<p>{this.props.situacao}</p>
				</div>
				{Descricao}
				<button onClick={this.props.acao}>Ver mais informações</button>
				<hr />
			</section>
		);
	}
}

export default Consulta;
