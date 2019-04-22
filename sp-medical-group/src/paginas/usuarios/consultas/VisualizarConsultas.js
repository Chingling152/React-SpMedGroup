import React, { Component } from 'react';

import "./VisualizarConsulta.css";

import MensagemAviso from '../../../componentes/feedback/MensagemAviso';
import TituloSublinhado from '../../../componentes/partes/titulos/TituloSublinhado';
import Consulta from '../../../componentes/partes/usuario/visualizar-consultas/Consulta';
import ConsultaDetalhada from '../../../componentes/partes/usuario/visualizar-consultas/ConsultaDetalhada';
import { Cabecalho } from '../../../services/Cabecalho';
import { parseJwt } from '../../../services/Autenticacao';
import ApiService from '../../../services/ApiService';

class VisualizarConsulta extends Component {
	constructor() {
		let usuario = parseJwt();

		super();
		this.state = {
			consultas: [],
			consulta: [],

			Usuario: {
				id: usuario.jti,
				tipo: usuario.Role
			},

			erro: ""
		}

	}

	componentDidMount() {
		if(parseJwt() != null){
			this.listarConsultas();
		}else{
			this.props.history.push("/");
		}
	}

	selecionarConsulta(item) {
		this.setState({ consulta: item });
	}

	listarConsultas() {
		console.log(this.state.Usuario);
		switch (this.state.Usuario.tipo) {
			case "Paciente":
				ApiService.chamada("Paciente/VerConsultas").Listar()
					.then(resposta => resposta.json())
					.then(resultado => {
						console.log(resultado);
						this.setState({ consultas: resultado })
					})
					.catch(erro => console.error(erro))
				break;
			case "Medico":
				ApiService.chamada("Medico/VerConsultas").Listar()
					.then(resposta => resposta.json())
					.then(resultado => {
						console.log(resultado);
						this.setState({ consultas: resultado })
					})
					.catch(erro => console.error(erro))
				break;
			default:
				break;
		}
	}

	render() {

		return (
			<div className="App">
				{
					Cabecalho()
				}
				<main className="grid--container grid--container-corpo">
					<div className="corpo--consultas-container">
						<div className="corpo--centralizado sombreado">
							<div id="informacoes--container">
								<p>Olá<br />{this.state.consultas.nome}</p>
								<TituloSublinhado mensagem="Suas Consultas" tamanho="70%" />
							</div>
							<div id="consultas--container">
								<MensagemAviso mensagem="" />
								{
									this.state.consultas.map(
										item => {
											return (<Consulta
												key={item.id}
												id={item.id} data={item.dataConsulta}
												medico={item.idMedicoNavigation} paciente={item.idPacienteNavigation}
												situacao={item.statusConsulta}
												descricao={item.descricao}
												acao={() => this.selecionarConsulta(item)}
											/>)
										}
									)
								}

							</div>
							{/* <div id="consultas--funcionalidades-container">
								<a className = "link" href="?">Pagina Anterior</a>
								<a className = "link" href="?">Proxima pagina</a>
							</div> */}
						</div>
					</div>
					<div>
						<ConsultaDetalhada consulta={this.state.consulta} tipoUsuario={this.state.Usuario.tipo} />
					</div>
				</main>
			</div>
		);
	}
}

export default VisualizarConsulta;
