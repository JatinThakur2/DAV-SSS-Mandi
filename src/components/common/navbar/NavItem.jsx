import React from "react";
import { Button, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

export function DesktopNavItem({
  label,
  path,
  isDropdown = false,
  isActive,
  hasActiveChildren,
  anchorEl,
  onOpen,

  children,
}) {
  return (
    <div>
      <Button
        onClick={isDropdown ? onOpen : undefined}
        color="inherit"
        component={isDropdown ? undefined : Link}
        to={isDropdown ? undefined : path}
        endIcon={
          isDropdown ? (
            Boolean(anchorEl) ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )
          ) : undefined
        }
        sx={{
          borderRadius: 2,
          color:
            isActive || hasActiveChildren ? "primary.main" : "text.primary",
          fontWeight: isActive || hasActiveChildren ? 600 : 500,
          position: "relative",
          "&::after":
            isActive || hasActiveChildren
              ? {
                  content: '""',
                  position: "absolute",
                  bottom: 0,
                  left: "20%",
                  width: "60%",
                  height: "3px",
                  backgroundColor: "primary.main",
                  borderRadius: "3px",
                }
              : {},
        }}
      >
        {label}
      </Button>
      {children}
    </div>
  );
}

export function MobileNavItem({
  label,
  path,
  isDropdown = false,
  isActive,
  isOpen = false,
  onToggle,
  onClick,
  children,
}) {
  return (
    <>
      <ListItem
        button
        component={isDropdown ? "div" : Link}
        to={isDropdown ? undefined : path}
        onClick={isDropdown ? onToggle : onClick}
        selected={isActive}
        sx={{
          borderRadius: 2,
          mb: 1,
          backgroundColor: isActive ? "rgba(255, 107, 0, 0.1)" : "transparent",
        }}
      >
        <ListItemText
          primary={label}
          primaryTypographyProps={{
            fontWeight: isActive ? 600 : 500,
            color: isActive ? "primary.main" : "inherit",
          }}
        />
        {isDropdown && (isOpen ? <ExpandLess /> : <ExpandMore />)}
      </ListItem>
      {children}
    </>
  );
}
