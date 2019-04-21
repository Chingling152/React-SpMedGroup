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
            Listar:(token)=> fetch(url,{
                method:'GET',
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": "Bearer " + token
                }
            }),
            Alterar: (token,corpo)=>fetch({
                method:'PUT',
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": "Bearer " + token
                },
                body:corpo
            }),
            Cadastrar: (token,corpo)=> fetch(url,{
                method:'POST',
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": "Bearer " + token
                },
                body:corpo
            }),
        }
    }
}