import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Coffee } from "../../utils/types";

interface ProductCardProps {
  coffee: Coffee;
}

const ProductCard = ({ coffee }: ProductCardProps) => {
  return (
    <Card className="bg-[#F5E6D3] shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg border border-[#8B4513]/20">
      <CardMedia
        component="img"
        className="h-52 object-cover"
        image="https://placehold.co/250x150"
        alt={coffee.name}
      />
      <CardContent className="bg-[#F5E6D3]">
        <Typography
          gutterBottom
          variant="h5"
          className="text-[#4A2C2A] font-semibold"
        >
          {coffee.name}
        </Typography>
        <Typography variant="body2" className="text-[#6F4E37]">
          {coffee.price} €
        </Typography>
      </CardContent>
      <CardActions className="bg-[#F5E6D3]">
        <Button
          size="small"
          className="bg-[#6F4E37] text-white hover:bg-[#8B4513] px-4 py-1 rounded-md"
        >
          Add to Cart
        </Button>
        <Button
          size="small"
          className="border border-[#6F4E37] text-[#6F4E37] hover:bg-[#6F4E37] hover:text-white px-4 py-1 rounded-md"
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
