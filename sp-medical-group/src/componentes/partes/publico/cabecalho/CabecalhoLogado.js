import React, { Component } from 'react';
import BotaoLogout from './BotaoLogout';

class CabecalhoLogado extends Component {
	render() {
		return (
			<div className="sombreado grid--container grid--container-cabecalho" id="cabecalho">
				<div className="icone--spmedgroup"></div>
				<nav>
					<a href="/">Pagina inicial</a>
				</nav>
				<nav>
					<a href="/minha-area/consultas">Minhas consultas</a>
				</nav>
				<nav>
					<BotaoLogout/>
				</nav>
			</div>
		);
	}
}

export default CabecalhoLogado;
