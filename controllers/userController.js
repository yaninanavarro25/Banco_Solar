import {
    addUserQueries,
    getUsersQueries,
    editUserQueries,
    deleteUserQueries,
  } from "../models/userModel.js";
  import path from "path";
  const __dirname = path.resolve();
  
  export const home = (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
  };
  
  export const addUser = async (req, res) => {
    const { nombre, balance } = req.body;
    console.log(req.body);
    try {
      await addUserQueries(nombre, balance);
      res.status(201).send("Usuario agregado con exito");
    } catch (error) {
      console.log(error);
      res.status(500).send("Error al agregar usuario");
    }
  };
  
  export const getUsers = async (req, res) => {
    try {
      const users = await getUsersQueries();
      res.status(200).send(users);
    } catch (error) {
      res.status(500).send("Error al obtener usuarios");
    }
  };
  
  export const editUser = async (req, res) => {
    const { id } = req.query;
    const { name, balance } = req.body;
    const datos = [name, balance, id];
    try {
      const user = await editUserQueries(datos);
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send("Error al editar usuario");
    }
  };
  
  export const deleteUser = async (req, res) => {
    const { id } = req.query;
    
    try {
      const user = await deleteUserQueries(id);
     res.status(200).send(user);
    } catch (error) {
      res.status(500).send("Error al eliminar usuario");
    }
  };