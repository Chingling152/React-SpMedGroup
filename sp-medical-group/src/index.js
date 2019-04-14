// Imports
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Route,Switch} from "react-router-dom";
import * as serviceWorker from './serviceWorker';

//Estilização
import './recursos/css/style.css';

//Paginas
//Publicas
import Home from './paginas/publico/home/Home';
import Login from './paginas/publico/login/Login';
import NaoEncontrado from './paginas/publico/falhas/NaoEncontrado.js';
import SemPermissao from './paginas/publico/falhas/SemPermissao.js';

// Usuario
// import AreaUsuario from "./paginas/usuarios/home/AreaUsuario";
import VisualizarConsultas from "./paginas/usuarios/consultas/VisualizarConsultas";
import AlterarInformacoes from "./paginas/usuarios/alterar/AlterarInformacoes";

// Medico
import AdicionarDescricao from "./paginas/medico/consulta/AdicionarDescricao";

//Administrador
import AreaAdmin from './paginas/admin/home/AreaAdmin';
import CadastrarUsuario from "./paginas/admin/usuarios/CadastrarUsuario";
import CadastrarPaciente from "./paginas/admin/pacientes/CadastrarPaciente";
import CadastrarMedico from "./paginas/admin/medicos/CadastrarMedico";
import CadastrarConsulta from "./paginas/admin/consultas/CadastrarConsulta";
import CadastrarInstituicao from "./paginas/admin/instituicao/CadastrarInstituicao";

import AlterarUsuario from "./paginas/admin/usuarios/AlterarUsuario";
import AlterarPaciente from "./paginas/admin/pacientes/AlterarPaciente";
import AlterarMedico from "./paginas/admin/medicos/AlterarMedico";
import AlterarConsulta from "./paginas/admin/consultas/AlterarConsulta";
import AlterarInstituicao from "./paginas/admin/instituicao/AlterarInstituicao";

const rotas = (
    <BrowserRouter>
        <div>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login}/>

                {/* <Route path="/minha-area" component={AreaUsuario}/> */}
                <Route path="/minha-area/consultas" component={VisualizarConsultas}/>
                <Route path="/minha-area/meus-dados" component={AlterarInformacoes}/>

                <Route path="/minha-area/alterar-consulta" component={AdicionarDescricao}/>
                
                <Route path="/area-administrador" component={AreaAdmin}/>
                <Route path="/cadastrar/usuario" component={CadastrarUsuario}/>
                <Route path="/cadastrar/paciente" component={CadastrarPaciente}/>
                <Route path="/cadastrar/medico" component={CadastrarMedico}/>
                <Route path="/cadastrar/consulta" component={CadastrarConsulta}/>
                <Route path="/cadastrar/instituicao" component={CadastrarInstituicao}/>
                <Route path="/alterar/usuario" component={AlterarUsuario}/>
                <Route path="/alterar/paciente" component={AlterarPaciente}/>
                <Route path="/alterar/medico" component={AlterarMedico}/>
                <Route path="/alterar/consulta" component={AlterarConsulta}/>
                <Route path="/alterar/instituicao" component={AlterarInstituicao}/>

                <Route exact path="/sem-permissao" component={SemPermissao}/>

                <Route component={NaoEncontrado}/>
            </Switch>
        </div>
    </BrowserRouter>
);

ReactDOM.render(rotas, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
