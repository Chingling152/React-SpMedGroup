import React, { Component } from 'react';
import { Cabecalho } from '../../../services/Cabecalho';

class AreaAdmin extends Component {
	render() {
		return (
			<div className="App">
				{Cabecalho()}
				<div className="sombreado corpo--centralizado corpo--formulario">
					<h1>O que deseja cadastrar?</h1>
					<nav className="opcoes--cadastrar">
						<a href="/admin/cadastrar/medico">Medicos</a>
						<a href="/admin/cadastrar/consulta">Consultas</a>
						<a href="/admin/cadastrar/clinica">Clinicas</a>
						<a href="/admin/cadastrar/paciente">Pacientes</a>
						<a href="/admin/cadastrar/especialidade">Especialidades</a>
						<a href="/admin/cadastrar/usuario">Usuarios</a>
					</nav>
				</div>
			</div>
		);
	}
}

export default AreaAdmin;
