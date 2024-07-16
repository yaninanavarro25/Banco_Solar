import { pool } from "../config/db.js";

export const addTransferQuery = async (emisor, receptor, monto) => {
  const { id: emisorId } = (
    await pool.query(`SELECT * FROM usuarios WHERE nombre = '${emisor}'`)
  ).rows[0];
  const { id: receptorId } = (
    await pool.query(`SELECT * FROM usuarios WHERE nombre = '${receptor}'`)
  ).rows[0];

  const registrarTransferenciaQuery = {
    text: "INSERT INTO transferencias (emisor, receptor, monto, fecha) values ( $1, $2, $3, NOW())",
    values: [emisorId, receptorId, monto],
  };

  const actualizarBalanceEmisor = {
    text: "UPDATE usuarios SET balance = balance - $1 WHERE nombre = $2",
    values: [monto, emisor],
  };

  const actualizarBalanceReceptor = {
    text: "UPDATE usuarios SET balance = balance + $1 WHERE nombre = $2",
    values: [monto, receptor],
  };

  try {
    await pool.query("BEGIN");
    await pool.query(registrarTransferenciaQuery);
    await pool.query(actualizarBalanceEmisor);
    await pool.query(actualizarBalanceReceptor);
    await pool.query("COMMIT");
    return true;
  } catch (e) {
    console.log(e);
    await pool.query("ROLLBACK");
    throw e;
  }
};

export const getTransfersQuery = async () => {
  try {
    const sql = {
      text: `SELECT 
            t.id,
            e.nombre AS emisor,
            r.nombre AS receptor,
            t.monto,
            t.fecha
        FROM 
            transferencias t
        JOIN 
            usuarios e ON t.emisor = e.id
        JOIN 
            usuarios r ON t.receptor = r.id`,
            
      rowMode: "array",
    };

    const result = await pool.query(sql);
    if (result.rowCount > 0) {
      return result.rows;
    } else {
      return null;
    }
  } catch (error) {
    console.log("Error code: ", error.code, "Error message: ", error.message);
  }
};