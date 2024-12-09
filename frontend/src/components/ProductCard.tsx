import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { Coffee } from "../utils/types";

interface ProductCardProps {
  coffee: Coffee;
}

const ProductCard: React.FC<ProductCardProps> = ({ coffee }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        className="h-52 object-cover"
        image="https://placehold.co/250x150"
        alt="coffee.name"
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {coffee.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {coffee.price} €
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" className="text-primary-dark">
          Add to Cart
        </Button>
        <Button size="small" className="text-primary-dark">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
