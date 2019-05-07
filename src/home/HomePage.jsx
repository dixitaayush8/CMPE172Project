import React, { Component } from "react";
import Employee from "../employees/Employee";
import { withStyles } from "@material-ui/core/styles";
import { withAuth } from "@okta/okta-react";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";

const styles = {
  button: {
    marginTop: 10 
  },
  landingPage: {
    marginTop: '10%',

  }
};

class Home extends Component {
  state = { authenticated: null };

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

  login = async () => {
    this.props.auth.login("/");
  };

  render() {
    const { classes } = this.props;
    // This block is to show login landing page if not authenticated
    // and a the employee search bar if user IS authenticated
    if (this.state.authenticated === null) return null;

    const isAuthenticated = this.state.authenticated ? (
      <div>
        <Employee id={this.props.id}/>
        <List>
        <ListItem button component="a" href="github" target="_blank">
                <ListItemText primary="GitHub" />
                <Link to="/github">
                <p>Github</p>
                </Link>
              </ListItem>
              <ListItem button component="a" href="facebook" target="_blank">
                <ListItemText primary="Facebook" />
                <Link to="/facebook">
                <p>Facebook</p>
                </Link>
              </ListItem>
              </List>
      </div>
    ) : (
      <div>
        <Grid container>
          <Grid item lg={12} className={classes.landingPage}>
            <Typography variant="h1" align = 'center'>JAIC</Typography>
            <Button 
              variant="contained" 
              size="large"
              style={{marginLeft:700}}
              className={classes.button}
              onClick={this.login}>
              <Typography >Login</Typography>
            </Button>
          </Grid>
        </Grid>
        
      </div>
    );

    // return the result of the if statement
    return (
      <div>
      {isAuthenticated}
      </div>
    );
    
  }
} export default withAuth(
    withStyles(styles)(Home)
    )
