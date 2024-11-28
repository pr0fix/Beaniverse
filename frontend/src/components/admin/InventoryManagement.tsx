import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useAppSelector } from "../../hooks/reduxHooks";

const InventoryManagement = () => {
  const coffees = useAppSelector((state) => state.coffees);

  return (
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
  );
};

export default InventoryManagement;
