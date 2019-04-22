/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';

import { Cabecalho } from '../../../services/Cabecalho';
import MensagemErro from '../../../componentes/feedback/MensagemErro';
import MensagemSucesso from '../../../componentes/feedback/MensagemSucesso';

import ApiService from '../../../services/ApiService';
import { parseJwt } from '../../../services/Autenticacao';

class CadastrarPaciente extends Component {
	constructor(){
		super();
		this.state = {
			pacientes:[],

			usuario:0,
			nome:"",
			rg:"",
			cpf:"",
			telefone:"",
			dataNasc:"",

			acao:"Cadastrar",
			usuarios:[],

			sucesso:"",
			erro:"",
			erros:[]
		}
	}

	componentDidMount(){
		if(parseJwt() !== null){
			this.buscarUsuarios();
			this.buscarPacientes();
		}else{
			this.history.push("/");
		}
	}

	acaoAlterar(event){
		event.preventDefault();
		this.setState({acao:"Alterar"});
	}

	acaoPaciente(event){
		event.preventDefault();

		ApiService.chamada("Paciente/Cadastrar").Cadastrar(JSON.stringify({
			idUsuario: this.state.usuario,
			nome:  this.state.nome,
			rg:  this.state.rg,
			cpf: this.state.cpf,
			telefone: this.state.telefone,
			dataNascimento: this.state.dataNasc
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
						this.buscarPacientes();
					})
					break;
				case 400:
				resposta.json().then( resultado =>{
						console.log(resultado);
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

	buscarUsuarios() {
		ApiService.chamada("Usuario/Listar/1").Listar()
			.then(resposta => resposta.json())
			.then(resultado => {
				this.setState({ usuarios: resultado.filter( i => i.paciente.length === 0)})
			})
			.catch(erro => console.log(erro));
	}

	buscarPacientes() {
		ApiService.chamada("Paciente/Listar").Listar()
			.then(resposta => resposta.json())
			.then(resultado => this.setState({ pacientes: resultado }))
			.catch(erro => erro);
	}

	alterarUsuario = (event) => this.setState({usuario:event.target.value});
	alterarNome = (event) => this.setState({nome:event.target.value});
	alterarRg = (event) => this.setState({rg:event.target.value});
	alterarCpf = (event) => this.setState({cpf:event.target.value});
	alterarTelefone = (event) => this.setState({telefone:event.target.value});
	alterarDataNasc = (event) => this.setState({dataNasc:event.target.value});

	render() {
		return (
			<div className="App">
				{Cabecalho()}
				<main className="grid--container grid--container-corpo">
					<section className="sombreado corpo--centralizado corpo--formulario cadastro">
						<h3>{this.state.acao.toUpperCase()} PACIENTE</h3>
						<form className="grid--container grid--container-corpo" onSubmit={this.acaoPaciente.bind(this)}>
						<label htmlFor="usuario-paciente">Usuario</label>
							<select name="usuario-paciente" id="usuario-paciente" required value={this.state.usuario} onChange={this.alterarUsuario.bind(this)}>
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

							<label htmlFor="nome-paciente">Nome</label>
							<input type="text" id="nome-paciente" placeholder="Nome" maxLength="200" required value={this.state.nome} onChange={this.alterarNome.bind(this)}/>
							<MensagemErro mensagem={this.state.erros.Nome} />

							<label htmlFor="rg-paciente">RG</label>
							<input type="number" id="rg-paciente" placeholder="Rg" maxLength="9" min="000000000" max="999999999" required value={this.state.rg} onChange={this.alterarRg.bind(this)}/>
							<MensagemErro mensagem={this.state.erros.Rg} />

							<label htmlFor="cpf-paciente">CPF</label>
							<input type="number" id="cpf-paciente" placeholder="CPF" maxLength="11" min="00000000000" max="99999999999" required value={this.state.cpf} onChange={this.alterarCpf.bind(this)}/>
							<MensagemErro mensagem={this.state.erros.Cpf} />

							<label htmlFor="telefone-paciente">Telefone</label>
							<input type="phone" id="telefone-paciente" placeholder="Telefone" minLength="10" maxLength="11" required value={this.state.telefone} onChange={this.alterarTelefone.bind(this)} />
							<MensagemErro mensagem={this.state.erros.Telefone} />

							<label htmlFor="data-nascimento-paciente">Data de nascimento</label>
							<input type="date" id="data-nascimento-paciente" placeholder="Data de nascimento" required value={this.state.dataNasc} onChange={this.alterarDataNasc.bind(this)}/>
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
									{/* <td>Email</td> */}
									<td>Rg</td>
									<td>CPF</td>
									<td>Telefone</td>
									<td>Data Nasc.</td>
									<td>Alterar</td>
								</tr>
							</thead>
							<tbody>
								{
									this.state.pacientes.map(i => {
										return (
											<tr key={i.id}>
												<td>{i.id}</td>
												<td>{i.nome}</td>
												{/* <td>{i.idUsuarioNavigation.email}</td> */}
												<td>{i.rg}</td>
												<td>{i.cpf}</td>
												<td>{i.telefone}</td>
												<td>{i.dataNascimento.split(" ")[0]}</td>
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

export default CadastrarPaciente;
