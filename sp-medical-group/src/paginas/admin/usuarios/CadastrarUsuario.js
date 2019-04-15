import React, { Component } from 'react';

import { Cabecalho } from '../../../services/Cabecalho';
import TituloSublinhado from '../../../componentes/titulos/TituloSublinhado';
import MensagemErro from '../../../componentes/feedback/MensagemErro';

class CadastrarUsuario extends Component {
	render() {
		return (
			<div>
				{Cabecalho("")}
				<main className="grid--container grid--container-corpo">
					<div className="sombreado corpo--centralizado corpo--formulario" id="cadastro">
						<TituloSublinhado mensagem="Cadastrar usuario" tamanho="90%"/>
						<div className="icone--spmedgroup"></div>
						<form className="grid--container grid--container-corpo">
							<input type="text" id="nome-usuario" placeholder="Nome"/>
							<MensagemErro mensagem="Numero de caracteres invalido"/>

    						<input type="email" id="email-usuario" placeholder="Email"/>
							<MensagemErro mensagem="Numero de caracteres invalido"/>

    						<input type="text" id="senha-usuario" placeholder="Senha"/>
							<MensagemErro mensagem="Numero de caracteres invalido"/>
							<label htmlFor="">Tipo de usuario</label>
							<select name="tipo-usuario" id="">
								<option value="Paciente" defaultValue>Paciente</option>
								<option value="Administrador">Administrador</option>
								<option value="Medico">Medico</option>
    						</select>
							<MensagemErro mensagem="O Usuario precisa ter um nivel de privilegio"/>
							<input type="submit" value="Cadastrar"/>
						</form>
					</div>
					<div className="sombreado corpo--centralizado"></div>
				</main>
			</div>
    	);
	}
}

export default CadastrarUsuario;
