import { Typography, Button, Box } from "@mui/material";
import { Link } from "react-router";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CoffeeIcon from "@mui/icons-material/Coffee";

const Home = () => {
  return (
    <Box className="flex min-h-screen w-full overflow-hidden">
      <Box className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full px-4">
        <Box className="max-w-4xl mx-auto text-center space-y-8">
          <Typography
            variant="h1"
            className="font-bold text-5xl md:text-6xl lg:text-7xl text-primary-main"
          >
            Welcome to Beaniverse
          </Typography>
          <Typography
            variant="h4"
            className="font-light italic text-secondary-dark"
          >
            Discover Premium Coffee Beans from Around the World
          </Typography>
          <Typography className="max-w-2xl mx-auto text-lg text-primary-dark">
            From single-origin treasures to artisanal blends, explore our
            carefully curated selection of premium coffee beans.
          </Typography>
        </Box>
        <Box className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button
            component={Link}
            to="/products"
            variant="contained"
            size="large"
            startIcon={<ShoppingCartIcon />}
            className="bg-primary-main"
          >
            Shop Now
          </Button>
          <Button
            component={Link}
            to="/about"
            variant="outlined"
            size="large"
            startIcon={<CoffeeIcon />}
            className="bg-secondary-light border-transparent text-text-primary"
          >
            Our Story
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
