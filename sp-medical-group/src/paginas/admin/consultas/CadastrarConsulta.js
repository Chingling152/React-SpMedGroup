/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';

import { Cabecalho } from '../../../services/Cabecalho';
import MensagemErro from '../../../componentes/feedback/MensagemErro';
import MensagemSucesso from '../../../componentes/feedback/MensagemSucesso';
import { parseJwt, TokenUsuario } from '../../../services/Autenticacao';
import ApiService, { APIURL } from '../../../services/ApiService';
import { enumParse } from '../../../services/Enums';

class CadastrarConsulta extends Component {
	constructor() {
		super();
		this.state = {
			medicos: [],
			pacientes: [],
			consultas: [],

			id: 0,
			medico: 0,
			paciente: 0,
			dataConsulta: "",
			descricao: "",
			situacao: 1,

			erros: [],
			erro: [],
			sucesso: "",

			acao: "Cadastrar"
		}
	}

	componentDidMount() {
		this.resetarValores();
	}

	receberResposta(resposta) {

		switch (resposta.status) {
			case 200:
				resposta.json().then(resultado => {
					this.setState(
						{
							sucesso: resultado
						}
					);
				})
				this.resetarValores();
				break;
			case 400:
			case 404:
				resposta.json().then(resultado => {
					this.setState({
						erros: resultado
					});
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
	// Retorna todos os medicos do banco de dados
	buscarMedicos() {
		ApiService.chamada("Medico/Listar").Listar()
			.then(resposta => resposta.json())
			.then(resultado => this.setState({ medicos: resultado }))
			.catch(erro => console.log(erro));
	}
	//retorna todos os pacientes do banco de dados
	buscarPacientes() {
		ApiService.chamada("Paciente/Listar").Listar()
			.then(resposta => resposta.json())
			.then(resultado => this.setState({ pacientes: resultado }))
			.catch(erro => erro);
	}
	//retorna todas as consultas do banco de dados
	buscarConsultas() {
		ApiService.chamada("Consulta/Listar").Listar()
			.then(resposta => resposta.json())
			.then(resultado => {this.setState({ consultas: resultado }) })
			.catch(erro => erro);
	}
	//Cadastra ou altera valores da consulta 
	acaoConsulta(event) {
		event.preventDefault();
		switch (this.state.acao) {
			case "Cadastrar":
				ApiService.chamada("Consulta/Cadastrar").Cadastrar(
					JSON.stringify(
						{
							idMedico: this.state.medico,
							idPaciente: this.state.paciente,
							dataConsulta: this.state.dataConsulta,
							descricao: this.state.descricao,
							statusConsulta: this.state.situacao
						}
					)
				)
					.then(resposta => this.receberResposta(resposta))
					.catch(erro => console.log(erro));
				break;
			case "Alterar":
				fetch( APIURL+"Consulta/Alterar", {
					method: 'PUT',
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + TokenUsuario()
					},
					body: JSON.stringify({
						Id: this.state.id,
						idMedico: this.state.medico,
						idPaciente: this.state.paciente,
						dataConsulta: this.state.dataConsulta,
						descricao: this.state.descricao,
						statusConsulta: this.state.situacao
					}
					)
				}
				)
					.then(resposta => this.receberResposta(resposta))
					.catch(erro => console.error(erro));
				break;
			default:
				break;
	}
	}
	// prepara o formulario para alteração
	acaoAlterar(event) {
		this.setState(
			{
				id: event.id,
				medico: event.idMedicoNavigation.id,
				paciente: event.idPacienteNavigation.id,
				dataConsulta: event.dataConsulta,
				descricao: "",
				situacao: event.statusConsulta,
				acao: "Alterar",
				sucesso:"",
				erro:"",
				erros:[]
			}
		);
	}

	//reinicia valores
	resetarValores() {
		if (parseJwt() !== null) {
			this.setState(
				{
					id: 0,
					medico: 0,
					paciente: 0,
					dataConsulta: "",
					descricao: "",
					situacao: 1,
		
					acao: "Cadastrar"
				}
			);
			this.buscarPacientes();
			this.buscarMedicos();
			this.buscarConsultas();
		} else {
			this.props.history.push("/");
		}
	}

	render() {
		//variaveis de inicializaçao 
		const {medico} = this.state;
		const {paciente} = this.state;
		const {dataConsulta} = this.state;
		let {situacao} = this.state;
		situacao = enumParse(situacao);

		const {medicos} = this.state;
		const {pacientes} = this.state;
		const {consultas} = this.state;

		const Medico = this.state.acao !== "Alterar" ? "Selecione um Medico" : "Você não pode mudar o Medico";

		
		return (
			<div className="App">
				{Cabecalho()}
				<main className="grid--container grid--container-corpo cadastro">
					<div className="sombreado corpo--centralizado corpo--formulario cadastro" >
						<h3>{this.state.acao.toUpperCase()} CONSULTA</h3>
						<form className="grid--container grid--container-corpo" onSubmit={this.acaoConsulta.bind(this)}>

							<label htmlFor="medico">Medico</label>
							<select name="medico" id="medico" required value={medico} onChange={(e) => {if(this.state.acao !== "Alterar") this.setState({medico :e.target.value})}} disabled={(this.state.acao === "Alterar") ? "disabled" : ""}>
								<option value="0" defaultValue>{Medico}</option>
								{

									medicos.map(
										i => {
											return (
												<option key={i.id} value={i.id}>{i.nome}</option>
											);
										}
									)
									}
								}
							</select>
							<MensagemErro mensagem={this.state.erros.medico} />

							<label htmlFor="paciente">Paciente</label>
							<select name="paciente" id="paciente" required value={paciente} onChange={(e) => this.setState({ paciente: e.target.value })}>
								<option value="0" defaultValue>Selecione um paciente</option>
								{
									pacientes.map(
										i => {
											return (
												<option key={i.id} value={i.id}>{i.nome}</option>
											);
										}
									)
								}
							</select>
							<MensagemErro mensagem={this.state.erros.paciente} />

							<label htmlFor="data-consulta">Data da consulta</label>
							<input type="date" id="data-consulta" placeholder="Data da consulta" required value={dataConsulta} onChange={(e) => this.setState({ dataConsulta: e.target.value })} />
							<MensagemErro mensagem={this.state.erros.dataConsulta} />

							{/* <label htmlFor="descricao">Descrição</label>
							<textarea maxLength="400" value={this.state.descricao} onChange={(e) => this.setState({ descricao: e.target.value })}></textarea> */}

							<label htmlFor="situacao-consulta">Situação da Consulta</label>
							<select name="situacao-consulta" id="situacao-consulta" required value={situacao} onChange={(e) => this.setState({ situacao: e.target.value })}>
								<option value="1" defaultValue>Aguardando</option>
								<option value="2" defaultValue>Concluida</option>
								<option value="3" defaultValue>Cancelada</option>
							</select>

							<input type="submit" value={this.state.acao.toUpperCase()} />
							<MensagemSucesso mensagem={this.state.sucesso} />
						</form>
					</div>
					<div className="sombreado tabela-corpo">
						<table className="tabela">
							<thead>
								<tr>
									<td>#</td>
									<td>Medico</td>
									<td>Especialidade</td>
									<td>Paciente</td>
									<td>Clinica</td>
									<td>Data Consulta</td>
									<td>Situação</td>
									{/* <td>Descrição</td> */}
									<td>Alterar</td>
								</tr>
							</thead>
							<tbody>
								{
									consultas.map(item => {
										return (
											<tr key={item.id}>
												<td>{item.id}</td>
												<td>{item.idMedicoNavigation.nome}</td>
												<td>{item.idMedicoNavigation.idEspecialidadeNavigation.nome}</td>
												<td>{item.idPacienteNavigation.nome}</td>
												<td>{item.idMedicoNavigation.idClinicaNavigation.nomeFantasia}</td>
												<td>{item.dataConsulta}</td>
												<td>{item.statusConsulta}</td>
												{/* <td>{item.descricao}</td> */}
												<td> <a className="link" onClick={()=>this.acaoAlterar(item)}>Alterar</a></td>
											</tr>
										);
									}
									)
								}
							</tbody>
						</table>
					</div>
				</main>
			</div>
		);
	}
}

export default CadastrarConsulta;
