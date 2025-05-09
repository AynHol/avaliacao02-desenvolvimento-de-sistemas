"use client";
import { Checkbox } from "@mui/material";
import styles from "./styles.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

type product = {
    id: string;
    text: string;
    checked: boolean;
};

type productProps = {
    id: string;
    product: product;
    handleRemoveItem: (event: any, id: string) => void;
    handleUpdateItem: (event: any, id: string, boolean: boolean) => void;
};

export default function Product({
    id,
    product,
    handleRemoveItem,
    handleUpdateItem,
}: productProps) {
    const [check, setCheck] = useState<product>();
    const [statu, setStatu] = useState<boolean>(false);

    useEffect(() => {
        status(id);
        checkChecked();
    }, []);

    async function status(id: string) {
        const response = await axios.get(`http://localhost:3001/itens/${id}`);
        setCheck(response.data);
    }

    const checkChecked = () => {
        check?.id ? setStatu(true) : setStatu(false);
    };

    return (
        <div className={styles.content}>
            {statu == true ? (
                <div className={styles.info}>
                    <Checkbox
                        onChange={(event) =>
                            handleUpdateItem(
                                event,
                                product.id,
                                event.target.checked
                            )
                        }
                        checked
                    />
                    <p>{product.text}</p>
                </div>
            ) : (
                <div className={styles.info}>
                    <Checkbox
                        onChange={(event) =>
                            handleUpdateItem(
                                event,
                                product.id,
                                event.target.checked
                            )
                        }
                    />
                    <p>{product.text}</p>
                </div>
            )}
            <button onClick={(event) => handleRemoveItem(event, product.id)}>
                del
            </button>
        </div>
    );
}