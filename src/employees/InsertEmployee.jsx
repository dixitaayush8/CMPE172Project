import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";

class InsertEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      emp_no: "",
      birth_date: "",
      gender: "",
      hire_date: "",
      salary: "",
      to_date: "",
    };
  }

    getEmployee = async() => {
      const employeedata = {
        emp_no: this.state.emp_no,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        birth_date: this.state.birth_date,
        gender: this.state.gender,
        hire_date: this.state.hire_date,
      };
      const url = new URL("http://localhost:3000/api/new_employee");
      url.search = new URLSearchParams(employeedata);
      await fetch(url);
      const employeedata_two = {
        emp_no: this.state.emp_no,
        salary: this.state.salary,
        to_date: this.state.to_date,
      };
      const url_two = new URL("http://localhost:3000/api/insert_salary");
      url_two.search = new URLSearchParams(employeedata_two);
      await fetch(url_two);
    };

    render() {
      const { classes } = this.props;
      return (
        <div>
      <form>
<label for="editable">Employee Number: </label>
<input name="editable" value={ this.state.emp_no } onChange={text =>
          this.setState({ emp_no: text.target.value })
        }/>
        </form>
        <form>
<label for="editable">First Name: </label>
<input name="editable" value={ this.state.first_name } onChange={text =>
            this.setState({ first_name: text.target.value })
          }/>
          </form>
          <form>
<label for="editable">Last Name: </label>
<input name="editable" value={ this.state.last_name } onChange={text =>
              this.setState({ last_name: text.target.value })
            }/>
            </form>
            <form>
<label for="editable">Birthday (YYYY-MM-DD): </label>
<input name="editable" value={ this.state.birth_date } onChange={text =>
                this.setState({ birth_date: text.target.value })
              }/>
              </form>
              <form>
<label for="editable">Gender (M or F): </label>
<input name="editable" value={ this.state.gender } onChange={text =>
                  this.setState({ gender: text.target.value })
                }/>
                </form>
                <form>
<label for="editable">Hire Date (YYYY-MM-DD): </label>
<input name="editable" value={ this.state.hire_date } onChange={text =>
                    this.setState({ hire_date: text.target.value })
                  }/>
                  </form>
                  <form>
<label for="editable">Salary: </label>
<input name="editable" value={ this.state.salary } onChange={text =>
                      this.setState({ salary: text.target.value })
                    }/>
                    </form>
                    <form>
<label for="editable">Proposed Salary End Date (YYYY-MM-DD): </label>
<input name="editable" value={ this.state.to_date } onChange={text =>
                        this.setState({ to_date: text.target.value })
                      }/>
                      </form>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.searchButton}
                        onClick={() => {
                          this.getEmployee();
                        }}>
                        Insert Employee
                      </Button>
                      </div>
                    );
    }
  }





const styles = {
  div: {
    marginLeft: 500
  },
    searchButton: {
      backgroundColor: "primary",
      height: "47px",
      color: "#ffffff",
      width: "10%",
      minWidth: "30px",
      marginLeft:500
  }
};

export default withStyles(styles)(InsertEmployee);
