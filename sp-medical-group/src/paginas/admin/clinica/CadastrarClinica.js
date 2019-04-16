import React, { Component } from 'react';

import { Cabecalho } from '../../../services/Cabecalho';
import MensagemErro from '../../../componentes/feedback/MensagemErro';
import MensagemSucesso from '../../../componentes/feedback/MensagemSucesso';

class CadastrarClinica extends Component {
	render() {
		return (
			<div className="App">
				{Cabecalho("")}
				<main className="grid--container grid--container-corpo">
					<div className="sombreado corpo--centralizado corpo--formulario cadastro">
						<h3>CADASTRAR CLINICA</h3>
						<form className="grid--container grid--container-corpo">
							<label htmlFor="nome-clinica">Nome Fantasia</label>
							<input type="text" id="nome-clinica" placeholder="Nome Fantasia" maxLength="200" required />
							<MensagemErro mensagem="" />

							<label htmlFor="endereco-clinica">Endereço</label>
							<input type="text" id="endereco-clinica" placeholder="Endereço" maxLength="250" required />
							<MensagemErro mensagem="" />

							<label htmlFor="numero-clinica">Numero</label>
							<input type="number" id="numero-clinica" placeholder="Numero" min="0" maxLength="10" required />
							<MensagemErro mensagem="" />

							<label htmlFor="nome-clinica">CEP</label>
							<input type="number" id="nome-clinica" placeholder="CEP" min="00000000" max="99999999" maxLength="8" minLength="8" required />
							<MensagemErro mensagem="" />

							<label htmlFor="razaosocial-clinica">Razão Social</label>
							<input type="text" id="razaosocial-clinica" placeholder="Razão Social" maxLength="200" required />
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
									<td>Nome Fantasia</td>
									<td>Endereço</td>
									<td>Numero</td>
									<td>CEP</td>
									<td>Razão Social</td>
									<td>Alterar</td>
								</tr>
							</thead>
						</table>
						<tbody></tbody>
					</div>
				</main>
			</div>
		);
	}
}

export default CadastrarClinica;
