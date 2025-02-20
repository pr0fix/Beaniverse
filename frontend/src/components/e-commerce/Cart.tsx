import { Box, Divider, Typography } from "@mui/material";

const Cart = () => {
  return (
    <Box className="flex justify-center w-full mt-20 flex-col">
      <Typography variant="h1" className="text-text-primary mb-10">
        My Cart
      </Typography>
      <Divider orientation="vertical" sx={{ p: 2 }} />
    </Box>
  );
};

export default Cart;
