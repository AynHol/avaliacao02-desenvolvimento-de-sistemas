"use client";
import { TextField } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import styles from "./styles.module.css";
import Product from "@/components/product";
import axios from "axios";
import { v4 as uuid } from "uuid";

type product = {
  id: string;
  text: string;
  checked: boolean;
};

export default function MarketList() {
  const [product, setProduct] = useState<product[]>([]);
  const [text, setText] = useState<string>("");

  useEffect(() => {
    loadItens();
  }, []);

  async function loadItens() {
    const response = await axios.get("http://localhost:3001/itens");
    setProduct(response.data);
  }

  async function handleAddItem(event: FormEvent) {
    event.preventDefault();
    const product = {
      id: uuid(),
      text: text,
      checked: false,
    };
    await axios.post("http://localhost:3001/itens", product);
    await loadItens();
    setText("");
  }

  async function handleRemoveItem(event: MouseEvent, id: string) {
    event.preventDefault();
    const productMap = product.map((product) => product.id !== id);
    await axios.patch(`http://localhost:3001/itens/${id}`, {
      product: productMap,
    });
    await loadItens();
  }

  async function handleUpdateItem(event: MouseEvent, id: string, boolean: boolean) {
    event.preventDefault();
    await axios.patch(`http://localhost:3001/itens/${id}`, {
      checked: boolean,
    });
    await loadItens();
  }

  return (
    <div className={styles.container}>
      <h1>Lista de Compras</h1>
      <div className={styles.add}>
        <TextField
          label="Item"
          variant="outlined"
          color="info"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <button onClick={handleAddItem}>+</button>
      </div>
      {product.map((item) => (
        <Product product={item} key={item.id} id={item.id} handleRemoveItem={handleRemoveItem} handleUpdateItem={handleUpdateItem} />
      ))}
    </div>
  );
}