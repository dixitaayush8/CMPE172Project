import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";

class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: this.props.id || "",
      first_name: "",
      last_name: "",
      emp_no: this.props.id || "",
      birth_date: "",
      gender: "",
      hire_date: "",
      salary: "",
      position: "",
      from_date: "",
      to_date: ""
    };

    if (this.state.emp_no !== "") {
      this.getEmployee();
    }
  }

  _changePosition = e => {
    this.setState({
      position: e.target.value
    });
  };
  _handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  getEmployee = async () => {
    const id = {
      emp_no: this.state.search

    };
    const url = new URL("http://localhost:3000/api/employee");
    url.search = new URLSearchParams(id);
    const response = await fetch(url);
    console.log(response)
    const body = await response.json();
    this.setState({
      emp_no: body.result[0].emp_no,
      first_name: body.result[0].first_name,
      last_name: body.result[0].last_name,
      birth_date: body.result[0].birth_date.substring(0, 10),
      hire_date: body.result[0].hire_date.substring(0, 10),
      gender: body.result[0].gender,
      salary: body.result[0].salary,
      from_date: body.result[0].from_date.substring(0, 10),
      to_date: body.result[0].to_date.substring(0, 10)
    });
  };
  //update employee's salary
  saveEmployee = async () => {
    const salary = {
      emp_no: this.state.emp_no,
      salary: this.state.salary,
      from_date: this.state.from_date
    };
    const url = new URL("http://localhost:3000/api/newsalary");
    url.search = new URLSearchParams(salary);
    await fetch(url);
  };

  renderUserProfile() {
    if (this.state.emp_no !== "") {
      const { classes } = this.props;
      return (
      <div>
                      <form>
 <label for="disabled">First Name: </label>
 <input name="disabled" value={this.state.first_name} disabled/>
 </form>

                      <form>
 <label for="disabled">Last Name: </label>
 <input name="disabled" value={this.state.last_name} disabled/>
 </form>
                      <form>
 <label for="disabled">Employee Number: </label>
 <input name="disabled" value={this.state.emp_no} disabled/>
 </form>
                      <form>
 <label for="disabled">Birthday: </label>
 <input name="disabled" value={this.state.birth_date} disabled/>
 </form>

 <form>
 <label for="disabled">Gender: </label>
 <input name="disabled" value={this.state.gender} disabled/>
 </form>
                      <form>
 <label for="disabled">Hiring Date: </label>
 <input name="disabled" value={this.state.hire_date} disabled/>
 </form>


                      <form>
 <label for="editable">Salary</label>
 <input name="editable" value={ this.state.salary } onChange={text =>
                          this.setState({ salary: text.target.value })
                        }/>
 </form>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.saveButton}
                    onClick={() => {
                      this.saveEmployee();
                    }}
                  >
                    Save
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.salaryButton}
                    component={Link}
                    to={"/history/" + this.state.emp_no}
                  >
                    Salary History
                  </Button>
                  </div>
      );
    }
  }

  renderSearchBar() {
    const { classes } = this.props;
    return (
    <div>
      <Grid item>

        <Grid container>

          <Grid item>
            <Paper>
              <Grid
                className={classes.searchcontainer}
                spacing={8}
                direction="column"
              >
                <Grid item>
                  <Grid
                    container
                    className={classes.searchInput}
                    direction="row"
                  >
                    <Grid item xs={9}>
                      <Grid container>
                        <TextField
                          variant="outlined"
                          onChange={text =>
                            this.setState({ search: text.target.value })
                          }
                          defaultValue={this.state.emp_no}
                          label="Employee Id"
                          fullWidth
                          style={{
                            paddingRight: 10
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid item xs={2} className={classes.searchButtonContainer}>
                      <Button
                        className={classes.searchButton}
                        onClick={() => {
                          this.getEmployee();
                        }}
                      >
                        Search
                      </Button>
                    </Grid>
                  </Grid>

                </Grid>

              </Grid>
            </Paper>

          </Grid>
        </Grid>
      </Grid>
      <Button
        className={classes.searchButton}
        component={Link}
        to={"/departmentinfo"}
      >
        Department Analytics
      </Button>
      <Button
        className={classes.searchButton}
        component={Link}
        to={"/positioninfo"}
      >
        Position Analytics
      </Button>

      </div>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        className={classes.root}
        spacing={1}
        direction="column"
        justify="flex-start"
        alignItems="center"
      >
        {this.renderSearchBar()}
        {this.renderUserProfile()}
      </Grid>
    );
  }
}

const styles = {
  root: {
    flexGrow: 1,
    padding: 15
  },
  paper: {
    padding: 30
  },
  divider: {
    width: "100%",
    marginTop: 10
  },
  saveButton: {
    backgroundColor: "primary",
    height: "47px",
    color: "#ffffff",
    width: "100%",
    minWidth: "30px",
    marginTop: 20
  },
  salaryButton: {
    backgroundColor: "primary",
    height: "47px",
    color: "#ffffff",
    width: "100%",
    minWidth: "30px",
    marginTop: 10
  },
  Headings: {
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: "typeface-roboto"
  },
  margin: {
    margin: 10
  },
  textField: {
    flexBasis: 200
  },
  searchInput: {},
  searchcontainer: {
    marginTop: 100,
    marginBottom: 100,
    padding: 15
  },
  searchButton: {
    searchButton: {
      backgroundColor: "primary",
      height: "47px",
      color: "#ffffff",
      width: "100%",
      minWidth: "30px",
      marginTop: 10
    }
  },
  searchButtonContainer: {
    flexWrap: "wrap",
    display: "flex"
  },
  label: {
    fontSize: 16,
    fontFamily: "typeface-roboto"
  }
};

// const positions = [
//   {
//     value: "Accountant",
//     label: "Accountant"
//   },
//   {
//     value: "Janitor",
//     label: "Janitor"
//   },
//   {
//     value: "Manager",
//     label: "Manager"
//   },
//   {
//     value: "Lead",
//     label: "Lead"
//   },
//   {
//     value: "Intern",
//     label: "Intern"
//   },
//   {
//     value: "Supervisor",
//     label: "Supervisor"
//   }
// ];

export default withStyles(styles)(Employee);
