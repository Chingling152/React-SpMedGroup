import React, { Component } from 'react';

import "./Home.css";

import TituloSublinhado from '../../../componentes/partes/titulos/TituloSublinhado';
import Vantagem from '../../../componentes/partes/home/vantagem/Vantagem';
import { Cabecalho } from '../../../services/Cabecalho';
import { parseJwt } from '../../../services/Autenticacao';
import ApiService from '../../../services/ApiService';

class Home extends Component {

	constructor(){
		super();
		this.state={
			instituicoes:[]
		}
	}

	componentDidMount(){
		ApiService.chamada("Clinica/Listar?quant=6").Listar()
		.then(resposta => resposta.json())
		.then(resp => this.setState({instituicoes: resp}))
		.catch(error => console.log(error))
	}

	render() {
		const {instituicoes} = this.state;
		const Usuario = parseJwt();
		const LoginBtn = Usuario === null? 
			<a href="/login" className="link">Fazer Login</a> : 
			Usuario.Role === "Administrador"? 
				<a href="/admin" className="link">Veja sua area</a> : 
				<a href="/nãotem" className="link">Veja sua area</a> ;

		const VantagemAdmin = Usuario !== null && Usuario.Role === "Admnistrador"?
		<Vantagem mensagem="Veja todas as consultas" icone="icone-calendario" link="/admin/dados/consulta" />:
		<Vantagem mensagem="Veja todas as suas consultas" icone="icone-calendario" link="/minha-area/consultas" />;
		return (
			<div className="App">
				{
					Cabecalho()
				}
				<main className="grid--container grid--container-corpo">
					<div id="corpo" className="sombreado corpo--centralizado" >
						<h1>SP Medical Group</h1>
						<div>
							<section>
								<TituloSublinhado mensagem="Sobre nós" tamanho="70%" />
								<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat quod voluptate dolorem delectus accusamus distinctio. Sapiente alias explicabo libero ad temporibus aliquid perspiciatis laboriosam nesciunt amet doloremque. Voluptatibus, in sit?</p>
							</section>
							<section>
								<TituloSublinhado mensagem="Sobre nosso produto" tamanho="70%" />
								<div className="grid--container grid--container-informacoes">
									<Vantagem mensagem="Receba notificações no seu celular" icone="icone-celular" link="https://github.com/Chingling152/ReactNative-SpMedicalGroup"/>
									{VantagemAdmin}
									<Vantagem mensagem="Saiba como chegar ao local de suas consultas" icone="icone-checkpoint" click={()=>alert("Ainda estamos trabalhando nisso")} />
								</div>
								{LoginBtn}
							</section>
							<section>
								<TituloSublinhado mensagem="Instituições que usam nosso serviço" tamanho="90%" />
								<div className="grid--container tres--colunas">
									{instituicoes.map(i=> <p key={i.id}>{i.nomeFantasia}</p>)}
								</div>
							</section>
						</div>
					</div>	
					<div id="foto--home"></div>
				</main>
			</div>
		);
	}
}

export default Home;
