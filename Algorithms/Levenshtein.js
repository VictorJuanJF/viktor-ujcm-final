//==============================================
//===========Algoritmo de Levenshtain===========
//==============================================

let weights = [];
let MaxPercentWord = [];
//Position 0 : Percent ------- Position 1: Word


let collection = [
    'Adecuación al nuevo plan de estudios',
    'Admisión para personas con Discapacidad',
    'Admisión por 1er o 2do Puesto de Educación Secundaria',
    'Admisión por el Ingreso del Centro Pre Universitario',
    'ADMISIÓN POR GRADO O TÍTULO PROFESIONAL UNIVERSITARIO',
    'Admisión por Reanudación de Estudios',
    'Admisión por ser Deportista Calificado',
    'ADMISIÓN POR TÍTULO DE INSTITUTO DE EDUCACIÓN SUPERIOR NO UNIVERSITARIO',
    'Admisión por Traslado Externo',
    'Admisión por Traslado Interno',
    'Ampliación de Créditos',
    'anulación de deuda',
    'autenticación de documentos',
    'Beca por ayudantía de cátedra',
    'Beca por ayudantía de investigación',
    'Beca por casos especiales (orfandad/ discapacidad)',
    'Beca por hermanos estudiantes',
    'Beca por padre e hijo estudiantes',
    'Beca por Precariedad Económica',
    'Beca por promedio ponderado acumulativo',
    'Beca por representar a la Universidad en evento deportivo',

    'Beca por Retiro Voluntario, de Jubilación o Fallecimiento del Docente Ordinario o del Personal Administrativo Indeterminado de la Universidad',

    'Beca por ser Cónyuges estudiantes',

    'Beca por ser hijo de docente o trabajador administrativo de la Universidad',

    'Beca por tres primeros puestos en el examen de admisión',

    'Boleta de notas',

    'Búsqueda de Documentos',

    'Cambio de Filial',

    'Cambio de Modalidad',

    'cambio de nombre y apellido por mandato judicial',

    'Carné de Biblioteca',

    'Carta de Presentación',

    'Carta de Presentación de Internado',

    'Certificado de Estudio',

    'Certificado de Estudios del Centro de Idiomas',

    'Conformidad de Documentos',

    'Constancia Biblioteca',

    'Constancia de Conducta ',

    'Constancia de Egresado',

    'Constancia de Estudios',

    'Constancia de Estudios del Centro de Idiomas',

    'Constancia de Internado',

    'Constancia de Matrícula',

    'Constancia de Modalidad de estudios',

    'Constancia de No adeudo',

    'Constancia de No Adeudo de la Clínica Odontológica',

    'Constancia de orden de mérito',

    'Constancia de Promedio Ponderado',

    'Constancia Económica',

    'Constancia por Tercio y Quinto Superior',

    'Convalidación de Cursos',

    'Corrección de Nombres y/o Apellidos',

    'Curso Autofinanciado',

    'Curso Autofinanciado cuando falta 01 ó 02 cursos para culminar la Carrera',

    'Curso Paralelo',

    'Diploma de Egresado en Auxiliar en Educación',

    'Duplicado de Certificado de Estudio',

    'Duplicado de Constancia de Ingreso',

    'Duplicado de Ficha de Matrícula',

    'Duplicado de Recibo',

    'examen de aplazados',

    'Examen de rezagados',

    'Examen de Suficiencia pregrado',

    'Examen de Ubicación',

    'Grado de Bachiller',

    'INSCRIPCIÓN POR EL CENTRO PRE UNIVERSITARIO',

    'llevar curso en otra escuela',

    'llevar curso en otra facultad',

    'matrícula con proforma académica',

    'Matrícula Especial',

    'Matrícula Especial por Cuarta Matrícula',

    'Matrícula Virtual',

    'Proceso de Admisión',

    'Reanudación de Estudios',

    'Record Académico',

    'Reserva de Matrícula',

    'Retiro e Inclusión de Cursos',

    'Solicitud de Sílabos',

    'Solicitud de Sílabos para Auxiliar en Educación',

    'Título profesional',

    'transferencia de dinero',

    'tratamientos clínicos',
    'Justificación de Inasistencia',
    'Llevar Curso en otro Plan de Estudios',
    'Fraccionamiento de Deuda',
    'Reubicación de Actividad Integradora',
    'Cambio y Reseteo de Clave',
    'Resolución Prácticas'

]




const applyLevenshtein = (strg1, callback) => {
    for (let i = 0; i < collection.length; i++) {
        weights[i] = similarity(strg1, collection[i]);
        if (i == 0) {
            MaxPercentWord[0] = weights[i];
            MaxPercentWord[1] = collection[i];
        } else if (weights[i] > MaxPercentWord[0]) {
            MaxPercentWord[0] = weights[i];
            MaxPercentWord[1] = collection[i];
        }
    }
    console.log(`Palabra encontrada: ${MaxPercentWord}`);
    callback(MaxPercentWord[1]);
}

function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    var costs = new Array();
    for (var i = 0; i < s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
            if (i == 0)
                costs[j] = j;
            else {
                if (j > 0) {
                    var newValue = costs[j - 1];
                    if (s1.charAt(i - 1) != s2.charAt(j - 1))
                        newValue = Math.min(Math.min(newValue, lastValue),
                            costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0)
            costs[s2.length] = lastValue;
    }
    return (costs[s2.length]);
}

function similarity(s1, s2) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
        return 1.0;
    }
    let percent = (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
    //console.log(s1 + ' y ' + s2 + ' es:               ' + percent);
    return percent;
}

applyLevenshtein('mi adecuacion', (res) => {

});

module.exports = {
    applyLevenshtein
}