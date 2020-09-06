

var pociones = new Array();
var combinaciones = new Array();
var ataques = new Array();
var numDiferentes = 0;
var maxRojas = 0;
var maxVerdes = 0;
var maxAmarillas = 0;
var maxAzules = 0;
var maxGrises = 0;
var maxAtaques = 0;
var num = 0;

class Pocion {
    constructor(color, espacio) {
        this.color = color;
        this.espacio = espacio;
    }

}

$(document).ready(function () {

    $('#agregar').on("click", function () {
        var pocion_val = $("#pocion").val();
        if (pocion_val == 'Poción roja')
            maxRojas++;
        if (pocion_val == 'Poción azul')
            maxAzules++;
        if (pocion_val == 'Poción amarilla')
            maxAmarillas++;
        if (pocion_val == 'Poción verde')
            maxVerdes++;
        if (pocion_val == 'Poción gris')
            maxGrises++;

        $("#respuesta").innerHTML = "";
        let obj = new Pocion(pocion_val, num);
        num++;
        if (validaRepetidos(pociones, pocion_val))
        {
            numDiferentes++;
        }
        maxAtaques = Math.max(maxRojas, maxAmarillas, maxVerdes, maxAzules, maxGrises);
        pociones.push(obj);
        $("<p>" + pocion_val + "</p>").appendTo("#pocimasList");
    });

    $('#calcular').on("click", function () {
//        escoger(pociones.length, new Array(), 0, pociones);
//        console.log(JSON.stringify(combinaciones));
        combinationUtil(pociones, new Array(pociones.length), 0, pociones.length - 1, 0, numDiferentes);
        var listaSinNivelUno = new Array;
        for (var i = 0; i < combinaciones.length; i++)
        {
            disp('Ataque ' + combinaciones[i].length + ' pocimas: '+calculaDano(combinaciones[i].length)+'%');
            var listaTemp = new Array;
            listaTemp.push.apply(listaTemp, pociones);
            for (var j = 0; j < combinaciones[i].length; j++)
            {
                var index = listaTemp.indexOf(combinaciones[i][j]);
                listaTemp.splice(index, 1)
            }
            disp('Ataque ' + listaTemp.length + ' pocimas: '+calculaDano(listaTemp.length)+'%');
            disp('-------------------------------------------');
            listaSinNivelUno.push(listaTemp);
        }
      

        num = 0;
        pociones = new Array();
        combinaciones = new Array();
        numDiferentes = 0;
        maxRojas = 0;
        maxVerdes = 0;
        maxAmarillas = 0;
        maxAzules = 0;
        maxGrises = 0;
        maxAtaques = 0;
        //var pocion_val = $("#pocion").val();
        $("#pocimasList").innerHTML = "";
    });
}); /*end docu*/


function disp(x) {

    $("<p>" + x + "</p>").appendTo("#respuesta");
}

function combinacionesActuales(desde, r)
{
    var rondas = new Array;
    for (var i = 0; i < r; i++)
    {

    }
}

function combinationUtil(desde, hasta, start, end, index, r)
{

    if (index == r)
    {
        var espacio = new Array;
        for (var j = 0; j < r; j++)
        {
            if (validaRepetidos(espacio, hasta[j].color))
                espacio.push(hasta[j]);
        }
        combinaciones.push(espacio);

        return;
    }

    for (var i = start; i <= end && end - i + 1 >= r - index; i++)
    {
        hasta[index] = desde[i];
        combinationUtil(desde, hasta, i + 1, end, index + 1, r);
    }
}

function validaRepetidos(desde, valor)
{
    for (var i = 0; i < desde.length; i++)
    {
        if (desde[i].color == valor)
        {
            return false;
        }
    }

    return true;
}


function calculaDano(numero)
{
    if (numero == 1)
        return 3;
    else if (numero == 2)
        return 5;
    else if (numero == 3)
        return 10;
    else if (numero == 4)
        return 20;
    else if (numero == 5)
        return 25;

}



