/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';

import MensagemErro from '../../../componentes/feedback/MensagemErro';
import MensagemSucesso from '../../../componentes/feedback/MensagemSucesso';

import { Cabecalho } from '../../../services/Cabecalho';
import { TipoUsuario } from '../../../services/Autenticacao';
import ApiService from '../../../services/ApiService';


class CadastrarUsuario extends Component {

	constructor(){
		super();
		this.state={
			usuarios:[],//lista de usuarios
			usuario:{
				id:0,
				email:"",
				senha:"",
				tipoUsuario:1
			},//usuario a ser alterado ou criado
			acao:"CADASTRAR"
		}
	}

	componentDidMount(){
		this.buscarUsuarios();
	}

	buscarUsuarios(){
		ApiService.chamada("Usuario/Listar").Listar(TipoUsuario())
		.then(resposta => resposta.json())
		.then(resultado=>this.setState({usuarios:resultado}))
		.catch(erro => erro);
	}

	acaoAlterar(event,item){
		event.preventDefault();
		this.state.setState(
			{
				usuario:item,
				acao:"ALTERAR"
			}
		);
	}
	
	Requisicao(event){
		event.preventDefault();
		switch (this.state.acao) {
			case "ALTERAR":
				ApiService.chamada("Usuario/Alterar")
				.Alterar(localStorage.getItem("UsuarioSpMedGroup"),JSON.stringify(this.state.usuario))
				.then(resposta => console.log(resposta))
				.catch(erro => console.error(erro));
				break;
			default:
				ApiService.chamada("Usuario/Cadastrar")
				.Cadastrar(localStorage.getItem("UsuarioSpMedGroup"),JSON.stringify({
						Email: this.state.usuario.email,
						Senha: this.state.usuario.senha,
						TipoUsuario: this.state.usuario.tipoUsuario
					}
				))
				.then(resposta => console.log(resposta))
				.then(resultado => console.log(resultado))
				.catch(erro => console.error(erro));
				break;
		}

	}

	render() {
		return (
			<div className="App">
				{Cabecalho("")}
				<main className="grid--container grid--container-corpo">
					<div className="sombreado corpo--centralizado corpo--formulario cadastro">
						{/* <div className="icone--spmedgroup"></div> */}
						<h3>{this.state.acao} USUARIO</h3>
						<form className="grid--container grid--container-corpo" onSubmit={this.Requisicao.bind(this)}>

							<label htmlFor="email-usuario">Email</label>
							<input type="email" id="email-usuario" placeholder="Email" maxLength="200" required value={this.state.usuarios.email} onChange={
								(event = this)=>{
									this.setState({email:event.target.value});
								}
							}/>
							<MensagemErro mensagem="" />

							<label htmlFor="senha-usuario">Senha</label>
							<input type="text" id="senha-usuario" placeholder="Senha" minLength="8" maxLength="200" required value={this.state.usuarios.senha} onChange={
								(event = this)=>{
									this.setState({senha:event.target.value});
								}
							}/>
							<MensagemErro mensagem="" />

							<label htmlFor="tipo-usuario">Tipo de usuario</label>
							<select name="tipo-usuario" id="tipo-usuario" required value={this.state.usuarios.tipoUsuario} onChange={
								(event = this)=>{
									this.setState({tipoUsuario:event.target.value});
								}
							}>
								<option value="1" defaultChecked>Paciente</option>
								<option value="2">Medico</option>
								<option value="100">Administrador</option>
							</select>
							<MensagemErro mensagem="" />

							<input type="submit" value={this.state.acao}/>
							<MensagemSucesso/>
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
									this.state.usuarios.map( i=>
										{
											return (
											<tr key={i.id}>
												<td>{i.id}</td>
												<td>{i.email}</td>
												<td>{i.senha}</td>
												<td>{i.tipoUsuario}</td>
												<td> <a className = "link" onClick={this.acaoAlterar.bind(this,i.id)}>Alterar</a></td>
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
