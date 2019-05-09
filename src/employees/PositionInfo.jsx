import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import "typeface-roboto";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";

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

export class PositionInfo extends Component {
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
      const url = new URL("http://localhost:3000/api/positioninfo");
      const response = await fetch(url);
      const rows = await response.json();
      this.setState({ rows: rows.result });
}

renderTable() {
  if (this.state.rows !== []) {
    console.log(this.state.rows);
    const { classes } = this.props;
    return this.state.rows.map(row => {
      return (
      <div>
      <p>---------------------</p>
      <TableRow className={classes.row} key={row.title}>
          <p>
            <b>Job Title: </b>{row.title}
          </p>
          <p><b>Count: </b>{row.count}</p>
          <p><b>Average Salary: </b>{row.average}</p>
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
export default withStyles(styles)(PositionInfo);
