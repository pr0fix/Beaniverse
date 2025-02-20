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
    <Card className="shadow-lg">
      <CardMedia
        component="img"
        className="h-52 object-cover"
        image="https://placehold.co/250x150"
        alt={coffee.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {coffee.name}
        </Typography>
        <Typography variant="body2">{coffee.price} €</Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          className="text-text-light bg-secondary-main hover:bg-secondary-dark px-4 py-1 rounded-md"
        >
          Add to Cart
        </Button>
        <Button
          size="small"
          className=" text-primary-main hover:bg-[#6F4E37] hover:text-white px-4 py-1 rounded-md"
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
