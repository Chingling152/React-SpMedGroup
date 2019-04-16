import React, { Component } from 'react';

class CabecalhoAdmin extends Component {
	render() {
		return (
			<div className="sombreado grid--container grid--container-cabecalho" id="cabecalho">
				<div className="icone--spmedgroup"></div>
				<nav>
					<a href="/">Pagina inicial</a>
				</nav>
				<nav>
					<a href="?">Minha area</a>
				</nav>
			</div>
		);
	}
}

export default CabecalhoAdmin;
