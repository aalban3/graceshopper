import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { cartLogout } from "../store/cart";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import AccountButton from "./AccountButton";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: theme.spacing(1),
  },
  title: {
    flexGrow: 2,
  },
}));

export function ButtonAppBar({
  handleClick,
  isLoggedIn,
  clearState,
  isAdmin,
  username,
  cart,
}) {
  const classes = useStyles();
  const numItems = !cart.length
    ? 0
    : cart.reduce((acc, item) => acc + item.order_vehicle.quantity, 0);
  // ADMIN NAVBAR
  if (isLoggedIn && isAdmin) {
    return (
      <div className={classes.root}>
        <AppBar position="static" className="nav-color">
          <Toolbar>
            <Typography
              variant="h6"
              className={classes.title}
              component={Link}
              to="/home"
            >
              <a href="https://fontmeme.com/grand-theft-auto-font/">
                <img
                  src="https://fontmeme.com/permalink/210425/a657feadb66de7b6e16711eb5482c28a.png"
                  alt="grand-theft-auto-font"
                  border="0"
                  className="ghm-logo"
                />
              </a>
            </Typography>

            <Button color="inherit" component={Link} to="/manage_users">
              Users
            </Button>
            <Button color="inherit" component={Link} to="/manage_vehicles">
              Vehicles
            </Button>

            <Button
              color="inherit"
              onClick={() => {
                handleClick();
              }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
  // USER NAVBAR
  if (isLoggedIn) {
    return (
      <div className={classes.root}>
        <AppBar position="static" className="nav-color">
          <Toolbar>
            <Typography
              variant="h6"
              className={classes.title}
              component={Link}
              to="/home"
            >
              <a href="https://fontmeme.com/grand-theft-auto-font/">
                <img
                  src="https://fontmeme.com/permalink/210425/a657feadb66de7b6e16711eb5482c28a.png"
                  alt="grand-theft-auto-font"
                  border="0"
                  className="ghm-logo"
                />
              </a>
            </Typography>

            <Button color="inherit" component={Link} to="/vehicles">
              All Vehicles
            </Button>

            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              component={Link}
              to="/cart"
            >
              <Badge color="secondary" badgeContent={numItems}>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <div>
              <AccountButton
                handleClick={handleClick}
                clearState={clearState}
                username={username}
              />
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <AppBar position="static" className="nav-color">
        <Toolbar>
          <Typography
            variant="h6"
            className={classes.title}
            component={Link}
            to="/home"
          >
            <a href="https://fontmeme.com/grand-theft-auto-font/">
              <img
                src="https://fontmeme.com/permalink/210425/a657feadb66de7b6e16711eb5482c28a.png"
                alt="grand-theft-auto-font"
                border="0"
                className="ghm-logo"
              />
            </a>
          </Typography>

          <Button color="inherit" component={Link} to="/vehicles">
            All Vehicles
          </Button>

          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>

          <Button color="inherit" component={Link} to="/signup">
            Sign Up
          </Button>

          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            component={Link}
            to="/cart"
          >
            <ShoppingCartIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.isAdmin,
    username: state.auth.username,
    cart: state.cart,
  };
};
const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
    clearState() {
      dispatch(cartLogout());
    },
  };
};

export default connect(mapState, mapDispatch)(ButtonAppBar);
