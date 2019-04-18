export const TokenUsuario = () => localStorage.getItem("UsuarioSpMedGroup") ;

export const parseJwt = () =>{
    try {
        var base64Url = localStorage.getItem("UsuarioSpMedGroup").split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        
        return JSON.parse(window.atob(base64));
    } catch (error) {
        return null;
    }    
}

//http://schemas.microsoft.com/ws/2008/06/identity/claims/role