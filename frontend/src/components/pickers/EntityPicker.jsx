// src/components/pickers/EntityPicker.jsx
import React, { useEffect, useState } from "react";
import { Select, Button, MenuItem, FormControl, InputLabel } from "@mui/material";

export default function EntityPicker({ 
  apiGet,      // function to fetch list
  apiAdd,      // function to add new item
  label,       // placeholder text
  value, 
  onChange 
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await apiGet();
      setItems(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = async () => {
    const name = prompt(`Enter ${label} name`);
    if (!name) return;
    try {
      const newItem = await apiAdd({ name });
      setItems([...items, newItem]);
      onChange(newItem.id); // auto select new item
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <FormControl sx={{ minWidth: 250 }}> {/* make select wider */}
        <InputLabel>{loading ? `Loading ${label}...` : label}</InputLabel>
        <Select
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          label={label}
        >
          <MenuItem value="">
            <em>{loading ? `Loading ${label}...` : `Select ${label}`}</em>
          </MenuItem>
          {items.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="outlined" onClick={handleAddNew}>
        Add {label}
      </Button>
    </div>
  );
}