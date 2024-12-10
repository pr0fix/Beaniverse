import { Button, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import InventoryManagement from "./InventoryManagement";
import { useNavigate } from "react-router";
// import OrderManagement from "./OrderManagement";
// import UserManagement from "./UserManagement";

const AdminDashboard: React.FC = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  return (
    <div className="pt-16">
      <div className="flex justify-between items-center">
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
          <Tab label="Orders" />
          <Tab label="Users" />
        </Tabs>
        <Button
          className="mr-4 text-white font-extrabold bg-red-900"
          onClick={() => navigate("/")}
        >
          exit dashboard
        </Button>
      </div>

      <div>
        {value === 0 && <InventoryManagement />}
        {/* {value === 1 && <OrderManagement />}
        {value === 2 && <UserManagement />} */}
      </div>
    </div>
  );
};

export default AdminDashboard;
