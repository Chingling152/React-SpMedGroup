export const TokenUsuario = () => localStorage.getItem("UsuarioSpMedGroup") ;

export const parseJwt = () =>{
    try {
        var base64Url = localStorage.getItem("UsuarioSpMedGroup").split('.')[1];
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

const TokenValido = (token) =>{
    //console.log(token);
    if(token != null){
        if(Date.now() <= token.exp * 1000){
            return true;
        }
    }
    return false;
}
//http://schemas.microsoft.com/ws/2008/06/identity/claims/role