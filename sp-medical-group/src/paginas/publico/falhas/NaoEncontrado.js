import React, { Component } from 'react';

class NaoEncontrado extends Component {
	render() {
		return (
			<div className="corpo--centralizado">
				<h1>A Pagina que você tentou acessar não existe</h1>
				<hr/>
				<p><a href="/" className="link">Volte para a pagina Inicial</a></p>
			</div>
		);
	}
}

export default NaoEncontrado;
