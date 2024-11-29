import React, { useState } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { addCoffee } from "../../reducers/coffeeReducer";
import { NewCoffee } from "../../utils/types";
import AddCoffeeForm from "./AddCoffeeForm";

const InventoryManagement: React.FC = () => {
  const [open, setOpen] = useState(false);
  const coffees = useAppSelector((state) => state.coffees);
  const dispatch = useAppDispatch();

  const handleAddCoffee = (coffee: NewCoffee) => {
    dispatch(addCoffee(coffee));
    setOpen(false);
  };

  return (
    <Box>
      <TableContainer
        style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>In Stock</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coffees.items.map((coffee) => (
              <TableRow key={coffee.id}>
                <TableCell>{coffee.name}</TableCell>
                <TableCell>{coffee.price}€</TableCell>
                <TableCell>{coffee.description}</TableCell>
                <TableCell>{coffee.category}</TableCell>
                <TableCell>{coffee.stock}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button variant="contained" onClick={() => setOpen(true)}>
        Add Product
      </Button>

      <AddCoffeeForm
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleAddCoffee}
      />
    </Box>
  );
};

export default InventoryManagement;
