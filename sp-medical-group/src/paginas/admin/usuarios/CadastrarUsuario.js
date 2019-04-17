/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';

import MensagemErro from '../../../componentes/feedback/MensagemErro';
import MensagemSucesso from '../../../componentes/feedback/MensagemSucesso';

import { Cabecalho } from '../../../services/Cabecalho';
import { TokenUsuario } from '../../../services/Autenticacao';
import ApiService from '../../../services/ApiService';


class CadastrarUsuario extends Component {

	constructor() {
		super();
		this.state = {
			usuarios: [],//lista de usuarios
			id: 0,
			email: "",
			senha: "",
			tipoUsuario: 1
			,//usuario a ser alterado ou criado
			acao: "CADASTRAR",
			sucesso: "",
			erros:[]
		}

		//this.acaoAlterar.bind(this);
	}

	componentDidMount() {
		this.buscarUsuarios();
	}

	buscarUsuarios() {
		ApiService.chamada("Usuario/Listar").Listar(TokenUsuario())
			.then(resposta => resposta.json())
			.then(resultado => this.setState({ usuarios: resultado }))
			.catch(erro => erro);
	}

	acaoAlterar(item) {
		console.log(item);
		//event.preventDefault();
		this.state.setState(
			{
				email: item.email,
				senha: item.senha,
				tipoUsuario: item.tipoUsuario,
				acao: "ALTERAR"
			}
		);
	}
  
	
	Requisicao(event) {
		event.preventDefault();
		switch (this.state.acao) {
			case "ALTERAR":
				ApiService.chamada("Usuario/Alterar")
					.Alterar(TokenUsuario(), JSON.stringify(this.state.usuario))
					.then(resposta => resposta.json())
					.catch(erro => console.error(erro));
				break;
			default:
				ApiService.chamada("Usuario/Cadastrar")
					.Cadastrar(TokenUsuario(), JSON.stringify({
						Email: this.state.email,
						Senha: this.state.senha,
						TipoUsuario: this.state.tipoUsuario
					}
					))
					.then(resposta => {
						switch (resposta.status) {
							case 200:
								resposta.json().then(resultado => {
									this.setState(
										{
											sucesso:resultado
										}
									)
									this.buscarUsuarios();
								})
								break;
							case 400:
							case 404:
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
					.catch(erro => console.error(erro));
				break;
		}

	}

	alterarEmail = (event) => this.setState({ email: event.target.value });
	alterarSenha = (event) => this.setState({ senha: event.target.value });
	alterarTipo = (event) => this.setState({ tipoUsuario: event.target.value });

	render() {
		return (
			<div className="App">
				{Cabecalho()}
				<main className="grid--container grid--container-corpo">
					<div className="sombreado corpo--centralizado corpo--formulario cadastro">
						{/* <div className="icone--spmedgroup"></div> */}
						<h3>{this.state.acao} USUARIO</h3>
						<form className="grid--container grid--container-corpo" onSubmit={this.Requisicao.bind(this)}>

							<label htmlFor="email-usuario">Email</label>
							<input type="email" id="email-usuario" placeholder="Email" maxLength="200" required value={this.state.usuarios.email} onChange={this.alterarEmail.bind(this)} />
							<MensagemErro mensagem={this.state.erros.Email} />

							<label htmlFor="senha-usuario">Senha</label>
							<input type="text" id="senha-usuario" placeholder="Senha" minLength="2" maxLength="200" required value={this.state.usuarios.senha} onChange={this.alterarSenha.bind(this)} />			<MensagemErro mensagem="" />
							<MensagemErro mensagem={this.state.erros.Senha} />

							<label htmlFor="tipo-usuario">Tipo de usuario</label>
							<select name="tipo-usuario" id="tipo-usuario" required value={this.state.usuarios.tipoUsuario} onChange={this.alterarTipo.bind(this)}>
								<option value="1" defaultChecked>Paciente</option>
								<option value="2">Medico</option>
								<option value="100">Administrador</option>
							</select>
							<MensagemErro mensagem={this.state.erros.TipoUsuario} />

							<input type="submit" value={this.state.acao} />
							<MensagemSucesso mensagem={this.state.sucesso}/>
						</form>
					</div>
					<div className="sombreado tabela-corpo">
						<table className="tabela">
							<thead>
								<tr>
									<td>#</td>
									<td>Email</td>
									<td>Senha</td>
									<td>Tipo Usuario</td>
									<td>Alterar</td>
								</tr>
							</thead>
							<tbody>
								{
									this.state.usuarios.map(i => {
										return (
											<tr key={i.id}>
												<td>{i.id}</td>
												<td>{i.email}</td>
												<td>{i.senha}</td>
												<td>{i.tipoUsuario}</td>
												<td> <a className="link" onClick={this.acaoAlterar.bind(i)}>Alterar</a></td>
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

export default CadastrarUsuario;
