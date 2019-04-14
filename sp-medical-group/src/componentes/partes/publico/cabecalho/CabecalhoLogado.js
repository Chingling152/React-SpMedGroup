import React, { Component } from 'react';

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
					<a href="/minha-area/meus-dados">Meus dados</a>
				</nav>
			</div>
		);
	}
}

export default CabecalhoLogado;
