import React from "react";
import { Menu, MenuItem, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

function DropdownMenu({ anchorKey, anchorEl, open, onClose, items = [] }) {
  const location = useLocation();

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      MenuListProps={{
        "aria-labelledby": `${anchorKey}-button`,
      }}
      PaperProps={{
        elevation: 3,
        sx: {
          mt: 1.5,
          borderRadius: 2,
          minWidth: 180,
        },
      }}
    >
      {items.map((item) => (
        <MenuItem
          key={item.label}
          onClick={onClose}
          component={Link}
          to={item.path}
          selected={location.pathname === item.path}
          sx={{
            borderRadius: 1,
            my: 0.5,
            mx: 1,
            px: 2,
          }}
        >
          <Typography variant="body2">{item.label}</Typography>
        </MenuItem>
      ))}
    </Menu>
  );
}

export default DropdownMenu;
