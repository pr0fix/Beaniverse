import React, { useState } from "react";
import {
  Button,
  Paper,
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
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedCoffee, setSelectedCoffee] = useState<Coffee | null>(null);
  const coffees = useAppSelector((state) => state.coffees);
  const dispatch = useAppDispatch();

  const handleAddCoffee = (coffee: NewCoffee) => {
    if (window.confirm(`Are you sure you want to add ${coffee.name}?`)) {
      dispatch(addCoffee(coffee));
      setAddOpen(false);
    }
  };

  const handleRemoveCoffee = (id: string) => {
    if (window.confirm(`Are you sure you want to remove this coffee?`)) {
      dispatch(removeCoffee(id));
    }
  };

  const handleEditClick = (coffee: Coffee) => {
    setSelectedCoffee(coffee);
    setEditOpen(true);
  };

  const handleEditCoffee = (coffeeData: Partial<Coffee>) => {
    if (selectedCoffee) {
      if (window.confirm(`Are you sure you want to edit ${coffeeData.name}?`)) {
        dispatch(updateCoffee(selectedCoffee.id, coffeeData));
        setEditOpen(false);
        setSelectedCoffee(null);
      }
    }
  };

  return (
    <div className="m-8 p-3 bg-neutral-100 rounded-md">
      <Button
        variant="contained"
        className="bg-primary-main mb-4"
        onClick={() => setAddOpen(true)}
      >
        Add Product
      </Button>
      <TableContainer component={Paper} style={{ height: "600px", overflowY:"auto"}}>
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
                    className="bg-primary-main mr-2"
                    onClick={() => handleEditClick(coffee)}
                  >
                    Edit product
                  </Button>

                  <Button
                    variant="contained"
                    className="bg-red-900"
                    onClick={() => handleRemoveCoffee(coffee.id)}
                  >
                    Remove product
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddCoffeeForm
        open={addOpen}
        onClose={() => setAddOpen(false)}
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
    </div>
  );
};

export default InventoryManagement;
