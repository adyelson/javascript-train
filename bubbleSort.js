
function bubbleSort(lista) {

    let contador = 0;
    let trocou = false;

    for (let w = 0; w < lista.length - 1; w++) {
        trocou = false;
        for (let x = 0; x < lista.length - w - 1; x++) {
            if (lista[x] > lista[x + 1]) {
                let temp = lista[x];
                lista[x] = lista[x + 1]
                lista[x + 1] = temp;
                trocou = true;
            }
            contador++          
        }
        if (!trocou) {
            break;
        }
    }
    console.log(lista)
    console.log(contador)
}


var listaDeNumeros = [999, 99, 9, 9999, 99999, 111, 11111, 23, 18, 71, 93, 201, 11, 3, 0, 1, 223, 2000, 3491, 981, 38, 77]

bubbleSort(listaDeNumeros)
