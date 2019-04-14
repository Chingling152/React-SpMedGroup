import React, { Component } from 'react';

import "./Home.css";

import CabecalhoDeslogado from '../../../componentes/partes/publico/cabecalho/CabecalhoDeslogado';
import Vantagem from '../../../componentes/partes/home/vantagem/Vantagem';

class Home extends Component {
	render() {
		return (
			<div>
				<CabecalhoDeslogado/>
				<main className="grid--container grid--container-corpo">
					<div className="sombreado corpo--centralizado" id="corpo" >
						<section>
							<h1>SP Medical Group</h1>
						</section>
						<section>
							<h2>Sobre nós</h2>
							<hr/>
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat quod voluptate dolorem delectus accusamus distinctio. Sapiente alias explicabo libero ad temporibus aliquid perspiciatis laboriosam nesciunt amet doloremque. Voluptatibus, in sit?</p>
						</section>
						<section>
							<h2>Sobre nosso produto</h2>
							<hr/>
							<div className="grid--container grid--container-informacoes">
								<Vantagem mensagem="Receba notificações no seu celular" icone="icone-celular" link="/"/>
								<Vantagem mensagem="Veja todas as suas consultas" icone="icone-calendario" link="/"/>
								<Vantagem mensagem="Saiba como chegar ao local de suas consultas" icone="icone-checkpoint" link="/"/>
							</div>
							<a href="/login" className="link">Fazer Login</a>
						</section>
						<section>
							<h2>Instituições que usam nosso serviço</h2>
							<hr/>
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
					<div id="foto--home"></div>
				</main>
			</div>
		);
	}
}

export default Home;
