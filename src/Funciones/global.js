
import {createPopper } from '@popperjs/core'

function showPopper(e, imagen){
    let tooltip = document.getElementById("tooltip")

    if(imagen === null){
        tooltip.removeAttribute('data-show');
        return
    }

    let ctrlImagen = tooltip.firstChild

    tooltip.setAttribute('data-show', '')
    
    ctrlImagen.src = imagen
    
    this.popper = createPopper(e.target, tooltip,  {placement: 'top',})

}

function now(){
    var today = new Date()
    return this.padNumero(today.getDate()) +'.'+this.padNumero(today.getMonth()+1)+'.' +today.getFullYear()
}

function padNumero(num){
    return String(num).padStart(2, '0')
}

async function copyImagen(){
    
    let imagen = null

    let state = await navigator.permissions.query({ name: "clipboard-read" }).then(result => result.state)

    if (state === "denied") {
        alert("Activar permiso");
        return null
    }   

    let data = await navigator.clipboard.read().then(data => data)

    for (let i = 0; i < data.length; i++) {

        if (!data[i].types.includes("image/png")) {
            console.log("No existe imagen")
            return null;
        } 

        imagen = await data[i].getType("image/png").then(blob => URL.createObjectURL(blob))

    }
    
    return imagen
}

async function getBlobImagen(url){

    let file = await fetch(url).then(r => r.blob())
        .then(blobFile => new File([blobFile], 'imagen.jpg'));

    return file
}

const global = {now,padNumero, copyImagen, getBlobImagen, showPopper}

export default global