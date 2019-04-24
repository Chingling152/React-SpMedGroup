/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';

import { Cabecalho } from '../../../services/Cabecalho';
import MensagemErro from '../../../componentes/feedback/MensagemErro';
import MensagemSucesso from '../../../componentes/feedback/MensagemSucesso';
import ApiService from '../../../services/ApiService';
import { TokenUsuario, parseJwt } from '../../../services/Autenticacao';

class CadastrarEspecialidade extends Component {
	constructor() {
		super();
		this.state = {
			especialidades: [],
			id: 0,
			especialidade: "",
			//
			acao: "Cadastrar",
			//feedback
			sucesso: "",
			erros: [],
			erro: ""
		}
	}

	componentDidMount() {
		if (parseJwt() !== null) {
			this.buscarEspecialidades();
		} else {
			this.history.push("/");
		}
	}

	acaoAlterar(item) {
		this.setState(
			{
				id: item.id,
				especialidade: item.nome,
				acao: "Alterar",
				sucesso: "",
				erro: "",
				erros: []
			}
		);
	}

	resetarValores() {
		this.setState(
			{
				id: 0,
				especialidade: "",
				acao: "Cadastrar",
				sucesso: "",
				erro: "",
				erros: []
			}
		);
		this.buscarEspecialidades();
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

	enviarEspecialidade(event) {
		event.preventDefault();
		switch (this.state.acao) {
			case "Cadastrar":
				ApiService.chamada("Especialidade/Cadastrar")
					.Cadastrar(JSON.stringify({ nome: this.state.especialidade }))
					.then(resposta => this.receberResposta(resposta))
					.catch(erro => console.log(erro));
				break;
			case "Alterar":
				fetch("http://localhost:5000/api/v1/Especialidade/Alterar", {
					method: 'PUT',
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + TokenUsuario()
					},
					body: JSON.stringify({
						Id: this.state.id,
						Nome: this.state.especialidade
					}
					)
				}
				)
					.then(resposta => this.receberResposta(resposta))
					.catch(erro => console.log(erro));
				break;
			default:
				break;
		}
	}
	buscarEspecialidades() {
		ApiService.chamada("Especialidade/Listar").Listar(TokenUsuario())
			.then(resposta => resposta.json())
			.then(resultado => this.setState({ especialidades: resultado }))
			.catch(erro => console.log(erro));
	}

	render() {
		const { especialidade } = this.state;
		const { especialidades } = this.state;
		return (
			<div className="App">
				{Cabecalho()}
				<main className="grid--container grid--container-corpo">
					<div className="sombreado corpo--centralizado corpo--formulario cadastro">
						{/* <div className="icone--spmedgroup"></div> */}
						<h3>{this.state.acao.toUpperCase()} ESPECIALIDADE</h3>
						<form className="grid--container grid--container-corpo" onSubmit={this.enviarEspecialidade.bind(this)}>
							<label htmlFor="nome-especialidade">Nome</label>
							<input type="text" id="nome-especialidade" placeholder="Nome" maxLength="200" required value={especialidade} onChange={(e) => this.setState({ especialidade: e.target.value })} />
							<MensagemErro mensagem={this.state.erros.Nome} />

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
									<td>Alterar</td>
								</tr>
							</thead>
							<tbody>
								{
									especialidades.map(
										i => {
											return (
												<tr key={i.id}>
													<td>{i.id}</td>
													<td>{i.nome}</td>
													<td> <a className="link" onClick={() => this.acaoAlterar(i)}>Alterar</a> </td>
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

export default CadastrarEspecialidade;
