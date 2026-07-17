import { useState } from "react";
import { getInventory } from "./inventoryService";

export default function useInventory() {
  const [inventory, setInventory] = useState([]);

  const loadInventory = async () => {
    const res = await getInventory();
    setInventory(res.data);
  };

  return { inventory, setInventory, loadInventory };
}