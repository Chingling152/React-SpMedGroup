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

		this.listarConsultasRef = React.createRef();
		this.listarConsultas = this.listarConsultas.bind(this);
	}

	componentDidMount() {
		if(parseJwt() != null){
			this.listarConsultas();
			this.listarConsultasRef.current = this.listarConsultas;
		}else{
			this.props.history.push("/");
		}
	}

	selecionarConsulta(item) {
		this.setState({ consulta: item });
	}

	receberResposta(resposta) {

		switch (resposta.status) {
			case 200:
				resposta.json().then(resultado => {
					this.setState(
						{
							consultas: resultado
						}
					);
				})
				this.resetarValores();
				break;
			case 400:
			case 404:
				resposta.json().then(resultado => {
					this.setState({
						erro: resultado
					});
				}
				)
				break;
			case 401:
			case 403:
				resposta.json().then(resultado => {
					this.setState({ aviso: resultado })
				}
				);
				break;
			default:
				this.resetarValores();
				break;
		}

	}

	listarConsultas() {	
		switch (this.state.Usuario.tipo) {
			case "Paciente":
				ApiService.chamada("Paciente/VerConsultas").Listar()
					.then(resposta => this.receberResposta(resposta))
					.catch(erro => console.error(erro))
				break;
			case "Medico":
				ApiService.chamada("Medico/VerConsultas").Listar()
					.then(resposta => this.receberResposta(resposta))
					.catch(erro => console.error(erro))
				break;
			default:
				break;
		}
	}

	render() {
		let {consultas} = this.state;
		const {consulta} = this.state;

		let aviso = consultas.length > 0? "" : "Você não possui consultas";

		if(parseJwt().Role === "Administrador")aviso = "Administradores não podem ter consultas"

		return (
			<div className="App">
				{
					Cabecalho()
				}
				<main className="grid--container grid--container-corpo">
					<div className="corpo--consultas-container">
						<div className="corpo--centralizado sombreado">
							<div id="informacoes--container">
								{/* <p>Olá<br />{Nome}</p> */}
								<TituloSublinhado mensagem="Suas Consultas" tamanho="70%" />
							</div>
							<div id="consultas--container">
								<MensagemAviso mensagem={aviso} />
								{
									consultas.map(
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
						<ConsultaDetalhada consulta={consulta} tipoUsuario={this.state.Usuario.tipo} metodo={this.listarConsultasRef}/>
					</div>
				</main>
			</div>
		);
	}
}

export default VisualizarConsulta;
