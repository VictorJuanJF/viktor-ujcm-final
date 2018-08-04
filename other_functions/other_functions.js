const getTipoProgramaEstudiante = (nombreEscuela) => {
    var tipoPrograma;
    //1 = Pregrado
    //2 = Posgrado
    switch (nombreEscuela) {

        case 'Derecho':
            tipoPrograma = 1;
            break;
        case 'Contabilidad':
            tipoPrograma = 1;
            break;
        case 'Ingenieria Comercial':
            tipoPrograma = 1;
            break;
        case 'Ciencias Administrativas y Marketing Estratégico':
            tipoPrograma = 1;
            break;
        case 'Educación Inicial':
            tipoPrograma = 1;
            break;
        case 'Educacion Fisica':
            tipoPrograma = 1;
            break;
        case 'Psicologia':
            tipoPrograma = 1;
            break;
        case 'Ingenieria de Sistemas e Informatica':
            tipoPrograma = 1;
            break;
        case 'Programa de Complementacion Academica':
            tipoPrograma = 1;
            break;
        case 'Maestria':
            tipoPrograma = 2;
            break;
        case 'Doctorado':
            tipoPrograma = 2;
            break;
        case 'Segunda Especialidad':
            tipoPrograma = 2;
            break;

    }
    return tipoPrograma;

}


module.exports = {
    getTipoProgramaEstudiante
}