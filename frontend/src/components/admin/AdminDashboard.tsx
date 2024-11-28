import { Box, Button, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import InventoryManagement from "./InventoryManagement";
import { useNavigate } from "react-router";
// import OrderManagement from "./OrderManagement";
// import UserManagement from "./UserManagement";

const AdminDashboard: React.FC = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Tabs value={value} onChange={(_e, newValue) => setValue(newValue)}>
          <Tab label="Stock Management" />
          <Tab label="Orders" />
          <Tab label="Users" />
        </Tabs>{" "}
        <Button
          sx={{ marginLeft: "auto" }}
          variant="contained"
          onClick={() => navigate("/")}
        >
          Back to Beaniverse
        </Button>
      </Box>
      <Box>
        {value === 0 && <InventoryManagement />}
        {/* {value === 1 && <OrderManagement />}
        {value === 2 && <UserManagement />} */}
      </Box>
    </Box>
  );
};

export default AdminDashboard;
