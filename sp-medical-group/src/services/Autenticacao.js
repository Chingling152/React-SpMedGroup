export const TipoUsuario = () =>{
    let tipoUsuario = localStorage.getItem("UsuarioSpMedGroup") ;

    switch (tipoUsuario) {
        case null:
        case undefined:
            return "Deslogado";
        default:
            return tipoUsuario.toString();
    }
}

export const parseJwt = () =>{
    var base64Url = localStorage.getItem("UsuarioSpMedGroup").split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    
    return JSON.parse(window.atob(base64));
}

//http://schemas.microsoft.com/ws/2008/06/identity/claims/role