import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import InventoryManagement from "./InventoryManagement";
import UserManagement from "./UserManagement";

const AdminDashboard = () => {
  const [value, setValue] = useState(0);
  return (
    <Box className="pt-16">
      <Box className="flex justify-between items-center">
        <Tabs
          TabIndicatorProps={{
            style: { background: "#6F4E37" },
          }}
          sx={{
            "& .Mui-selected": {
              color: "#6F3E37 !important",
            },
          }}
          value={value}
          onChange={(_e, newValue) => setValue(newValue)}
        >
          <Tab label="Stock Management" />
          <Tab label="Users" />
          <Tab label="Orders" />
        </Tabs>
      </Box>

      <Box>
        {value === 0 && <InventoryManagement />}
        {value === 1 && <UserManagement />}
      </Box>
    </Box>
  );
};

export default AdminDashboard;
