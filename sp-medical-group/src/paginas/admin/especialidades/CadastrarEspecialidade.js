import React, { Component } from 'react';

import { Cabecalho } from '../../../services/Cabecalho';
import MensagemErro from '../../../componentes/feedback/MensagemErro';
import MensagemSucesso from '../../../componentes/feedback/MensagemSucesso';

class CadastrarEspecialidade extends Component {
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

export default CadastrarEspecialidade;
