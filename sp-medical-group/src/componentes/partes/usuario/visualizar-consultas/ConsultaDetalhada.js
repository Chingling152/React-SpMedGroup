import React, { Component } from 'react';

import TituloSublinhado from '../../titulos/TituloSublinhado';
import InformacoesPaciente from '../../publico/informacoes/paciente/InformacoesPaciente';
import InformacoesMedico from '../../publico/informacoes/medico/InformacoesMedico';
import InformacoesClinica from '../../publico/informacoes/clinica/InformacoesClinica';
import { enumParse } from '../../../../services/Enums';
import { TokenUsuario } from '../../../../services/Autenticacao';
import { APIURL } from '../../../../services/ApiService';

class ConsultaDetalhada extends Component {
	constructor(props) {
		// props recebidas
		// consulta (id data status paciente medico (clinica especialidade))
		// tipoUsuario
		super(props);

		this.state = {
			descricao: ""
		}
	
	}

	componentWillReceiveProps(){
		this.setState({
			descricao:this.props.consulta.descricao
		}, () => this.setState({descricao:this.props.consulta.descricao}));
	}

	alterarConsulta(event){
		fetch(APIURL + "Consulta/Alterar", {
			method: 'PUT',
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + TokenUsuario()
			},
			body: JSON.stringify(
				{
					Id: this.props.consulta.id,
					idMedico: this.props.consulta.idMedicoNavigation.id,
					idPaciente: this.props.consulta.idPacienteNavigation.id,
					dataConsulta: this.props.consulta.dataConsulta,
					descricao: this.state.descricao,
					statusConsulta: enumParse(this.props.consulta.statusConsulta)
				}
			)
		}
		)
		.then(resposta => {
			this.receberResposta(resposta)
			}
		)
		.catch(erro => console.log(erro));	

		this.props.metodo.current();
		// window.location.reload();
	}
	

	receberResposta(resposta) {
		
		switch (resposta.status) {
			case 200:
			console.log(resposta);
				resposta.json().then(resultado => {
					alert(resultado);
				})
				break;
			case 400:
			case 404:
			console.log(resposta);
				resposta.json().then(resultado => {
					alert(resultado);
				}
				)
				break;
			case 401:
			case 403:
				resposta.json().then(resultado => {
					this.setState({ erro: resultado })
				}
				);
				break;
			default:
				console.log(resposta.json());
				break;
		}
	}

	render() {
		if(this.props.consulta.length !== 0){	
			const {descricao} = this.state;

			const Usuario = this.props.tipoUsuario === "Paciente"?
			<div>
				<TituloSublinhado mensagem="Medico" tamanho="50%" /	>
				<InformacoesMedico medico={this.props.consulta.idMedicoNavigation}/>
			</div>:
			<div>
				<TituloSublinhado mensagem="Paciente" tamanho="50%" />
				<InformacoesPaciente paciente={this.props.consulta.idPacienteNavigation}/>
			</div>
			;

			const Funcionalidade = this.props.tipoUsuario === "Medico"?
					<div className="descricao--consulta">
						<textarea value={descricao} onChange={(e) => this.setState({descricao: e.target.value})}/>
						<button onClick={this.alterarConsulta.bind(this)}>Alterar descrição</button>
					</div>
			:this.props.consulta.descricao === "" || this.props.consulta.descricao === null? 
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
