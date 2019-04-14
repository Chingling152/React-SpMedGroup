import React, { Component } from 'react';

class CabecalhoDeslogado extends Component {
	render() {
		return (
			<div className="sombreado grid--container grid--container-cabecalho" id="cabecalho">
				<div className="icone--spmedgroup"></div>
				<nav>
					<a href="/">Pagina inicial</a>
				</nav>
				<nav>
					<a href="?">Cadastrar-se</a>
				</nav>
				<nav>
					<a href="/login">Login</a>
				</nav>
			</div>
		);
	}
}

export default CabecalhoDeslogado;
