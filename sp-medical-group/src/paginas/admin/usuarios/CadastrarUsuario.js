import React, { Component } from 'react';

import { Cabecalho } from '../../../services/Cabecalho';
import MensagemErro from '../../../componentes/feedback/MensagemErro';
import MensagemSucesso from '../../../componentes/feedback/MensagemSucesso';

class CadastrarUsuario extends Component {
	render() {
		return (
			<div className="App">
				{Cabecalho("")}
				<main className="grid--container grid--container-corpo">
					<div className="sombreado corpo--centralizado corpo--formulario cadastro">
						{/* <div className="icone--spmedgroup"></div> */}
						<h3>CADASTRAR USUARIO</h3>
						<form className="grid--container grid--container-corpo">
							<label htmlFor="email-usuario">Email</label>
							<input type="email" id="email-usuario" placeholder="Email" maxLength="200" required />
							<MensagemErro mensagem="" />

							<label htmlFor="senha-usuario">Senha</label>
							<input type="text" id="senha-usuario" placeholder="Senha" minLength="8" maxLength="200" required />
							<MensagemErro mensagem="" />

							<label htmlFor="tipo-usuario">Tipo de usuario</label>
							<select name="tipo-usuario" id="tipo-usuario" required>
								<option value="Paciente">Paciente</option>
								<option value="Administrador">Administrador</option>
								<option value="Medico">Medico</option>
							</select>
							<MensagemErro mensagem="" />
							<input type="submit" value="Cadastrar" />
							<MensagemSucesso mensagem="Pi"/>
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
								<tr key={100}>
									<td>100</td>
									<td>Email@usuario.com</td>
									<td>Senha</td>
									<td>Tipo Usuario</td>
									<td><a className="link" href="?">Alterar</a></td>
								</tr>
							</tbody>
						</table>
					</div>
				</main>
			</div>
		);
	}
}

export default CadastrarUsuario;
