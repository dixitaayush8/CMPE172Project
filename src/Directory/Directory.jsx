import AppBar from "@material-ui/core/AppBar";
import React, { Component } from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { withAuth } from "@okta/okta-react";
const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  list: {
    width: 250
  }
};
export default withStyles(styles)(
  withAuth(
    class NavBar extends Component {
      state = { authenticated: null, openMenu: false };

      checkAuthentication = async () => {
        const authenticated = await this.props.auth.isAuthenticated();
        if (authenticated !== this.state.authenticated) {
          this.setState({ authenticated });
        }
      };

      async componentDidMount() {
        this.checkAuthentication();
      }

      async componentDidUpdate() {
        this.checkAuthentication();
      }

      logout = async () => {
        this.props.auth.logout("/");
      };

      handleClick = event => {
        this.setState({ openMenu: true });
      };

      toggleDrawer = open => () => {
        this.setState({
          openMenu: open
        });
      };

      handleClose = () => {
        this.setState({ openMenu: null });
      };

      render() {
        const { classes } = this.props;

        
        if (this.state.authenticated === null) return null;
        const logOut = this.state.authenticated ? (
          <div>
            <Button color="inherit" onClick={this.logout}>
              Logout
            </Button>
          </div>
        ) : (
          <div />
        );

        return (
          <div className={classes.root}>
            <AppBar position="static">
              <Toolbar>
                <Button color="inherit" href="/">
                  Home
                </Button>
                <Typography
                  variant="h6"
                  color="inherit"
                  align="center"
                  className={classes.grow}
                >
                  Payroll
                </Typography>
                {logOut}
              </Toolbar>
            </AppBar>
          </div>
        );
      }
    }
  )
);
