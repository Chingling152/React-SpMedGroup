// Imports
import React from 'react';
import ReactDOM from 'react-dom';

// Autenticação
import {BrowserRouter,Route,Switch , Redirect} from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import { parseJwt} from './services/Autenticacao';

//Estilização
import './recursos/css/style.css';

//Paginas
//Publicas
import Home from './paginas/publico/home/Home';
import Login from './paginas/publico/login/Login';
import NaoEncontrado from './paginas/publico/falhas/NaoEncontrado.js';
import SemPermissao from './paginas/publico/falhas/SemPermissao.js';

// Usuario
import VisualizarConsultas from "./paginas/usuarios/consultas/VisualizarConsultas";
import Localizacao from './paginas/usuarios/direcao/Localizacao';

//Administrador
import AreaAdmin from './paginas/admin/home/AreaAdmin';
import CadastrarUsuario from "./paginas/admin/usuarios/CadastrarUsuario";
import CadastrarPaciente from "./paginas/admin/pacientes/CadastrarPaciente";
import CadastrarMedico from "./paginas/admin/medicos/CadastrarMedico";
import CadastrarConsulta from "./paginas/admin/consultas/CadastrarConsulta";
import CadastrarClinica from "./paginas/admin/clinica/CadastrarClinica";
import CadastrarEspecialidade from './paginas/admin/especialidades/CadastrarEspecialidade';

const Administrador = ({ component: Component }) => (
    <Route
    render={props =>
      parseJwt() !== null && parseJwt().Role === "Administrador" ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/sem-permissao" }} />
      )
    }
  />
);

const Logado = ({ component: Component }) => (
    <Route
    render={props =>
      parseJwt()!== null ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login" }} />
      )
    }
  />
);


const rotas = (
    <BrowserRouter>
        <div>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login}/>

                <Logado path="/minha-area/consultas" component={VisualizarConsultas}/>
                <Logado path="/minha-area/localizacao" component={Localizacao}/>
                
                <Administrador exact path="/admin" component={AreaAdmin}/>
                <Administrador path="/admin/dados/usuario" component={CadastrarUsuario}/>
                <Administrador path="/admin/dados/paciente" component={CadastrarPaciente}/>
                <Administrador path="/admin/dados/medico" component={CadastrarMedico}/>
                <Administrador path="/admin/dados/consulta" component={CadastrarConsulta}/>
                <Administrador path="/admin/dados/clinica" component={CadastrarClinica}/>
                <Administrador path="/admin/dados/especialidade" component={CadastrarEspecialidade}/>

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
