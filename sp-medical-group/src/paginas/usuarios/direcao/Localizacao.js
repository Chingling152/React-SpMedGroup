import React, { Component } from 'react';
import { Cabecalho } from '../../../services/Cabecalho';
import TituloSublinhado from '../../../componentes/partes/titulos/TituloSublinhado';

const margem ={
    marginTop:20,
    marginBottom:20
}

class Localizacao extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            local:{
                latitude:"",
                longitude:""
            },
            destino:{
                latitude:"",
                longitude:""
            },
            nomeLocal:"",
            nomeDestino:""
        }
    }

    componentDidMount(){
        let local = document.URL.split('?')[1];
        if(local != null){
            local = local.split('=')[1];
            local = decodeURI(local);
            this.setState({nomeDestino:local})
        }
    }
    
    render() { 
        return ( 
            <div className="App">
                <Cabecalho/>
                <main className="grid--container grid--container-corpo">

                    <div className="corpo--centralizado sombreado grid--container">
                        <TituloSublinhado mensagem="Veja o local da sua consulta" tamanho="50%"/>
                        <form className="grid--container">
                            <div style={margem}>
                                <label for="endereco">Endereço : </label>
                                <input id="endereco" type="text" placeholder="Insira seu endereço aqui" style={{width:300}} value={this.state.nomeLocal}/>
                            </div>
                            <div style={margem}>
                                <label for="destino">Destino : </label>
                                <input id="destino" type="text" placeholder="Insira seu destino aqui" style={{width:300}} value={this.state.nomeDestino}/>
                            </div>
                            <div style={margem}>
                                <input style={margem} type="submit" value="Buscar localização"/>
                                <input style={margem} type="submit" value="Buscar localização atual"/>
                            </div>
                        </form>
                    </div>
 
                </main>

            </div>
         );
    }
}
 
export default Localizacao;