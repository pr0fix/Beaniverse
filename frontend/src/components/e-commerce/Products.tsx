import Grid from "@mui/material/Grid2";
import { useAppSelector } from "../../hooks/reduxHooks";
import ProductCard from "./ProductCard";
import { Typography } from "@mui/material";

const Products = () => {
  const coffees = useAppSelector((state) => state.coffees);
  return (
    <div className="mt-24">
      <Typography
        variant="h3"
        className="text-center text-white drop-shadow-lg"
      >
        Our Coffee Selection
      </Typography>
      <Grid container spacing={3} className="justify-center m-8">
        {coffees.items.map((coffee, index) => (
          <Grid size={{ xl: 3 }} key={index}>
            <ProductCard key={coffee.id} coffee={coffee} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Products;
