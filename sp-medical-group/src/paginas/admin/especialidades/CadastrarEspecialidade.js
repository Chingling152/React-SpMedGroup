/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';

import { Cabecalho } from '../../../services/Cabecalho';
import MensagemErro from '../../../componentes/feedback/MensagemErro';
import MensagemSucesso from '../../../componentes/feedback/MensagemSucesso';
import ApiService from '../../../services/ApiService';
import { TokenUsuario } from '../../../services/Autenticacao';

class CadastrarEspecialidade extends Component {
	constructor() {
		super();
		this.state = {
			especialidades: [],
			id:"",
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
		this.buscarEspecialidades();
	}

	acaoAlterar(event, id) {
		event.preventDefault();
	}

	enviarEspecialidade(event) {
		event.preventDefault();

		ApiService.chamada("Especialidade/Cadastrar")
			.Cadastrar(TokenUsuario(), JSON.stringify({ nome: this.state.especialidade }))
			.then(resposta => {
				switch (resposta.status) {
					case 200:
						resposta.json().then(resultado => {
							this.setState(
								{
									sucesso: resultado
								}
							)
							this.buscarEspecialidades();
						})
						break;
					case 400:
					case 404:
						resposta.json().then(resultado => {
							this.setState(
								{
									erros: resultado
								}
							)
						})
						break;
					case 401:
					case 403:
						resposta.json().then(resultado => {
							this.setState({ erro: resultado })
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

	buscarEspecialidades() {
		ApiService.chamada("Especialidade/Listar").Listar(TokenUsuario())
			.then(resposta => resposta.json())
			.then(resultado => this.setState({ especialidades: resultado }))
			.catch(erro => console.log(erro));
	}

	nomeEspecialidade = (event) => this.setState({ especialidade: event.target.value });

	render() {
		return (
			<div className="App">
				{Cabecalho()}
				<main className="grid--container grid--container-corpo">
					<div className="sombreado corpo--centralizado corpo--formulario cadastro">
						{/* <div className="icone--spmedgroup"></div> */}
						<h3>{this.state.acao.toUpperCase()} ESPECIALIDADE</h3>
						<form className="grid--container grid--container-corpo" onSubmit={this.enviarEspecialidade.bind(this)}>
							<label htmlFor="nome-especialidade">Nome</label>
							<input type="text" id="nome-especialidade" placeholder="Nome" maxLength="200" required onChange={this.nomeEspecialidade.bind(this)} />
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
									this.state.especialidades.map(
										i => {
											return (
												<tr key={i.id}>
													<td>{i.id}</td>
													<td>{i.nome}</td>
													<td> <a className="link" onClick={this.acaoAlterar.bind(this, i.id)}>Alterar</a> </td>
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
