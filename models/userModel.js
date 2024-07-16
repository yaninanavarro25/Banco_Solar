import { pool } from "../config/db.js";

export const addUserQueries = async ( nombre, balance ) => {
    try {
        const sql = {
            text: "INSERT INTO usuarios (nombre, balance) VALUES ($1, $2) returning *",
            values: [nombre, balance]
        }
        const response = await pool.query(sql);
        if (response.rowCount > 0) {
            
            return response.rows[0]
            
        } else{
            return false
        }
       
    } catch (error) {
        console.log("Error code: ", error.code, "Error message: ", error.message);
    }
}

export const getUsersQueries = async () => {
    try {
        const sql = {
            text: "SELECT * FROM usuarios",
        }
        const response = await pool.query(sql);
        if (response.rowCount > 0) {
            return response.rows;
        } else {    
            return new Error("No se encontraron usuarios");
        }
    } catch (error) {
        console.log("Queries Error Code: ", error.code, "Message: ", error.message);
    }
}

export const editUserQueries = async (datos) => {
    try {
      const query = {
    text: 'UPDATE usuarios SET nombre = $1, balance = $2 WHERE id = $3',
    values: datos,
  }
    const response = await pool.query(query)
    if (response.rowCount > 0) {
      return response.rows[0]
    } else {
      return new Error('Error editar Usuario')
    }
  }
  catch (error) {
    console.log(error.message)
  }
}

export const deleteUserQueries = async (id) => {
    try {
        const sql = {
            text: "DELETE FROM usuarios WHERE id = $1 RETURNING *",
            values: [id]
        }
        const response = await pool.query(sql);
        if (response.rowCount > 0) {
            return response.rows;
        } else {
            return new Error("No se pudo eliminar el usuario");
        }
    } catch (error) {
        console.log("Queries Error Code: ", error.code, "Message: ", error.message);
    }
}