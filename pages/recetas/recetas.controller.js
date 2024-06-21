import { recipe } from "../../components/recipe.js"
import {getIngredientes } from "../../api/ing.api.js"
import { addReceta, getRecetas } from "../../api/recipe.api.js"

const btnAdd = document.getElementById("add")
const btnCancel = document.getElementById("cancel")
const btnCreate = document.getElementById('create')
const selectIng = document.getElementById('ing');
const listado = document.getElementById('listRecipe')

const arrIng = []

btnCreate.addEventListener('click',async()=>{
    const name = document.getElementById("name").value
   
    console.log(arrIng)
        const ing = arrIng.map(e => ({
                id: e.idIngrediente,
                cantidad: e.quantity
        }));
        console.log(ing)
    await addReceta(name,ing);
    await addRecetas();
});

btnAdd.addEventListener('click',()=>{
    const quantity = document.getElementById("quantity").value
    const ing = document.getElementById("ing").value
    const idIngrediente = document.getElementById("ing").options[document.getElementById("ing").selectedIndex].dataset.id;
    const li = document.createElement('li')


    arrIng.push({quantity, ing, idIngrediente})
    li.textContent = `${ing}: ${quantity}`
    document.getElementById('list').appendChild(li)
})


btnCancel.addEventListener('click',()=>{
    arrIng.splice(0,arrIng.length)
    document.getElementById('list').innerHTML = ''
})

window.addEventListener('load',async function() {
    await addOptions()
    await addRecetas()

});

const addRecetas = async () => {
    const getIng = await getIngredientes();
    const getReceta = await getRecetas();

    listado.innerHTML = "";

    getReceta.map(receta => {

        const ingredientesR = receta.ing.map(ingdeReceta => {
            const getnameIng = getIng.find(e => e.id == ingdeReceta.id);
            return {name:getnameIng.nombreIngrediente,quantity:ingdeReceta.cantidad };
        });

        const rHTML = recipe(receta.nombre, ingredientesR);
        listado.innerHTML += rHTML;

    });
};



const addOptions = async () => {

    const ingredientes = await getIngredientes();
    ingredientes.map(ingrediente => {
        const option = document.createElement('option');
        option.dataset.id = ingrediente.id;
        option.value = ingrediente.nombreIngrediente;
        option.textContent = ingrediente.nombreIngrediente;
        selectIng.appendChild(option);
    });
}