/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';

import { Cabecalho } from '../../../services/Cabecalho';
import MensagemErro from '../../../componentes/feedback/MensagemErro';
import MensagemSucesso from '../../../componentes/feedback/MensagemSucesso';

import ApiService from '../../../services/ApiService';
import { parseJwt, TokenUsuario } from '../../../services/Autenticacao';

class CadastrarPaciente extends Component {
	constructor() {
		super();
		this.state = {
			pacientes: [],

			usuario: 0,
			nome: "",
			rg: "",
			cpf: "",
			telefone: "",
			dataNasc: "",

			acao: "Cadastrar",
			usuarios: [],

			sucesso: "",
			erro: "",
			erros: []
		}
	}

	componentDidMount() {
		this.resetarValores();
	}

	resetarValores() {
		if (parseJwt() !== null) {
			this.setState(
				{
					usuario: 0,
					nome: "",
					rg: "",
					cpf: "",
					telefone: "",
					dataNasc: "",
					acao: "Cadastrar",
					sucesso: "",
					erro: "",
					erros: []
				}
			);
			this.buscarPacientes();
			this.buscarUsuarios();
		} else {
			this.history.push("/");
		}
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
	acaoAlterar(event) {
		this.setState(
			{
				id: event.id,
				usuario: event.idUsuario,
				nome: event.nome,
				rg: event.rg,
				cpf: event.cpf,
				telefone: event.telefone,
				dataNasc: event.dataNasc,
				acao: "Alterar",
			}
		);
	}


	acaoPaciente(event) {
		event.preventDefault();

		switch (this.state.acao) {
			case "Cadastrar":

				ApiService.chamada("Paciente/Cadastrar").Cadastrar(JSON.stringify({
					idUsuario: this.state.usuario,
					nome: this.state.nome,
					rg: this.state.rg,
					cpf: this.state.cpf,
					telefone: this.state.telefone,
					dataNascimento: this.state.dataNasc
				}))
					.then(resposta => this.receberResposta(resposta))
					.catch(erro => console.log(erro));
				break;
			case "Alterar":
				fetch("http://localhost:5000/api/v1/Paciente/Alterar", {
					method: 'PUT',
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + TokenUsuario()
					},
					body: JSON.stringify({
						Id: this.state.id,
						idUsuario: this.state.usuario,
						nome: this.state.nome,
						rg: this.state.rg,
						cpf: this.state.cpf,
						telefone: this.state.telefone,
						dataNascimento: this.state.dataNasc
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

	buscarUsuarios() {
		ApiService.chamada("Usuario/Listar/1").Listar()
			.then(resposta => resposta.json())
			.then(resultado => {
				this.setState({ usuarios: resultado.filter(i => i.paciente.length === 0) })
			})
			.catch(erro => console.log(erro));
	}

	buscarPacientes() {
		ApiService.chamada("Paciente/Listar").Listar()
			.then(resposta => resposta.json())
			.then(resultado => this.setState({ pacientes: resultado }))
			.catch(erro => erro);
	}

	alterarUsuario = (event) => {
		if (this.state.acao !== "Alterar") {
			this.setState({ usuario: event.target.value });
		}
	}

	render() {
		const { idUsuario } = this.state;
		const { nome } = this.state;
		const { rg } = this.state;
		const { cpf } = this.state;
		const { telefone } = this.state;
		const { dataNasc } = this.state;
		
		const {usuarios} = this.state;
		const {pacientes} = this.state;

		const Usuario = this.state.acao !== "Alterar" ? "Selecione um usuario" : "Você não pode mudar o usuario";

		return (
			<div className="App">
				{Cabecalho()}
				<main className="grid--container grid--container-corpo cadastro">
					<section className="sombreado corpo--centralizado corpo--formulario cadastro">
						<h3>{this.state.acao.toUpperCase()} PACIENTE</h3>
						<form className="grid--container grid--container-corpo" onSubmit={this.acaoPaciente.bind(this)}>
							<label htmlFor="usuario-paciente">Usuario</label>
							<select name="usuario-paciente" id="usuario-paciente" required value={idUsuario} onChange={this.alterarUsuario.bind(this)} disabled={(this.state.acao === "Alterar") ? "disabled" : ""}>
								<option value="0" default>{Usuario}</option>
								{
									usuarios.map(
										i => {
											return (
												<option key={i.id} value={i.id}>{i.email}</option>
											);
										}
									)
								}
							</select>

							<label htmlFor="nome-paciente">Nome</label>
							<input type="text" id="nome-paciente" placeholder="Nome" maxLength="200" required value={nome} onChange={(e) => this.setState({ nome: e.target.value })} />
							<MensagemErro mensagem={this.state.erros.Nome} />

							<label htmlFor="rg-paciente">RG</label>
							<input type="number" id="rg-paciente" placeholder="Rg" maxLength="9" min="000000000" max="999999999" required value={rg} onChange={(e) => this.setState({ rg: e.target.value })} />
							<MensagemErro mensagem={this.state.erros.Rg} />

							<label htmlFor="cpf-paciente">CPF</label>
							<input type="number" id="cpf-paciente" placeholder="CPF" maxLength="11" min="00000000000" max="99999999999" required value={cpf} onChange={(e) => this.setState({ cpf: e.target.value })} />
							<MensagemErro mensagem={this.state.erros.Cpf} />

							<label htmlFor="telefone-paciente">Telefone</label>
							<input type="phone" id="telefone-paciente" placeholder="Telefone" minLength="10" maxLength="11" required value={telefone} onChange={(e) => this.setState({ telefone: e.target.value })} />
							<MensagemErro mensagem={this.state.erros.Telefone} />

							<label htmlFor="data-nascimento-paciente">Data de nascimento</label>
							<input type="date" id="data-nascimento-paciente" placeholder="Data de nascimento" required value={dataNasc} onChange={(e) => this.setState({ dataNasc: e.target.value })} />
							<MensagemErro mensagem={this.state.erros.dataNascimento} />

							<input type="submit" value={this.state.acao.toUpperCase()} />
							<MensagemSucesso mensagem={this.state.sucesso} />
						</form>
					</section>
					<div className="sombreado tabela-corpo">
						<table className="tabela">
							<thead>
								<tr>
									<td>#</td>
									<td>Nome</td>
									<td>Email</td>
									<td>Rg</td>
									<td>CPF</td>
									<td>Telefone</td>
									<td>Data Nasc.</td>
									<td>Alterar</td>
								</tr>
							</thead>
							<tbody>
								{
									pacientes.map(i => {
										return (
											<tr key={i.id}>
												<td>{i.id}</td>
												<td>{i.nome}</td>
												<td>{i.idUsuarioNavigation.email}</td>
												<td>{i.rg}</td>
												<td>{i.cpf}</td>
												<td>{i.telefone}</td>
												<td>{i.dataNascimento.split(" ")[0]}</td>
												<td> <a className="link" onClick={() => this.acaoAlterar(i)}>Alterar</a></td>
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

export default CadastrarPaciente;
