import {addTransferQuery, getTransfersQuery} from "../models/transferModel.js";

export const addTransfer = async (req, res) => {
    const { emisor, receptor, monto } = req.body;
    try {
        const transfer = await addTransferQuery(emisor, receptor, monto);
        res.status(200).send(transfer);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getTransfers = async (req, res) => {
    try {
        const transfers = await getTransfersQuery();
        res.status(200).send(transfers);
    } catch (error) {
        res.status(500).send(error);
    }
}