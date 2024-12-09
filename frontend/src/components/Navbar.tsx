import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CoffeeIcon from "@mui/icons-material/Coffee";
import { Link } from "react-router";
import { useAppSelector } from "../hooks/reduxHooks";

const Navbar = ({ handleSignOut }: { handleSignOut: () => void }) => {
  const user = useAppSelector((state) => state.user);
  const isAdmin = user.role;

  return (
    <AppBar position="sticky" elevation={0} className="bg-primary-main">
      <Toolbar className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CoffeeIcon />
          <Typography
            variant="h6"
            component={Link}
            to="/"
            className="text-white no-underline"
          >
            Beaniverse
          </Typography>
        </div>

        <div className="flex items-center gap-2">
          {user.isAuthenticated ? (
            <>
              {isAdmin && (
                <Button
                  component={Link}
                  to="/admin"
                  variant="outlined"
                  className="text-white border-white"
                >
                  Admin Dashboard
                </Button>
              )}
              <Button
                onClick={handleSignOut}
                variant="contained"
                className="text-white bg-red-900"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Button component={Link} to="/login" className="text-white">
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
