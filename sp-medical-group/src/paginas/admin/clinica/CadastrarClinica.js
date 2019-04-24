/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';

import { Cabecalho } from '../../../services/Cabecalho';
import MensagemErro from '../../../componentes/feedback/MensagemErro';
import MensagemSucesso from '../../../componentes/feedback/MensagemSucesso';
import ApiService from '../../../services/ApiService';
import { parseJwt, TokenUsuario } from '../../../services/Autenticacao';

class CadastrarClinica extends Component {
	constructor() {
		super();
		this.state = {
			clinicas: [],
			id: 0,
			nomeFantasia: "",
			endereco: "",
			numero: "",
			cep: "",
			razaoSocial: ""
			,
			acao: "Cadastrar"
			,
			sucesso: "",
			erros: [],
			erro: ""
		}
	}

	componentDidMount() {
		this.resetarValores();
	}

	//reinicia valores
	resetarValores() {
		if (parseJwt() !== null) {
			this.setState(
				{
					id: 0,
					nomeFantasia: "",
					endereco: "",
					numero: "",
					cep: "",
					razaoSocial: "",
					acao: "Cadastrar"
					
				}
			);
			this.buscarClinicas();
		} else {
			this.history.push("/");
		}
	}

	buscarClinicas() {
		ApiService.chamada("Clinica/Listar").Listar()
			.then(resposta => resposta.json())
			.then(resultado => this.setState({ clinicas: resultado }))
			.catch(erro => console.log(erro));
	}

	acaoAlterar(event) {
		this.setState(
			{
				id: event.id,
				nomeFantasia: event.nomeFantasia,
				endereco: event.endereco,
				numero: event.numero,
				cep: event.cep,
				razaoSocial: event.razaoSocial,
				acao: "Alterar",
				sucesso:"",
				erro:"",
				erros:[]
			}
		);
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
	acaoClinica(event) {
		event.preventDefault();
		switch(this.state.acao){
			case "Cadastrar":
				ApiService.chamada("Clinica/Cadastrar").Cadastrar(JSON.stringify({
					nomeFantasia: this.state.nomeFantasia,
					endereco: this.state.endereco,
					numero: this.state.numero,
					cep: this.state.cep,
					razaoSocial: this.state.razaoSocial
					})
				)
					.then(resposta => this.receberResposta(resposta))
					.catch(erro => console.log(erro));
					break;
				case "Alterar":
				fetch("http://localhost:5000/api/v1/Clinica/Alterar", {
					method: 'PUT',
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + TokenUsuario()
					},
					body: JSON.stringify({
						Id: this.state.id,
						nomeFantasia: this.state.nomeFantasia,
						endereco: this.state.endereco,
						numero: this.state.numero,
						cep: this.state.cep,
						razaoSocial: this.state.razaoSocial
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
		const {nomeFantasia} = this.state;
		const {endereco} = this.state;
		const {numero} = this.state;
		const {cep} = this.state;
		const {razaoSocial} = this.state;

		const {clinicas} = this.state;

		return (
			<div className="App">
				{Cabecalho()}
				<main className="grid--container grid--container-corpo cadastro">
					<div className="sombreado corpo--centralizado corpo--formulario cadastro">
						<h3>{this.state.acao.toUpperCase()} CLINICA</h3>
						<form className="grid--container grid--container-corpo" onSubmit={this.acaoClinica.bind(this)}>
							<label htmlFor="nome-clinica">Nome Fantasia</label>
							<input type="text" id="nome-clinica" placeholder="Nome Fantasia" maxLength="200" required value={nomeFantasia} onChange={(e) => this.setState({nomeFantasia: e.target.value})} />
							<MensagemErro mensagem={this.state.erros.NomeFantasia} />

							<label htmlFor="endereco-clinica">Endereço</label>
							<input type="text" id="endereco-clinica" placeholder="Endereço" maxLength="250" required value={endereco} onChange={(e) => this.setState({ endereco: e.target.value })} />
							<MensagemErro mensagem={this.state.erros.Endereco} />

							<label htmlFor="numero-clinica">Numero</label>
							<input type="number" id="numero-clinica" placeholder="Numero" min="0" maxLength="10" required value={numero} onChange={(e) => this.setState({ numero: e.target.value })} />
							<MensagemErro mensagem={this.state.erros.Numero} />

							<label htmlFor="nome-clinica">CEP</label>
							<input type="number" id="nome-clinica" placeholder="CEP" min="00000000" max="99999999" maxLength="8" minLength="8" required value={cep} onChange={(e) => this.setState({ cep: e.target.value })} />
							<MensagemErro mensagem={this.state.erros.Cep} />

							<label htmlFor="razaosocial-clinica">Razão Social</label>
							<input type="text" id="razaosocial-clinica" placeholder="Razão Social" maxLength="200" required value={razaoSocial} onChange={(e) => this.setState({ razaoSocial: e.target.value })} />
							<MensagemErro mensagem={this.state.erros.RazaoSocial} />

							<input type="submit" value={this.state.acao} />
							<MensagemSucesso mensagem={this.state.sucesso} />
						</form>
					</div>
					<div className="sombreado tabela-corpo">
						<table className="tabela">
							<thead>
								<tr>
									<td>#</td>
									<td>Nome Fantasia</td>
									<td>Endereço</td>
									<td>Numero</td>
									<td>CEP</td>
									<td>Razão Social</td>
									<td>Alterar</td>
								</tr>
							</thead>
							<tbody>
								{
									clinicas.map(item => {
										return (
											<tr key={item.id}>
												<td>{item.id}</td>
												<td>{item.nomeFantasia}</td>
												<td>{item.endereco}</td>
												<td>{item.numero}</td>
												<td>{item.cep}</td>
												<td>{item.razaoSocial}</td>
												<td> <a className="link" onClick={() => this.acaoAlterar(item)}>Alterar</a></td>
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

export default CadastrarClinica;
