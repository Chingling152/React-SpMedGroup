export const TokenUsuario = () => localStorage.getItem("UsuarioSpMedGroup") ;
// usado para caso você queira apenas o token

//usado para transformar o token em objeto
export const parseJwt = () =>{
    try {
        var base64Url = TokenUsuario().split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const token = JSON.parse(window.atob(base64));
        
        if(TokenValido(token)){
            return token;
        }
        return null;
    } catch (error) {
        return null;
    }    
}

//usado para validar o token
const TokenValido = (token) =>{
    if(token != null){
        if(Date.now() <= token.exp * 1000){
            return true;
        }
    }
    return false;
}
//http://schemas.microsoft.com/ws/2008/06/identity/claims/role