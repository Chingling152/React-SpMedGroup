import React, { Component } from 'react';
import { Cabecalho } from '../../../services/Cabecalho';

class AreaAdmin extends Component {
	render() {
		return (
			<div className="App">
				{Cabecalho()}
				<div className="sombreado corpo--centralizado corpo--formulario">
					<h1>O que deseja Cadastrar?</h1>
					<nav className="opcoes--cadastrar">
						<a href="/admin/dados/medico">Medicos</a>
						<a href="/admin/dados/consulta">Consultas</a>
						<a href="/admin/dados/clinica">Clinicas</a>
						<a href="/admin/dados/paciente">Pacientes</a>
						<a href="/admin/dados/especialidade">Especialidades</a>
						<a href="/admin/dados/usuario">Usuarios</a>
					</nav>
				</div>
			</div>
		);
	}
}

export default AreaAdmin;
