import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import {
  AppBar,
  Button,
  Select,
  InputLabel,
} from "@material-ui/core";
import { Component } from "react";

// Component that holds the basic UI elements
class BaseComponent extends Component {
  constructor(props) {
    super(props);
    this.onSubmitClick = this.onSubmitClick.bind(this);
    this.onClearClick = this.onClearClick.bind(this);
    this.onChangeListener = this.onChangeListener.bind(this);

    this.state = {
      routeData: null,
      payload: { RequestedStopId: null, RequestedDateTime: new Date() },       
    };
  }

  onSubmitClick() {
    fetch("http://localhost:54725/api/Routes/ArrivalTimes", {
      method: "post",
      body: JSON.stringify(this.state.payload),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ routeData: data });
      })
      .catch(console.log);
  }

  onChangeListener(e) {
    this.setState({
      payload: {
        ...this.state.payload,
        RequestedStopId: parseInt(e.target.value),
      },
    });
  }

  onClearClick() {
    this.setState({
      routeData: null      
    });
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container>
          <AppBar position="static">
            <Typography variant="h5" noWrap>
              Find next 2 arrival times per route for the requested stop...
            </Typography>
          </AppBar>
          <form noValidate autoComplete="off">            
            <br></br>
            <InputLabel htmlFor="age-native-simple">
              <b>Please select your bus stop number here...</b>
            </InputLabel>
            <Select native onChange={this.onChangeListener}>
              <option aria-label="None" value="" />
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>              
            </Select>
            <Button
              style={{ margin: "5px" }}
              variant="contained"
              disabled={!this.state.payload.RequestedStopId}
              color="primary"
              onClick={this.onSubmitClick}
            >
              Search
            </Button>
            <Button
              style={{ margin: "5px" }}
              variant="contained"
              onClick={this.onClearClick}
            >
              Clear
            </Button>
          </form>
          <div>
            {this.state.routeData != null ? (
              <div>
                <p>                
                  Route 1 in {this.state.routeData["Route 1 in"][0]} mins and{" "}
                  {this.state.routeData["Route 1 in"][1]} mins
                </p>
                <p>
                  Route 2 in {this.state.routeData["Route 2 in"][0]} mins and{" "}
                  {this.state.routeData["Route 2 in"][1]} mins
                </p>
                <p>
                  Route 3 in {this.state.routeData["Route 3 in"][0]} mins and{" "}
                  {this.state.routeData["Route 3 in"][1]} mins
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

export default BaseComponent;
