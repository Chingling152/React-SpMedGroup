/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';

import { Cabecalho } from '../../../services/Cabecalho';
import MensagemErro from '../../../componentes/feedback/MensagemErro';
import MensagemSucesso from '../../../componentes/feedback/MensagemSucesso';
import { parseJwt, TokenUsuario } from '../../../services/Autenticacao';
import ApiService from '../../../services/ApiService';

class CadastrarConsulta extends Component {
	constructor(){
		super();
		this.state = {
			medicos:[],
			pacientes:[],
			consultas:[],

			id: 0,
			medico:0,
			paciente:0,
  			dataConsulta: "",
  			descricao: "",
  			situacao: 1,

			erros:[],
			erro:[],
			sucesso:"",

			acao:"Cadastrar"
		}
	}

	componentDidMount(){
		if(parseJwt() !== null){
			this.buscarPacientes();
			this.buscarMedicos();
			this.buscarConsultas();
		}else{
			this.history.push("/");
		}
	}

	buscarMedicos() {
		ApiService.chamada("Medico/Listar").Listar(TokenUsuario())
			.then(resposta => resposta.json())
			.then(resultado => this.setState({ medicos: resultado }))
			.catch(erro => console.log(erro));
	}

	buscarPacientes() {
		ApiService.chamada("Paciente/Listar").Listar(TokenUsuario())
			.then(resposta => resposta.json())
			.then(resultado => this.setState({ pacientes: resultado }))
			.catch(erro => erro);
	}

	buscarConsultas(){
		ApiService.chamada("Consulta/Listar").Listar(TokenUsuario())
		.then(resposta => resposta.json())
		.then(resultado => {console.log(resultado);this.setState({ consultas: resultado })})
		.catch(erro => erro);
	}

	acaoConsulta(event){
			event.preventDefault();
	
			ApiService.chamada("Consulta/Cadastrar").Cadastrar(JSON.stringify({
				idMedico: this.state.medico,
				idPaciente: this.state.paciente,
				dataConsulta: this.state.dataConsulta,
				descricao: this.state.descricao,
				statusConsulta: this.state.situacao
			}))
			.then(resposta => {
				switch (resposta.status) {
					case 200:
						resposta.json().then(resultado => {
							this.setState(
								{
									sucesso:resultado
								}
							)
							this.buscarConsultas();
						})
						break;
					case 400:
					resposta.json().then( resultado =>{
								this.setState({
									erros:resultado
								})
							}
						)				
						break;
					case 401:
					case 403:
						resposta.json().then( resultado =>
							{
								this.setState({erro:resultado})
							}
						)
						break;
					default:
						break;
				}
			}
			)
			.catch(erro => console.log(erro));
		
	}

	acaoAlterar(event){

	}	

	alterarPaciente = (event) => this.setState({paciente:event.target.value})
	alterarMedico = (event) => this.setState({medico:event.target.value})
	alterarDescricao = (event) => this.setState({descricao:event.target.value})
	alterarSituacao = (event) => this.setState({situacao:event.target.value})
	alterarData = (event) => this.setState({dataConsulta:event.target.value})

	render() {
		return (
			<div className="App">
				{Cabecalho()}
				<main className="grid--container grid--container-corpo">
					<div className="sombreado corpo--centralizado corpo--formulario cadastro">
						<h3>{this.state.acao.toUpperCase()} CONSULTA</h3>
						<form className="grid--container grid--container-corpo" onSubmit={this.acaoConsulta.bind(this)}>

							<label htmlFor="medico">Medico</label>
							<select name="medico" id="medico" required value={this.state.medico} onChange={this.alterarMedico.bind(this)}>
								<option value="0" defaultValue>Selecione um medico</option>
								{
									this.state.medicos.map(
										i => {
											return (
												<option key={i.id} value={i.id}>{i.nome}</option>
											);
										}
									)
								}
							</select>
							<MensagemErro mensagem={this.state.erros.medico} />

							<label htmlFor="paciente">Paciente</label>
							<select name="paciente" id="paciente" required value={this.state.paciente} onChange={this.alterarPaciente.bind(this)}>
								<option value="0" defaultValue>Selecione um paciente</option>
								{
									this.state.pacientes.map(
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
							<input type="date" id="data-consulta" placeholder="Data da consulta" required value={this.state.dataConsulta} onChange={this.alterarData.bind(this)}/>
							<MensagemErro mensagem={this.state.erros.dataConsulta} />

							{/* <label htmlFor="descricao">Descrição</label>
							<textarea maxLength="400" value={this.state.descricao} onChange={this.alterarDescricao.bind(this)}></textarea> */}

							<label htmlFor="situacao-consulta">Situação da Consulta</label>
							<select name="situacao-consulta" id="situacao-consulta" required value={this.state.situacao} onChange={this.alterarSituacao.bind(this)}>
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
								this.state.consultas.map( item => {
										return (
											<tr key={item.id}>
												<td>{item.id}</td>
												<td>{item.idMedicoNavigation.nome}</td>
												<td>{item.idMedicoNavigation.idEspecialidadeNavigation.nome}</td>
												<td>{item.idPacienteNavigation.nome}</td>
												<td>{item.idMedicoNavigation.idClinicaNavigation.nomeFantasia}</td>
												<td>{item.dataConsulta}</td>
												<td>{item.statusConsulta}</td>
												{/* <td>{item}</td> */}
												<td> <a className="link" onClick={this.acaoAlterar(item)}>Alterar</a></td>
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
