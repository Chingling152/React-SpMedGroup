/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';

import { Cabecalho } from '../../../services/Cabecalho';
import MensagemErro from '../../../componentes/feedback/MensagemErro';
import MensagemSucesso from '../../../componentes/feedback/MensagemSucesso';
import ApiService from '../../../services/ApiService';
import { TokenUsuario } from '../../../services/Autenticacao';

class CadastrarClinica extends Component {
	constructor() {
		super();
		this.state = {
			clinicas: [],
			id: "",
			nomeFantasia: "",
			endereco: "",
			numero: "",
			cep: "",
			razaoSocial: ""
			,
			acao: "CADASTRAR"
			,
			sucesso: "",
			erros: [],
			erro: ""
		}
	}
	componentDidMount() {
		this.buscarClinicas();
	}

	buscarClinicas() {
		ApiService.chamada("Clinica/Listar").Listar(TokenUsuario())
			.then(resposta => resposta.json())
			.then(resultado => this.setState({ clinicas: resultado }))
			.catch(erro => console.log(erro));
	}

	acaoAlterar(item){

	}

	acaoClinica(event) {
		event.preventDefault();

		ApiService.chamada("Clinica/Cadastrar").Cadastrar(TokenUsuario(), JSON.stringify({
			nomeFantasia: this.state.nomeFantasia,
			endereco: this.state.endereco,
			numero: this.state.numero,
			cep: this.state.cep,
			razaoSocial: this.state.razaoSocial
			})
		)
			.then(resposta => {
				console.log(resposta);
				switch (resposta.status) {
					case 200:
						resposta.json().then(resultado => {
							this.setState(
								{
									sucesso: resultado
								}
							)
							this.buscarClinicas();
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
			})
			.catch(erro => console.log(erro));
	}

	mudarNomeFantasia = (event) => this.setState({ nomeFantasia: event.target.value });
	mudarEndereco = (event) => this.setState({ endereco: event.target.value });
	mudarNumero = (event) => this.setState({ numero: event.target.value });
	mudarCep = (event) => this.setState({ cep: event.target.value });
	mudarRazaoSocial = (event) => this.setState({ razaoSocial: event.target.value });

	render() {
		return (
			<div className="App">
				{Cabecalho()}
				<main className="grid--container grid--container-corpo">
					<div className="sombreado corpo--centralizado corpo--formulario cadastro">
						<h3>{this.state.acao} CLINICA</h3>
						<form className="grid--container grid--container-corpo" onSubmit={this.acaoClinica.bind(this)}>
							<label htmlFor="nome-clinica">Nome Fantasia</label>
							<input type="text" id="nome-clinica" placeholder="Nome Fantasia" maxLength="200" required value={this.state.nomeFantasia} onChange={this.mudarNomeFantasia.bind(this)} />
							<MensagemErro mensagem={this.state.erros.NomeFantasia} />

							<label htmlFor="endereco-clinica">Endereço</label>
							<input type="text" id="endereco-clinica" placeholder="Endereço" maxLength="250" required value={this.state.endereco} onChange={this.mudarEndereco.bind(this)} />
							<MensagemErro mensagem={this.state.erros.Endereco} />

							<label htmlFor="numero-clinica">Numero</label>
							<input type="number" id="numero-clinica" placeholder="Numero" min="0" maxLength="10" required value={this.state.numero} onChange={this.mudarNumero.bind(this)} />
							<MensagemErro mensagem={this.state.erros.Numero} />

							<label htmlFor="nome-clinica">CEP</label>
							<input type="number" id="nome-clinica" placeholder="CEP" min="00000000" max="99999999" maxLength="8" minLength="8" required value={this.state.cep} onChange={this.mudarCep.bind(this)} />
							<MensagemErro mensagem={this.state.erros.Cep} />

							<label htmlFor="razaosocial-clinica">Razão Social</label>
							<input type="text" id="razaosocial-clinica" placeholder="Razão Social" maxLength="200" required value={this.state.razaoSocial} onChange={this.mudarRazaoSocial.bind(this)} />
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
									this.state.clinicas.map(item => {
										return (
											<tr key={item.id}>
												<td>{item.id}</td>
												<td>{item.nomeFantasia}</td>
												<td>{item.endereco}</td>
												<td>{item.numero}</td>
												<td>{item.cep}</td>
												<td>{item.razaoSocial}</td>
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

export default CadastrarClinica;
