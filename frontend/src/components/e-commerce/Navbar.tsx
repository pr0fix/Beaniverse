import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CoffeeIcon from "@mui/icons-material/Coffee";
import { Link } from "react-router";
import { useAppSelector } from "../../hooks/reduxHooks";

const Navbar = ({ handleSignOut }: { handleSignOut: () => void }) => {
  const user = useAppSelector((state) => state.user);
  const isAdmin = user.role;

  return (
    <AppBar
      position="fixed"
      elevation={0}
      className="bg-black/20 backdrop-blur-sm z-50"
    >
      <Toolbar className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <CoffeeIcon />
          <Typography
            variant="h5"
            component={Link}
            to="/"
            className="text-white no-underline"
          >
            Beaniverse
          </Typography>
          <div className="flex gap-4">
            <Button
              component={Link}
              to="/"
              className="text-white border-white pt-2 font-medium bg-transparent"
              disableRipple
            >
              Home
            </Button>
            <Button
              component={Link}
              to="/products"
              className="text-white border-white pt-2 font-medium bg-transparent"
              disableRipple
            >
              Products
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {user.isAuthenticated ? (
            <>
              {isAdmin && (
                <Button
                  component={Link}
                  to="/admin"
                  variant="outlined"
                  className="text-white border-white bg-transparent"
                  disableRipple
                >
                  Admin Dashboard
                </Button>
              )}
              <Button
                onClick={handleSignOut}
                variant="contained"
                className="text-white bg-red-900"
                disableRipple
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Button component={Link} to="/login" className="text-white bg-transparent" disableRipple>
              Sign In
            </Button>
          )}
          <IconButton component={Link} to="/cart" className="text-white">
            <ShoppingCartIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
