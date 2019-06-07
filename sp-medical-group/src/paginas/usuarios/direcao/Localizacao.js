import React, { Component } from 'react';
import { Cabecalho } from '../../../services/Cabecalho';
import TituloSublinhado from '../../../componentes/partes/titulos/TituloSublinhado';
import MensagemErro from '../../../componentes/feedback/MensagemErro';

const GOOGLE_MAPS_APIKEY = '';

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
            erroLocal:"",
            nomeDestino:"",
            erroDestino:"",
            erro:""
        }
    }

    componentDidMount(){
        let local = document.URL.split('?')[1];
        if(local != null){
            local = local.split('=')[1];
            local = decodeURI(local);
            if(local!== "undefined"){
                this.setState({nomeDestino:local})
                this.carregarEndereco(local);
            }
        }
    }

    carregarEndereco(endereco){
        const local = endereco === this.state.local? true : false;
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${endereco}&&key=${GOOGLE_MAPS_APIKEY}`)
        .then((resposta) =>{
                console.log(resposta.json())
            }
        ).then(location => {
            switch (location.status) {
                case 'OK':
                    if(local){
                        this.setState({
                            local: {
                                longitude: location.results[0].geometry.location.lng,
                                latitude: location.results[0].geometry.location.lat
                            }
                        })
                    }else{
                        this.setState({
                            destino: {
                                longitude: location.results[0].geometry.location.lng,
                                latitude: location.results[0].geometry.location.lat
                            }
                        })
                    }
                    break;
                case 'ZERO_RESULTS':
                    if(local)
                        this.setState({ erroLocal: 'Local não encontrado' })
                    else
                        this.setState({ erroDestino: 'Destino não encontrado' })
                    break;
                case 'OVER_DAILY_LIMIT':
                case 'OVER_QUERY_LIMIT':
                    this.setState({ erro: 'Limite de requisições atingido , tente mais tarde' })
                    break
                default:
                    break;
            }
        }
        ).catch(erro => {
            this.setState({ erro: 'Não foi possivel encontrar este lugar' })
        })
    }
    
    render() { 
        return ( 
            <div className="App">
                <Cabecalho/>
                <main className="grid--container grid--container-corpo">
                    <div className="corpo--centralizado sombreado" style={{display:'grid',gridRowGap:40,gridTemplateRows:"10% 20%"}}>
                        <TituloSublinhado mensagem="Veja o local da sua consulta" tamanho="80%"/>
                        <form className="grid--container" style={{display:'grid',gridRowGap:40}}>
                            <div >
                                <label htmlFor="endereco">Endereço : </label>
                                <input id="endereco" type="text" placeholder="Insira seu endereço aqui" style={{width:300}} value={this.state.nomeLocal} onChange={e=> this.setState({nomeLocal:e.target.value})}/>
                                <MensagemErro mensagem={this.state.erroLocal}/>
                            </div>
                            <div>
                                <label htmlFor="destino">Destino : </label>
                                <input id="destino" type="text" placeholder="Insira seu destino aqui" style={{width:300}} value={this.state.nomeDestino} onChange={e=> this.setState({nomeDestino:e.target.value})}/>
                                <MensagemErro mensagem={this.state.erroDestino}/>
                            </div>
                            <input type="submit" value="Buscar localização"/>
                        </form>
                    </div>
 
                <div className="corpo--centralizado sombreado">
                    <p>{this.state.nomeLocal}</p>
                    <p>{this.state.nomeDestino}</p>
                    <p>{this.state.local.latitude}</p>
                    <p>{this.state.local.longitude}</p>
                </div>
                </main>
            </div>
         );
    }
}
 
export default Localizacao;