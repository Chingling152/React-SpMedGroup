import React, { Component } from 'react';

import "./VisualizarConsulta.css";

import CabecalhoLogado from '../../../componentes/partes/publico/cabecalho/CabecalhoLogado';

class VisualizarConsulta extends Component {
  render() {
    return (
		<div>
			<CabecalhoLogado/>
			<main className="grid--container grid--container-corpo">
				<div className="corpo--consultas-container"> 
					<div className="corpo--centralizado sombreado">
						<div id="informacoes--container">
							<div className="icone--usuario">
							</div>
							<p>Olá Nome usuario</p>
							<a href="?">Alterar informações</a>
						</div>
						<div id="funcionalidades--container">
							<a href="?">Pagina Anterior</a>
							<a href="?">Proxima pagina</a>
						</div>
						<div id="consultas--container">
							<h3>Suas Consultas</h3>
							<hr/>
							<div className="consulta--container">
								<h4>Consulta #155648</h4>
								<div className="informacoes--consulta grid--container grid--container-corpo">
									<p>Data consulta</p>
									<p>Nome medico</p>
									<p>Endereço do local</p>
									<p>Situação consulta</p>
								</div>
								<p className="descricao--consulta">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat quod voluptate dolorem delectus accusamus distinctio.</p>
								<button>Ver mais informações</button>
								<hr/>
							</div>
						</div>
					</div>
				</div>
				<div id="consulta--detalhada-container">
						
				</div>
			</main>
		</div>
    );
  }
}

export default VisualizarConsulta;
