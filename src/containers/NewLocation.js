import React, { Component } from "react";
import { API } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./NewLocation.css";

export default class NewLocation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      locationName: "",
      countryId: "",
      description: "",
      countries: []
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

    try {
      const countries = await this.countries();
      this.setState({ countries });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  countries() {
    return API.get("countries", "/countries");
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

  renderCountryList(countries) {
    return [{}].concat(countries).map(
      (country, i) =>
        i !== 0
          ? <option key={country.countryId} value={country.countryId}>{country.countryName}</option>
          : <option key="select" value="select">select...</option>
    )
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
              componentClass="select"
            > 
              {!this.state.isLoading && this.renderCountryList(this.state.countries)}
            </FormControl>


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
