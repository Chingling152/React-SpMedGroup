import React, { Component } from 'react';

import TituloSublinhado from '../../titulos/TituloSublinhado';
import InformacoesPaciente from '../../publico/informacoes/paciente/InformacoesPaciente';
import InformacoesMedico from '../../publico/informacoes/medico/InformacoesMedico';
import InformacoesClinica from '../../publico/informacoes/clinica/InformacoesClinica';

class ConsultaDetalhada extends Component {
	constructor(props) {
		super();
	}
	render() {
		if(this.props.consulta!= null){
			const Usuario = this.props.medico?
			<div>
				<TituloSublinhado mensagem="Medico" tamanho="50%" />
				<InformacoesMedico medico={this.props.consulta.medico}/>
			</div>:
			<div>
				<TituloSublinhado mensagem="Paciente" tamanho="50%" />
				<InformacoesPaciente paciente={this.props.consulta.paciente}/>
			</div>
			;

			const Funcionalidade = this.props.medico?
				<div id="consulta--detalhada-funcionalidades" className="grid--container">
					<button>Alterar descrição</button>
				</div>
			:
				<div>
				</div>
			;
			return (
				<section id="consulta--detalhada-container" className="corpo--centralizado sombreado">
					<div>
						<TituloSublinhado mensagem={"Consulta#" + this.props.consulta.id} tamanho="70%" />
						<div className="informacoes--consulta">
							<p>{this.props.consulta.data}</p>
							<p>{this.props.consulta.situacao}</p>
						</div>
					</div>
					
					{Usuario}

					<div>
						<TituloSublinhado mensagem="Local" tamanho="50%" />
						<InformacoesClinica clinica={this.props.consulta.medico.clinica} />
					</div>

					<div>
						<TituloSublinhado mensagem="Descrição" tamanho="90%" />
						<div className="descricao--consulta">
							<p>{this.props.consulta.descricao}</p>
						</div>
					</div>
					{Funcionalidade}
				</section>
			);
		}else{
			return (
				<section id="consulta--detalhada-container" className="corpo--centralizado sombreado">
						<TituloSublinhado mensagem={"Selecione uma consulta"} tamanho="70%" />
				</section>
			);
		}
	}
}

export default ConsultaDetalhada;
