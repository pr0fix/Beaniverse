import { AppBar, Box, Button, IconButton, Toolbar } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router";
import { useAppSelector } from "../../hooks/reduxHooks";

const Navbar = ({ handleSignOut }: { handleSignOut: () => void }) => {
  const user = useAppSelector((state) => state.user);
  const userRole = user.role;

  return (
    <AppBar position="absolute" elevation={0} className="bg-primary-light p-3">
      <Toolbar className="flex items-center justify-between">
        <Box className="flex items-center gap-4">
          <Box className="flex gap-8">
            <Button
              component={Link}
              to="/"
              className="text-text-primary text-base font-semibold bg-transparent"
              disableRipple
            >
              Home
            </Button>
            <Button
              component={Link}
              to="/products"
              className="text-text-primary text-base font-semibold bg-transparent"
              disableRipple
            >
              Products
            </Button>
            <Button
              component={Link}
              to="/about"
              className="text-text-primary text-base font-semibold bg-transparent"
              disableRipple
            >
              About
            </Button>
          </Box>
        </Box>

        <Box className="flex items-center gap-2">
          {user.isAuthenticated ? (
            <>
              {userRole === "admin" && (
                <Button
                  component={Link}
                  to="/admin"
                  variant="contained"
                  className="text-text-primary text-base font-semibold bg-transparent"
                  disableRipple
                >
                  Admin Dashboard
                </Button>
              )}
              <Button
                onClick={handleSignOut}
                variant="contained"
                className="text-text-light text-base font-semibold bg-red-900"
                disableRipple
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Button
              component={Link}
              to="/login"
              className="text-text-primary text-base font-medium bg-transparent"
              disableRipple
            >
              Sign In
            </Button>
          )}
          <IconButton
            component={Link}
            to="/cart"
            className="text-text-primary"
            disableRipple
          >
            <ShoppingCartIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
