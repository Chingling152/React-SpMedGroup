import { TokenUsuario } from "./Autenticacao";

export default{
    chamada(endpoint){
        const url = `http://localhost:5000/api/v1/${endpoint}`;
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