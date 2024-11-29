import { Box, Card, CardContent, Grid2, Typography } from "@mui/material";
import { useAppSelector } from "../hooks/reduxHooks";

const Home: React.FC = () => {
  const coffees = useAppSelector((state) => state.coffees);
  return (
    <Box sx={{ p: 3 }}>
      <Grid2 container spacing={3} sx={{display:"flex", flexDirection:"column", justifyContent:"space-around"}}>
        {coffees.items.map((coffee) => (
          <Card key={coffee.id}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {coffee.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {coffee.description}
              </Typography>
              <Typography variant="h6" sx={{ mt: 2 }}>
                €{coffee.price}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Stock: {coffee.stock}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Grid2>
    </Box>
  );
};

export default Home;
