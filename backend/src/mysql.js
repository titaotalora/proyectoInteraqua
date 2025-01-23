import {pool} from "./database/connectionMySQL.js";

const getUsuarios = async () => {
    try{
        const [result] = await pool.query("SELECT id, nombre, cargo, cedula, activo FROM usuarios;");
        console.table(result);
        console.log("¡Listado de usuarios!");
    } catch(error) {
        console.error(error);
    }  
};


const getProductos = async () => {
    try{
        const [result] = await pool.query("SELECT id, codigo, nombre, descripcion, activo FROM productos;");
        console.table(result);
        console.log("¡Listado de productos!");
    } catch(error) {
        console.error(error);
    }  
};


getUsuarios();
getProductos();