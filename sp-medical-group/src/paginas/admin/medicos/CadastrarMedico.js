import React, { Component } from 'react';

import { Cabecalho } from '../../../services/Cabecalho';
import MensagemErro from '../../../componentes/feedback/MensagemErro';
import MensagemSucesso from '../../../componentes/feedback/MensagemSucesso';
import ApiService from '../../../services/ApiService';
import { TokenUsuario } from '../../../services/Autenticacao';

class CadastrarMedico extends Component {

	constructor(){
		super();
		this.state={
			especialidades:[]
		}
	}

	componentDidMount(){
		this.buscarEspecialidades();
	}

	buscarEspecialidades(){
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
							<h3>CADASTRAR MÉDICO</h3>
							<form className="grid--container grid--container-corpo">
								<label htmlFor="nome-medico">Nome</label>
								<input type="text" id="nome-medico" placeholder="Nome" maxLength="200" required />
								<MensagemErro mensagem="" />

								<label htmlFor="crm-medico">CRM</label>
								<input type="number" id="crm-medico" placeholder="CRM" maxLength="7" minLength="7" required />
								<MensagemErro mensagem="" />

								<label htmlFor="clinica-medico">Clinica</label>
								<select name="clinica-medico" id="clinica-medico" required>
									<option value="Clinica A" defaultValue>Clinica A</option>
								</select>
								<MensagemErro mensagem="" />

								<label htmlFor="especialidade-medico">Especialidade</label>
								<select name="especialidade" id="especialidade" required>
								{
									this.state.especialidades.map(
										i=>{
											return (
												<option key={i.id} value={i.id}>{i.nome}</option>
											);
										}
									)
								}
								</select>
								<MensagemErro mensagem="" />

								<input type="submit" value="Cadastrar" />
								<MensagemSucesso mensagem=""/>
							</form>
					</div>
					<div className="sombreado tabela-corpo">
						<table className="tabela">
							<thead>
								<tr>
									<td>#</td>
									<td>Nome</td>
									<td>CRM</td>
									<td>Clinica</td>
									<td>Especialidade</td>
									<td>Alterar</td>
								</tr>
							</thead>
							<tbody>
							</tbody>
						</table>
					</div>
				</main>
			</div>
		);
	}
}

export default CadastrarMedico;
