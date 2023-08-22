
function bubbleSort(lista) {

    let contador = 0;
    let teveTroca = false;

    for (let w = 0; w < lista.length - 1; w++) {
        for (let x = 0; x < lista.length - w - 1; x++) {
            if (lista[x] > lista[x + 1]) {
                let temp = lista[x];
                lista[x] = lista[x + 1]
                lista[x + 1] = temp;
                teveTroca = true;
            }
            contador++
        }
        if (!teveTroca) {
            break;
        }
    }
    return [lista, contador];
}


var listaDeNumeros = [999, 99, 9, 9999, 99999, 111, 11111, 23, 18, 71, 93, 201, 11, 3, 0, 1, 223, 2000, 3491, 981, 38, 77]

let listaOrdenada = bubbleSort(listaDeNumeros)[0]
let contagem = bubbleSort(listaDeNumeros)[1]

console.log(listaOrdenada)
console.log(contagem)
