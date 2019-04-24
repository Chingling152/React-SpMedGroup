/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';

import MensagemErro from '../../../componentes/feedback/MensagemErro';
import MensagemSucesso from '../../../componentes/feedback/MensagemSucesso';

import { Cabecalho } from '../../../services/Cabecalho';
import ApiService from '../../../services/ApiService';
import { parseJwt, TokenUsuario } from '../../../services/Autenticacao';


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
			acao: "Cadastrar",
			sucesso: "",
			erros: [],
			erro: ""
		}
	}

	componentDidMount() {
		if (parseJwt() !== null) {
			this.buscarUsuarios();
		} else {
			this.props.history.push("/");
		}
	}

	resetarValores(){
		this.setState(
			{
				acao:"Cadastrar",
				id:0,
				email: "",
				senha: "",
				tipoUsuario: 1
			}
		)
		this.buscarUsuarios();
	}

	buscarUsuarios() {
		ApiService.chamada("Usuario/Listar").Listar()
			.then(resposta => resposta.json())
			.then(resultado => this.setState({ usuarios: resultado }))
			.catch(erro => console.log(erro));

	}

	receberResposta(resposta){
		
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

	acaoAlterar(item) {
		this.setState(
			{
				id: item.id,
				email: item.email,
				senha: item.senha,
				tipoUsuario: item.tipoUsuario,
				acao: "Alterar",
				sucesso:"",
				erro:"",
				erros:[]
			}
		);
	}

	Requisicao(event) {
		event.preventDefault();
		const url = `Usuario/${this.state.acao}`;
		switch (this.state.acao) {
			case "Cadastrar":
				ApiService.chamada(url)
					.Cadastrar(JSON.stringify({
						Email: this.state.email,
						Senha: this.state.senha,
						TipoUsuario: this.state.tipoUsuario
					}
					))
					.then(resposta => this.receberResposta(resposta))
					.catch(erro => console.error(erro));

				break;
			case "Alterar":
				/*	
				ApiService.chamada(url)
					.Alterar(
						{
							Id : this.state.id,
							Email: this.state.email,
							Senha: this.state.senha,
							TipoUsuario: this.state.tipoUsuario
						}
					)
					.then(resposta => {
							console.log(resposta);
						}					
					)
					.catch(erro => console.error(erro));
						*/
					
					fetch("http://localhost:5000/api/v1/Usuario/Alterar",{
						method:'PUT',
						headers:{
							"Content-Type":"application/json",
							"Authorization": "Bearer " + TokenUsuario()
						},
						body: JSON.stringify({
							Id : this.state.id,
							Email: this.state.email,
							Senha: this.state.senha,
							TipoUsuario: this.state.tipoUsuario
						})
					}
					)
					.then(resposta => this.receberResposta(resposta))
					.catch(erro => console.error(erro));
					
				break;
			default:
				break;
		}
		this.resetarValores();
	}

	render() {
		const {email} = this.state;
		const {senha} = this.state;
		const {usuarios} = this.state;
		let {tipoUsuario} = this.state;
		switch (tipoUsuario) {
			case "Medico":
				tipoUsuario = 2;
				break;
			case "Paciente":
				tipoUsuario = 1;
				break;
			case "Administrador":
				tipoUsuario = 100;
				break;
			default:
				break;
		}
		return (
			<div className="App">
				{Cabecalho()}
				<main className="grid--container grid--container-corpo">
					<div className="sombreado corpo--centralizado corpo--formulario cadastro">
						{/* <div className="icone--spmedgroup"></div> */}
						<h3>{this.state.acao.toUpperCase()} USUARIO</h3>
						<form className="grid--container grid--container-corpo" onSubmit={this.Requisicao.bind(this)}>

							<label htmlFor="email-usuario">Email</label>
							<input type="email" id="email-usuario" placeholder="Email" maxLength="200" required value={email} onChange={(e) => this.setState({ email: e.target.value })} />
							<MensagemErro mensagem={this.state.erros.Email} />

							<label htmlFor="senha-usuario">Senha</label>
							<input type="text" id="senha-usuario" placeholder="Senha" minLength="2" maxLength="200" required value={senha} onChange={(e) => this.setState({ senha: e.target.value })} />
							<MensagemErro mensagem={this.state.erros.Senha} />

							<label htmlFor="tipo-usuario">Tipo de usuario</label>
							<select name="tipo-usuario" id="tipo-usuario" required value={tipoUsuario} onChange={(e) => this.setState({ tipoUsuario: e.target.value })}>
								<option value="1" defaultChecked>Paciente</option>
								<option value="2">Medico</option>
								<option value="100">Administrador</option>
							</select>
							<MensagemErro mensagem={this.state.erros.nome} />

							<input type="submit" value={this.state.acao.toUpperCase()} />
							<MensagemSucesso mensagem={this.state.sucesso} />
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
									usuarios.map(i => {
										return (
											<tr key={i.id}>
												<td>{i.id}</td>
												<td>{i.email}</td>
												<td>{i.senha}</td>
												<td>{i.tipoUsuario}</td>
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

export default CadastrarUsuario;
