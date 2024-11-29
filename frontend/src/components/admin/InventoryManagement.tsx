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
import {
  addCoffee,
  removeCoffee,
  updateCoffee,
} from "../../reducers/coffeeReducer";
import { Coffee, NewCoffee } from "../../utils/types";
import AddCoffeeForm from "./AddCoffeeForm";
import EditCoffeeForm from "./EditCoffeeForm";

const InventoryManagement: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedCoffee, setSelectedCoffee] = useState<Coffee | null>(null);
  const coffees = useAppSelector((state) => state.coffees);
  const dispatch = useAppDispatch();

  const handleAddCoffee = (coffee: NewCoffee) => {
    dispatch(addCoffee(coffee));
    setOpen(false);
  };

  const handleRemoveCoffee = (id: string) => {
    dispatch(removeCoffee(id));
  };

  const handleEditClick = (coffee: Coffee) => {
    setSelectedCoffee(coffee);
    setEditOpen(true);
  };

  const handleEditCoffee = (coffeeData: Partial<Coffee>) => {
    if (selectedCoffee) {
      dispatch(updateCoffee(selectedCoffee.id, coffeeData));
      setEditOpen(false);
      setSelectedCoffee(null);
    }
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
              <TableCell>Type</TableCell>
              <TableCell>In Stock</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coffees.items.map((coffee) => (
              <TableRow key={coffee.id}>
                <TableCell>{coffee.name}</TableCell>
                <TableCell>{coffee.price}€</TableCell>
                <TableCell>{coffee.description}</TableCell>
                <TableCell>{coffee.type}</TableCell>
                <TableCell>{coffee.stock}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "red", fontWeight: "bold" }}
                    onClick={() => handleRemoveCoffee(coffee.id)}
                  >
                    Remove product
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ fontWeight: "bold" }}
                    onClick={() => handleEditClick(coffee)}
                  >
                    Edit product
                  </Button>
                </TableCell>
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
      {selectedCoffee && (
        <EditCoffeeForm
          open={editOpen}
          onClose={() => {
            setEditOpen(false);
            setSelectedCoffee(null);
          }}
          onSubmit={handleEditCoffee}
          coffee={selectedCoffee as Coffee}
        />
      )}
    </Box>
  );
};

export default InventoryManagement;
