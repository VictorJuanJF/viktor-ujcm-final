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
    'autenticación de documentos'
]
console.log(collection);

const applyLevenshtein = (strg1, callback) => {
    for (let i = 0; i < collection.length; i++) {
        weights[i] = similarity(strg1, collection[i]);
        if (i == 1) {
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
    let percent = (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength)
    return percent;
}

module.exports = {
    applyLevenshtein
}