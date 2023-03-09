"use strict";
let encontrados;
let empezar = false;
let cont = 0;
let myInterval;
class Carta {
    constructor(img) {
        this.img = img;
        this.id = Carta.cont++;
    }
}
Carta.cont = 0;
let arrayC = [new Carta("../img/goku.jpg"), new Carta("../img/goku.jpg"), new Carta("../img/vegeta.jpg"), new Carta("../img/vegeta.jpg"), new Carta("../img/vegeto.jpg"), new Carta("../img/vegeto.jpg")];
function random() {
    arrayC = arrayC.sort(function () { return Math.random() - 0.5; });
    console.log(arrayC);
}
function mostrarMemory() {
    let reiniciar = document.getElementById("reiniciar");
    let tiempo = document.getElementById("tiempo");
    tiempo.style.display = "block";
    reiniciar.style.display = "none";
    encontrados = 0;
    random();
    let memoria = document.getElementById("memoria");
    let string = "";
    string += "<div class='w-100 mx-auto row d-flex justify-content-around border border-3'>";
    for (let i = 0; i < arrayC.length; i++) {
        string += `<div class='my-3 p-0  carta' onclick="clicar(` + arrayC[i].id + `)" id='` + arrayC[i].id + `'  >
            <img  src='../img/interrogante.jpg' class='interrogante'>
            <img  src='` + arrayC[i].img + `' class='personaje'>
        </div>`;
    }
    string += "</div>";
    memoria.innerHTML = string;
}
let arrayPareja = [];
function clicar(id) {
    if (cont <= 0 && !empezar) {
        empezar = true;
        cont = 15;
        myInterval = setInterval(tiempo, 1000);
    }
    if (arrayPareja.length < 2) {
        let image = document.getElementById("" + id);
        image.style.transform = "translateX(-100%) rotateY(-180deg)";
        for (let i = 0; i < arrayC.length; i++) {
            if (arrayC[i].id == id) {
                if (arrayPareja.length > 0) {
                    if (arrayPareja[0].id != id) {
                        arrayPareja.push(arrayC[i]);
                    }
                }
                else {
                    arrayPareja.push(arrayC[i]);
                }
            }
        }
        if (arrayPareja.length == 2) {
            setTimeout(() => comprobarPareja(), 600);
        }
    }
}
function tiempo() {
    let tiempo = document.getElementById("tiempo");
    if (cont >= 0) {
        tiempo.innerHTML = cont--;
    }
    else {
        empezar = false;
        arrayPareja = [];
        tiempo.innerHTML = "";
        pararTiempo();
        voltear(arrayC);
    }
}
function pararTiempo() {
    clearInterval(myInterval);
}
function comprobarPareja() {
    if (arrayPareja[0].img == arrayPareja[1].img) {
        encontrados++;
        console.log("SiIguales");
    }
    else {
        console.log("NoIguales");
        voltear(arrayPareja);
    }
    arrayPareja = [];
    console.log(arrayPareja, "watt");
    if (encontrados == 3) {
        win();
    }
}
function voltear(array) {
    for (let i = 0; i < array.length; i++) {
        console.log(array[i].img, array[i].id);
        let img = document.getElementById("" + array[i].id);
        // img.innerHTML=`<img  onclick="clicar(`+arrayPareja[i].id+`)" src='../img/interrogante.jpg' class='w-100 h-100'>`;
        img.style.transform = "none";
    }
    if (!empezar) {
        setTimeout(() => mostrarMemory(), 600);
    }
}
function win() {
    cont = 0;
    empezar = false;
    pararTiempo();
    let tiempo = document.getElementById("tiempo");
    let reiniciar = document.getElementById("reiniciar");
    tiempo.innerHTML = "";
    tiempo.style.display = "none";
    reiniciar.style.display = "block";
}
function reiniciar() {
    voltear(arrayC);
}
window.onload = function () {
    mostrarMemory();
};
