import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import "typeface-roboto";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const styles = theme => ({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 500
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  },
  goBack: {
    backgroundColor: "primary",
    height: "47px",
    color: "#ffffff",
    width: "100%",
    minWidth: "30px"
  }
});

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

export class HistoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: []
    };
  }

  componentDidMount() {
    this.getTable();
  }

  getTable = async () => {
    const id = {
      emp_no: this.props.id
    };
    const url = new URL("http://localhost:3000/api/employeeTable");
    url.search = new URLSearchParams(id);
    console.log(url)
    const response = await fetch(url);
    const rows = await response.json();
    this.setState({ rows: rows.result });
  };

  renderTable() {
    if (this.state.rows !== []) {
      console.log(this.state.rows);
      const { classes } = this.props;
      return this.state.rows.map(row => {
        return (
        <div>
        <p>---------------------</p> 
          <TableRow className={classes.row} key={row.emp_no}>
            <p>
              <b>Salary: </b>${row.salary}
            </p>
            <p><b>From: </b>{row.from_date.substring(0, 10)}</p>
            {row.to_date.substring(0,4) != "9999" && <p><b>To: </b>{row.to_date.substring(0, 10)}</p>
            }
          </TableRow>
          </div>
        );
      });
    }
  }

  render() {
    const { classes } = this.props;
    return (
    <html>
    <body>
  <div class="form">
                  <TableBody>{this.renderTable()}</TableBody>
                  </div>
                  </body>
                  </html>
                
    );
  }
}

export default withStyles(styles)(HistoryPage);
