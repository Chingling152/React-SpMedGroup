import React, { Component } from 'react';

import "./Login.css";

import MensagemErro from '../../../componentes/feedback/MensagemErro';

class Login extends Component {
	constructor(){
		super();
		this.state = {
			email:"",
			senha:""
		};
	}

	definirEmail(event){
		this.setState({email:event.target.value});
	}

	definirSenha(event){
		this.setState({senha:event.target.value});
	}

	render() {
		return (
			<main className="grid--container grid--container-corpo">
				<div id="foto--login"></div>
				<div className="corpo--formulario corpo--centralizado sombreado">
					<div className="icone--spmedgroup"></div>
					<h3>LOGIN</h3>
					<form className="grid--container grid--container-corpo">
						<input type="email" placeholder="email" id="input--login-email" value={this.state.email} onChange={this.definirEmail.bind(this)} maxLength="200" required />
						<input type="password" placeholder="senha" id="input--login-senha" value={this.state.senha} onChange={this.definirSenha.bind(this)} maxLength="200" required />
						<a className="link" href="/login" onClick={()=>{alert("Contate o administrador no telefone abaixo\n(11) 1111-1111")}}>Esqueceu sua senha?</a>
						<input type="submit" value="LOGIN" className = "sombreado"/>
						<MensagemErro/>
					</form>
					<a href="/" className="link">Voltar</a>
				</div>
			</main>
		);
	}
}

export default Login;