import Grid from "@mui/material/Grid2";
import { useAppSelector } from "../hooks/reduxHooks";
import ProductCard from "./ProductCard";

const Products: React.FC = () => {
  const coffees = useAppSelector((state) => state.coffees);
  return (
    <Grid container spacing={3} className="justify-center m-8">
      {coffees.items.map((coffee, index) => (
        <Grid size={{ xl: 3 }} key={index}>
          <ProductCard key={coffee.id} coffee={coffee} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Products;
