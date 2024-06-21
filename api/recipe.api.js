import { API } from "./api.js";

export const addReceta = async (name,ing) =>{
    try {
        const res = await fetch(`${API}/agregarRecetas/`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( {name, ing})
        })
        
        return res.json()
    } catch (error) {
        
        return {status:false}
    }
};

export const getRecetas = async () =>{
    try {
        const res = await fetch(`${API}/infoRecetas/`,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        return res.json()
    } catch (error) {
        
        return {status:false}
    }
};