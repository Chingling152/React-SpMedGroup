import React, { Component } from 'react';

import "./Home.css";

import TituloSublinhado from '../../../componentes/titulos/TituloSublinhado';
import Vantagem from '../../../componentes/partes/home/vantagem/Vantagem';
import { Cabecalho } from '../../../services/Cabecalho';

class Home extends Component {
	render() {
		return (
			<div className="App">
				{
					Cabecalho("")
				}
				<main className="grid--container grid--container-corpo">
					<div className="sombreado corpo--centralizado"  >
						<h1>SP Medical Group</h1>
						<div id="corpo">
							<section>
								<TituloSublinhado mensagem="Sobre nós" tamanho="70%" />
								<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat quod voluptate dolorem delectus accusamus distinctio. Sapiente alias explicabo libero ad temporibus aliquid perspiciatis laboriosam nesciunt amet doloremque. Voluptatibus, in sit?</p>
							</section>
							<section>
								<TituloSublinhado mensagem="Sobre nosso produto" tamanho="70%" />
								<div className="grid--container grid--container-informacoes">
									<Vantagem mensagem="Receba notificações no seu celular" icone="icone-celular" link="/" />
									<Vantagem mensagem="Veja todas as suas consultas" icone="icone-calendario" link="/" />
									<Vantagem mensagem="Saiba como chegar ao local de suas consultas" icone="icone-checkpoint" link="/" />
								</div>
								<a href="/login" className="link">Fazer Login</a>
							</section>
							<section>
								<TituloSublinhado mensagem="Instituições que usam nosso serviço" tamanho="90%" />
								<div className="grid--container tres--colunas">
									<p>Instituicao</p>
									<p>Instituicao</p>
									<p>Instituicao</p>
									<p>Instituicao</p>
									<p>Instituicao</p>
									<p>Instituicao</p>
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
