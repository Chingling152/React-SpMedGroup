export const TipoUsuario = () =>{
    let tipoUsuario = localStorage.getItem("UsuarioSpMedGroup") ;

    switch (tipoUsuario) {
        case null:
            return "Deslogado";
        default:
            return tipoUsuario.TipoUsuario.toString();
    }
}

export const parseJwt = () =>{
    var base64Url = localStorage.getItem("UsuarioSpMedGroup").split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    
    return JSON.parse(window.atob(base64));
}