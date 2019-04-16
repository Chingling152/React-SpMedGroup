import React, { Component } from 'react';

import { Cabecalho } from '../../../services/Cabecalho';
import MensagemErro from '../../../componentes/feedback/MensagemErro';

class CadastrarPaciente extends Component {
	render() {
		return (
			<div className="App">
				{Cabecalho()}
				<main className="grid--container grid--container-corpo">
					<section className="sombreado corpo--centralizado corpo--formulario cadastro">
						<h3>CADASTRAR PACIENTE</h3>
						<form className="grid--container grid--container-corpo">

							<label htmlFor="nome-paciente">Nome</label>
							<input type="text" id="nome-paciente" placeholder="Nome" maxLength="200" required />
							<MensagemErro mensagem="" />

							<label htmlFor="rg-paciente">RG</label>
							<input type="number" id="rg-paciente" placeholder="Rg" maxLength="9" min="00000000" max="99999999" required />
							<MensagemErro mensagem="" />

							<label htmlFor="cpf-paciente">CPF</label>
							<input type="number" id="cpf-paciente" placeholder="CPF" maxLength="11" required />
							<MensagemErro mensagem="" />

							<label htmlFor="telefone-paciente">Telefone</label>
							<input type="phone" id="telefone-paciente" placeholder="Telefone" minLength="10" maxLength="11" required />
							<MensagemErro mensagem="" />

							<label htmlFor="data-nascimento-paciente">Data de nascimento</label>
							<input type="date" id="data-nascimento-paciente" placeholder="Data de nascimento" required />
							<MensagemErro mensagem="" />

							<input type="submit" value="Cadastrar" />
						</form>
					</section>
					<div className="sombreado tabela-corpo">
						<table className="tabela">
							<thead>
								<tr>
									<td>#</td>
									<td>Nome</td>
									<td>Rg</td>
									<td>CPF</td>
									<td>Telefone</td>
									<td>Data Nasc.</td>
									<td>Alterar</td>
								</tr>
							</thead>
						</table>
					</div>
				</main>
			</div>
		);
	}
}

export default CadastrarPaciente;
