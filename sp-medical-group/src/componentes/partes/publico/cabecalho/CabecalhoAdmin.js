import React, { Component } from 'react';
import BotaoLogout from './BotaoLogout';

class CabecalhoAdmin extends Component {
	render() {
		return (
			<div className="sombreado grid--container grid--container-cabecalho" id="cabecalho">
				<div className="icone--spmedgroup"></div>
				<nav>
					<a href="/">Pagina inicial</a>
				</nav>
				<nav>
					<a href="/admin">Minha area</a>
				</nav>
				<nav>
					<BotaoLogout/>
				</nav>
			</div>
		);
	}
}

export default CabecalhoAdmin;
