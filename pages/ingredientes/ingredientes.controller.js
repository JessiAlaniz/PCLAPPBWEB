import { addIngrediente, getIngredientes } from "../../api/ing.api.js"

const btnCreate = document.getElementById("create")



btnCreate.addEventListener('click', async ()=>{
    const name = document.getElementById("name").value
    

        const resultado = await addIngrediente(name);

        if (resultado) {
            await renderListaIngredientes()
        } else {
            console.log('Hubo un error');
        }
    
    
})

window.addEventListener('load', async function() {
    
   await renderListaIngredientes()

})

const renderListaIngredientes = async () => {
  
    const ingredientes = await getIngredientes();

    const listaElement = document.getElementById('list');
    listaElement.innerHTML = '';


        ingredientes.map(ingrediente => {
            const li = document.createElement('li');
            li.textContent = `${ingrediente.nombreIngrediente}`;
            listaElement.appendChild(li);
        });
};

