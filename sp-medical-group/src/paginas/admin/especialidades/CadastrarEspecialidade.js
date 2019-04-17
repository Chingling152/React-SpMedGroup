import React, { Component } from 'react';

import { Cabecalho } from '../../../services/Cabecalho';
import MensagemErro from '../../../componentes/feedback/MensagemErro';
import MensagemSucesso from '../../../componentes/feedback/MensagemSucesso';
import ApiService from '../../../services/ApiService';
import { TokenUsuario } from '../../../services/Autenticacao';

class CadastrarEspecialidade extends Component {
	constructor(){
		super();
		this.state={
			especialidades:[],
			especialidade:"",
			acao: "CADASTRAR",
			sucesso: "",
			erro:""
		}
	}

	componentDidMount(){
		this.buscarEspecialidade();	
	}

	acaoAlterar(event,id){
		event.preventDefault();
	}


	buscarEspecialidade(){
		ApiService.chamada("Especialidade/Listar").Listar(TokenUsuario())
			.then(resposta => resposta.json())
			.then(resultado => this.setState({ especialidades: resultado }))
			.catch(erro => erro);
	}

	render() {
		return (
			<div className="App">
				{Cabecalho()}
				<main className="grid--container grid--container-corpo">
					<div className="sombreado corpo--centralizado corpo--formulario cadastro">
						{/* <div className="icone--spmedgroup"></div> */}
						<h3>CADASTRAR ESPECIALIDADE</h3>
						<form className="grid--container grid--container-corpo">
							<label htmlFor="nome-especialidade">Nome</label>
							<input type="text" id="nome-especialidade" placeholder="Nome" maxLength="200" required />
							<MensagemErro mensagem={this.state.erro} />
							
							<input type="submit" value="Cadastrar" />
							<MensagemSucesso mensagem={this.state.sucesso}/>
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
										i=>{
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
