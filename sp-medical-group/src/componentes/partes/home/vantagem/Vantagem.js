import React, { Component } from 'react';
class Vantagem extends Component {
	constructor(props){
		super();
	}

	render() {
		return (
			<div className="vantagem--item">
				<div id = {this.props.icone} className="icone"></div>
				<a href={this.props.link} onClick={this.props.click}>{this.props.mensagem}</a>
			</div>
		);
	}
}

export default Vantagem;
