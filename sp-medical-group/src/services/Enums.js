export const enumParse = (valor) =>{
    switch (valor) {
        case "Aguardando":
            return 1;
        case "Concluida":
            return 2;
        case "Cancelada":
            return 3;
        default:
            break;
    }

}