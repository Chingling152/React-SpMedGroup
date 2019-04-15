import React, { Component } from 'react';

import "./VisualizarConsulta.css";

import MensagemAviso from '../../../componentes/feedback/MensagemAviso';
import TituloSublinhado from '../../../componentes/titulos/TituloSublinhado';
import Consulta from '../../../componentes/partes/usuario/visualizar-consultas/Consulta';
import ConsultaDetalhada from '../../../componentes/partes/usuario/visualizar-consultas/ConsultaDetalhada';
import { Cabecalho } from '../../../services/Cabecalho';

class VisualizarConsulta extends Component {
	constructor(){
		super();
		this.state={
			consulta:{
				id:100,
				situacao:"Desempregado",
				data:"17/07/2017",
				descricao:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sagittis facilisis ipsum, ac consequat justo porta eget. Proin vulputate quam mi, et posuere velit elementum sed. Sed non interdum orci. Proin sagittis justo eget diam feugiat vulputate. Aenean odio urna, ullamcorper sit amet nisl gravida, congue tincidunt turpis. Vivamus vitae placerat purus. Sed dignissim nisi eget risus pulvinar",
				medico:{
					id:10,
					nome:"Medico",
					especialidade:"Especialista em minions",
					clinica:{
						id:50,
						nome:"Clinica A",
						endereco: "Endereço uma rua ae",
						cep: "15196-100",
						numero: "2917"
					}
				},
				paciente:{
					id:50,
					nome:"Paciente",
					telefone:"(18)1080-0805",
					dataNascimento:"10/02/1960"
				}
			}
		}
		console.log(this.state.consulta);
	}
	render() {
		return (
			<div>
				{
					Cabecalho("")
				}
				<main className="grid--container grid--container-corpo">
					<div className="corpo--consultas-container">
						<div className="corpo--centralizado sombreado">
							<div id="informacoes--container">
								<p>Olá<br/>Nome usuario</p>
								<TituloSublinhado mensagem="Suas Consultas" tamanho= "70%"/>
							</div>
							<div id="consultas--container">
								<MensagemAviso mensagem=""/>
								<Consulta 
								id="100" data = "11/11/2011" medico="medico" endereco = "endereco" situacao="desempregado"
								descricao = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat quod voluptate dolorem delectus accusamus distinctio."
								/>
								<Consulta 
								id="100" data = "11/11/2011" medico="medico" endereco = "endereco" situacao="desempregado"
								descricao = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat quod voluptate dolorem delectus accusamus distinctio."
								/>								
								<Consulta 
								id="100" data = "11/11/2011" medico="medico" endereco = "endereco" situacao="desempregado"
								descricao = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat quod voluptate dolorem delectus accusamus distinctio."
								/>
								<Consulta 
								id="100" data = "11/11/2011" medico="medico" endereco = "endereco" situacao="desempregado"
								descricao = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat quod voluptate dolorem delectus accusamus distinctio."
								/>								
							</div>
							<div id="consultas--funcionalidades-container">
								<a className = "link" href="?">Pagina Anterior</a>
								<a className = "link" href="?">Proxima pagina</a>
							</div>
						</div>
					</div>
					<div>
						<ConsultaDetalhada consulta={this.state.consulta} medico={true}/>
					</div>
				</main>
			</div>
		);
	}
}

export default VisualizarConsulta;
