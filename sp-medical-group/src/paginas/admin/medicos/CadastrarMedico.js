/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';

import { Cabecalho } from '../../../services/Cabecalho';
import MensagemErro from '../../../componentes/feedback/MensagemErro';
import MensagemSucesso from '../../../componentes/feedback/MensagemSucesso';
import ApiService from '../../../services/ApiService';
import { TokenUsuario, parseJwt } from '../../../services/Autenticacao';

class CadastrarMedico extends Component {

	constructor() {
		super();
		this.state = {
			especialidades: [],
			clinicas: [],
			usuarios: [],
			medicos: [],

			usuario: 0,
			nome: "",
			crm: "",
			clinica: 0,
			especialidade: 0,

			acao: "Cadastrar",

			erros: [],
			erro: "",
			sucesso: ""
		}
	}

	componentDidMount() {
		if (parseJwt() !== null) {
			this.buscarEspecialidades();
			this.buscarClinicas();
			this.buscarMedicos();
			this.buscarUsuarios();
		} else {
			this.history.push("/");
		}
	}

	buscarUsuarios() {
		ApiService.chamada("Usuario/Listar/2").Listar(TokenUsuario())
			.then(resposta => resposta.json())
			.then(resultado => {
				this.setState({ usuarios: resultado.filter(i => i.medico.length === 0) })
			})
			.catch(erro => console.log(erro));
	}

	buscarMedicos() {
		ApiService.chamada("Medico/Listar").Listar(TokenUsuario())
			.then(resposta => resposta.json())
			.then(resultado => this.setState({ medicos: resultado }))
			.catch(erro => console.log(erro));
	}

	buscarClinicas() {
		ApiService.chamada("Clinica/Listar").Listar(TokenUsuario())
			.then(resposta => resposta.json())
			.then(resultado => this.setState({ clinicas: resultado }))
			.catch(erro => console.log(erro));
	}

	buscarEspecialidades() {
		ApiService.chamada("Especialidade/Listar").Listar(TokenUsuario())
			.then(resposta => resposta.json())
			.then(resultado => this.setState({ especialidades: resultado }))
			.catch(erro => erro);
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

	acaoAlterar(event) {
		event.preventDefault();
	}

	alterarNome = (event) => this.setState({ nome: event.target.value });
	alterarEspecialidade = (event) => this.setState({ especialidade: event.target.value });
	alterarCrm = (event) => this.setState({ crm: event.target.value });
	alterarClinica = (event) => this.setState({ clinica: event.target.value });
	alterarUsuario = (event) => this.setState({ usuario: event.target.value });

	acaoMedico(event) {
		switch (this.state.acao) {
			case "Cadastrar":
				event.preventDefault();

				ApiService.chamada("Medico/Cadastrar").Cadastrar(
					JSON.stringify(
						{
						idUsuario: this.state.usuario,
						nome: this.state.nome,
						crm: this.state.crm.toUpperCase(),
						idClinica: this.state.clinica,
						idEspecialidade: this.state.especialidade
						}
					))
					.then(resposta => this.receberResposta(resposta))
					.catch(erro => console.log(erro));
				break;
			case "Alterar":
				fetch("http://localhost:5000/api/v1/Medico/Alterar",{
					method:'PUT',
					headers:{
						"Content-Type":"application/json",
						"Authorization": "Bearer " + TokenUsuario()
					},
					body: JSON.stringify({
							Id : this.state.id,
							idUsuario: this.state.usuario,
							nome: this.state.nome,
							crm: this.state.crm.toUpperCase(),
							idClinica: this.state.clinica,
							idEspecialidade: this.state.especialidade
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

	render() {
		return (
			<div className="App">
				{Cabecalho()}
				<main className="grid--container grid--container-corpo">
					<div className="sombreado corpo--centralizado corpo--formulario cadastro">
						{/* <div className="icone--spmedgroup"></div> */}
						<h3>{this.state.acao.toUpperCase()} MÉDICO</h3>
						<form className="grid--container grid--container-corpo" onSubmit={this.acaoMedico.bind(this)}>
							<label htmlFor="usuario-medico">Usuario</label>
							<select name="usuario-medico" id="usuario-medico" required value={this.state.usuario} onChange={this.alterarUsuario.bind(this)}>
								<option value="0" default>Selecione um usuario</option>
								{
									this.state.usuarios.map(
										i => {
											return (
												<option key={i.id} value={i.id}>{i.email}</option>
											);
										}
									)
								}
							</select>
							<MensagemErro mensagem={this.state.erros.idUsuario} />

							<label htmlFor="nome-medico">Nome</label>
							<input type="text" id="nome-medico" placeholder="Nome" maxLength="200" required value={this.state.nome} onChange={this.alterarNome.bind(this)} />
							<MensagemErro mensagem={this.state.erros.Nome} />

							<label htmlFor="crm-medico">CRM</label>
							<input type="text" id="crm-medico" placeholder="CRM" maxLength="7" minLength="7" pattern="[0-9]{5}[A-Za-z]{2}" title="Precisa ter 5 numeros e 2 letras (UF)" required value={this.state.crm} onChange={this.alterarCrm.bind(this)} />
							<MensagemErro mensagem={this.state.erros.Crm} />

							<label htmlFor="clinica-medico">Clinica</label>
							<select name="clinica-medico" id="clinica-medico" required value={this.state.clinica} onChange={this.alterarClinica.bind(this)}>
								<option value="0" default>Selecione uma clinica</option>
								{
									this.state.clinicas.map(
										i => {
											return (
												<option key={i.id} value={i.id}>{i.nomeFantasia}</option>
											);
										}
									)
								}
							</select>
							<MensagemErro mensagem={this.state.erros.Clinica} />

							<label htmlFor="especialidade-medico">Especialidade</label>
							<select name="especialidade" id="especialidade" required value={this.state.especialidade} onChange={this.alterarEspecialidade.bind(this)}>
								<option value="0" default>Selecione uma especialidade</option>
								{
									this.state.especialidades.map(
										i => {
											return (
												<option key={i.id} value={i.id}>{i.nome}</option>
											);
										}
									)
								}
							</select>
							<MensagemErro mensagem={this.state.erros.Especialidade} />

							<input type="submit" value={this.state.acao.toUpperCase()} />
							<MensagemSucesso mensagem={this.state.sucesso} />
						</form>
					</div>
					<div className="sombreado tabela-corpo">
						<table className="tabela">
							<thead>
								<tr>
									<td>#</td>
									<td>Nome</td>
									<td>CRM</td>
									<td>Clinica</td>
									<td>Especialidade</td>
									<td>Alterar</td>
								</tr>
							</thead>
							<tbody>
								{
									this.state.medicos.map(item => {
										return (
											<tr key={item.id}>
												<td>{item.id}</td>
												<td>{item.nome}</td>
												<td>{item.crm}</td>
												<td>{item.idClinicaNavigation.nomeFantasia}</td>
												<td>{item.idEspecialidadeNavigation.nome}</td>
												<td> <a className="link" onClick={this.acaoAlterar.bind(item)}>Alterar</a></td>
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

export default CadastrarMedico;
