import { TokenUsuario } from "./Autenticacao";

export const APIURL ="https://spmedicalgroup.azurewebsites.net/api/v1/"; 

export default{
    chamada(endpoint){
        const url = `${APIURL}${endpoint}`;
        return{
            Login : (corpo) => fetch(url,{
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body:corpo
            })
            ,
            Listar:()=> fetch(url,{
                method:'GET',
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": "Bearer " + TokenUsuario()
                }
            }),
            Alterar: (corpo)=>fetch({
                method:'PUT',
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": "Bearer " + TokenUsuario()
                },
                body: JSON.stringify(corpo)
            }),
            Cadastrar: (corpo)=> fetch(url,{
                method:'POST',
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": "Bearer " + TokenUsuario()
                },
                body:corpo
            }),
        }
    }
}