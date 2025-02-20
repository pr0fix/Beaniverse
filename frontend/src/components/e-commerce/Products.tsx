import Grid from "@mui/material/Grid2";
import { useAppSelector } from "../../hooks/reduxHooks";
import ProductCard from "./ProductCard";
import { Box, Typography } from "@mui/material";

const Products = () => {
  const coffees = useAppSelector((state) => state.coffees);
  return (
    <Box className="mt-24">
      <Typography variant="h3" className="text-center text-text-primary">
        Our Coffee Selection
      </Typography>
      <Grid container spacing={3} className="justify-center m-8">
        {coffees.items.map((coffee, index) => (
          <Grid size={{ xl: 3 }} key={index}>
            <ProductCard key={coffee.id} coffee={coffee} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Products;
