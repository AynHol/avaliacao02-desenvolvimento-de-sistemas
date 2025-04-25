"use client"
import { Checkbox } from "@mui/material";
import styles from "./styles.module.css";
import axios from "axios";

type product = {
    id: string;
    text: string;
    checked: boolean;
};

type productProps = {
    product: product;
    handleRemoveItem: (event: any, id: string) => void
    handleUpdateItem: (event: any, id: string, boolean: boolean) => void
};

export default function Product({ product, handleRemoveItem, handleUpdateItem}: productProps) {
    async function status(id: string) {
        const response = await axios.get(`http://localhost:3001/itens/${id}`);
    }

    return (
        <div className={styles.content}>
            <div className={styles.info}>
                <Checkbox onChange={(event) => handleUpdateItem(event, product.id, event.target.checked)}/>
                <p>{product.text}</p>
            </div>
            <button onClick={(event) => handleRemoveItem(event, product.id)}>del</button>
        </div>
    );
}
