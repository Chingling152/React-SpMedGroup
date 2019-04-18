import React, { Component } from 'react';

class BotaoLogout extends Component {

	deslogarUsuario(){
		localStorage.setItem("UsuarioSpMedGroup",null);
	}
	render() {
		return (
			<a href="/login" onClick={this.deslogarUsuario.bind()}>Logout</a>
		);
	}
}

export default BotaoLogout;
