import { Typography, Button } from "@mui/material";
import { Link } from "react-router";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CoffeeIcon from "@mui/icons-material/Coffee";
import background from "../../assets/homepage.jpg";

const Home = () => {
  return (
    <div className="flex min-h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${background})` }}
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Typography
            variant="h1"
            className="text-white font-bold text-5xl md:text-6xl lg:text-7xl"
          >
            Welcome to Beaniverse
          </Typography>
          <Typography variant="h4" className="text-amber-200 font-light italic">
            Discover Premium Coffee Beans from Around the World
          </Typography>
          <Typography
            variant="subtitle1"
            className="text-gray-200 max-w-2xl mx-auto text-lg"
          >
            From single-origin treasures to artisanal blends, explore our
            carefully curated selection of premium coffee beans.
          </Typography>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button
            component={Link}
            to="/products"
            variant="contained"
            size="large"
            startIcon={<ShoppingCartIcon />}
            className="bg-amber-800 hover:bg-amber-900 text-white px-8 py-3 text-lg"
          >
            Shop Now
          </Button>
          <Button
            component={Link}
            to="/about"
            variant="outlined"
            size="large"
            startIcon={<CoffeeIcon />}
            className="border-2 border-amber-200 text-amber-200 hover:bg-amber-200/10 px-8 py-3 text-lg"
          >
            Our Story
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
