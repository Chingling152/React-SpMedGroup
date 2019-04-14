import React, { Component } from 'react';

class SemPermissao extends Component {
	render() {
		return (
			<div className="corpo--centralizado">
				<h1>Ei ! o que você está fazendo aqui?</h1>
				<hr/>
				<p>Você está tentando acessar uma pagina que você não tem permisssão <a href="/" className="link">Saia daqui antes que eu chame a policia ;-;</a></p>
			</div>
		);
	}
}

export default SemPermissao;
