import React from 'react';
import CabecalhoAdmin from "../componentes/partes/publico/cabecalho/CabecalhoAdmin";
import CabecalhoLogado from "../componentes/partes/publico/cabecalho/CabecalhoLogado";
import CabecalhoDeslogado from "../componentes/partes/publico/cabecalho/CabecalhoDeslogado";
import {parseJwt} from "./Autenticacao";

export const Cabecalho = () => {
    if(parseJwt() != null){
        switch(parseJwt().Role){
            case "Administrador":
                return(<CabecalhoAdmin/>);
            case "Medico":
            case "Paciente":
                return(<CabecalhoLogado/>);
            default:
                return(<CabecalhoDeslogado/>);
        }
    }
    console.log("Ta nulo");
    return(<CabecalhoDeslogado/>);
}