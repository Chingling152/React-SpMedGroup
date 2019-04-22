import React, { Component } from 'react';

import TituloSublinhado from '../../titulos/TituloSublinhado';
import InformacoesPaciente from '../../publico/informacoes/paciente/InformacoesPaciente';
import InformacoesMedico from '../../publico/informacoes/medico/InformacoesMedico';
import InformacoesClinica from '../../publico/informacoes/clinica/InformacoesClinica';
import ApiService from '../../../../services/ApiService';

class ConsultaDetalhada extends Component {
	constructor(props) {
		// props recebidas
		// consulta (id data status paciente medico (clinica especialidade))
		// tipoUsuario
		super(props);

		this.state = {
			descricao: "",
		}
	
	}

	componentWillReceiveProps(){
		this.setState({descricao:this.props.consulta.descricao});
	}

	alterarDescricao(event){
		this.setState({
			descricao: event.target.value
		});
		
	}

	alterarConsulta(event){
		console.log(
			{
				id: this.props.consulta.id,
				idMedico: this.props.consulta.idMedico,
				idPaciente: this.props.consulta.idPaciente,
				dataConsulta: this.props.consulta.dataConsulta,
				descricao: this.state.descricao,
				statusConsulta: this.props.consulta.statusConsulta
			}
		);
		ApiService.chamada("Consulta/Alterar").Alterar(JSON.stringify(
			{
				id: this.props.consulta.id,
				idMedico: this.props.consulta.idMedico,
				idPaciente: this.props.consulta.idPaciente,
				dataConsulta: this.props.consulta.dataConsulta,
				descricao: this.state.descricao,
				statusConsulta: this.props.consulta.statusConsulta
			}
		))
		.then(resposta => {
			console.log(resposta)
			}
		)
		.catch(erro => console.log(erro));	
	}
	

	render() {
		if(this.props.consulta.length !== 0){
			const Usuario = this.props.tipoUsuario === "Paciente"?
			<div>
				<TituloSublinhado mensagem="Medico" tamanho="50%" />
				<InformacoesMedico medico={this.props.consulta.idMedicoNavigation}/>
			</div>:
			<div>
				<TituloSublinhado mensagem="Paciente" tamanho="50%" />
				<InformacoesPaciente paciente={this.props.consulta.idPacienteNavigation}/>
			</div>
			;

			const Funcionalidade = this.props.tipoUsuario === "Medico"?
				<div>
					<div className="descricao--consulta">
						<textarea value={this.state.descricao} onChange={this.alterarDescricao.bind(this)}/>
						<button onClick={this.alterarConsulta.bind(this)}>Alterar descrição</button>
					</div>
				</div>
			:this.props.consulta.descricao === ""? 
				<section className="descricao--consulta">
					<h1>Sem descrição</h1>
				</section>
				:
				<div className="descricao--consulta">
					<p>{this.props.consulta.descricao}</p>
				</div>
			;
			return (
				<section id="consulta--detalhada-container" className="corpo--centralizado sombreado">
					<div>
						<TituloSublinhado mensagem={"Consulta#" + this.props.consulta.id} tamanho="70%" />
						<div className="informacoes--consulta">
							<p> <b>Data da consulta :</b> {this.props.consulta.dataConsulta}</p>
							<p> <b>Situação da consulta :</b> {this.props.consulta.statusConsulta}</p>
						</div>
					</div>
					
					{Usuario}

					<div>
						<TituloSublinhado mensagem="Local" tamanho="50%" />
						<InformacoesClinica clinica={this.props.consulta.idMedicoNavigation.idClinicaNavigation} />
					</div>
					<div>
						<TituloSublinhado mensagem="Descrição" tamanho="90%" />
						{Funcionalidade}
					</div>
				</section>
			);
		}else{
			return (
				<section id="consulta--detalhada-container" className="corpo--centralizado sombreado">
					<TituloSublinhado mensagem={"Selecione uma consulta"} tamanho="70%" />
				</section>
			);
		}
	}
}

export default ConsultaDetalhada;
