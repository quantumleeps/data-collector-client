import React, { Component } from "react";
import { API } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./NewLocation.css";

export default class NewLocation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: null,
      locationName: "",
      countryId: "",
      description: ""
    };
  }

  createLocation(location) {
    return API.post("locations", "/locations", {
      body: location
    });
  }

  validateForm() {
    return this.state.locationName.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await this.createLocation({
        locationName: this.state.locationName,
        countryId: this.state.countryId,
        description: this.state.description
      });
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  render() {
    return (
      <div className="NewLocation">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="locationName">
            <ControlLabel>Name</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.locationName}
              componentClass="input"
            />
          </FormGroup>
          <FormGroup controlId="countryId">
            <ControlLabel>Country Id</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.countryId}
              componentClass="input"
            />
          </FormGroup>
          <FormGroup controlId="description">
            <ControlLabel>Description</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.description}
              componentClass="textarea"
            />
          </FormGroup>
          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Create"
            loadingText="Creating…"
          />
        </form>
      </div>
    );
  }
}
