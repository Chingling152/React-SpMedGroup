import React from 'react';
import CabecalhoAdmin from "../componentes/partes/publico/cabecalho/CabecalhoAdmin";
import CabecalhoLogado from "../componentes/partes/publico/cabecalho/CabecalhoLogado";
import CabecalhoDeslogado from "../componentes/partes/publico/cabecalho/CabecalhoDeslogado";

export const Cabecalho = (x) => {
    switch(x){
        case "Administrador":
            return(<CabecalhoAdmin/>);
        case "Medico":
        case "Paciente":
            return(<CabecalhoLogado/>);
        default:
            return(<CabecalhoDeslogado/>);
    }
}