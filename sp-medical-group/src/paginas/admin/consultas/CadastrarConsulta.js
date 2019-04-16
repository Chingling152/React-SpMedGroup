import React, { Component } from 'react';

import { Cabecalho } from '../../../services/Cabecalho';
import MensagemErro from '../../../componentes/feedback/MensagemErro';
import MensagemSucesso from '../../../componentes/feedback/MensagemSucesso';

class CadastrarConsulta extends Component {
	render() {
		return (
			<div className="App">
				{Cabecalho()}
				<main className="grid--container grid--container-corpo">
					<div className="sombreado corpo--centralizado corpo--formulario cadastro">
						<h3>CADASTRAR CONSULTA</h3>
						<form className="grid--container grid--container-corpo">

							<label htmlFor="medico">Medico</label>
							<select name="medico" id="medico" required>
								<option value="Medico" defaultValue>Medico</option>
							</select>
							<MensagemErro mensagem="" />

							<label htmlFor="paciente">Paciente</label>
							<select name="paciente" id="paciente" required>
								<option value="Paciente" defaultValue>Paciente</option>
							</select>
							<MensagemErro mensagem="" />

							<label htmlFor="descricao">Descrição</label>
							<textarea maxLength="400"></textarea>
							<MensagemErro mensagem="" />

							<input type="submit" value="Cadastrar" />
							<MensagemSucesso mensagem="" />
						</form>
					</div>
					<div className="sombreado tabela-corpo">
						<table className="tabela">
							<thead>
								<tr>
									<td>#</td>
									<td>Medico</td>
									<td>Paciente</td>
									<td>Especialidade</td>
									<td>Clinica</td>
									<td>Descrição</td>
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

export default CadastrarConsulta;
