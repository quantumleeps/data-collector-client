import React, { Component } from "react";
import { API } from "aws-amplify";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { FormGroup, ControlLabel, FormControl, PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      locations: [],
      selectedCountry: ""
    };

    this.onCountrySelect = this.onCountrySelect.bind(this)
    // this.outputCountryName = this.outputCountryName.bind(this)
  }

  async onCountrySelect(event) {
    this.setState({ selectedCountry: event.target.value })
    this.setState({ isLoading: true });

    try {
      const locations = await this.locations(event.target.value);
      this.setState({ locations });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

    try {
      const locations = await this.locations(this.state.selectedCountry);
      this.setState({ locations });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  locations(country) {
    if (country.length < 1 || country === "select") {
      return API.get("locations", "/locations");
    } else {
      return API.get("locations", `/locations/${country}`);
    }
    
  }

  outputCountryName(countries, countryId) {
    let output = null
    countries.forEach(
      (country, i) => {
        if (country['countryId'] === countryId) {
          output = country['countryName']
        }
      }
    )
    return output
  }

  renderLocationsList(locations) {
    return [{}].concat(locations).map(
      (location, i) =>
        i !== 0
          ? <LinkContainer
            key={location.locationId}
            to={`/locations/${location.countryId}/${location.locationId}`}
          >
            <ListGroupItem header={location.locationName + "-" + this.outputCountryName(this.props.countries, location.countryId)}>
              {"Created: " + new Date(location.createdAt).toLocaleString()}<br />
              {"Modified: " + new Date(location.modifiedAt).toLocaleString()}<br />
              {location.description.trim().split("\n")[0]}
            </ListGroupItem>
          </LinkContainer>
          : <LinkContainer
            key="new"
            to="/locations/new"
          >
            <ListGroupItem>
              <h4>
                <b>{"\uFF0B"}</b> Create a new location
                </h4>
            </ListGroupItem>
          </LinkContainer>
    );
  }

  renderCountryList(countries) {
    return [{}].concat(countries).map(
      (country, i) =>
        i !== 0
          ? <option key={country.countryId} value={country.countryId}>{country.countryName}</option>
          : <option key="select" value="select">select...</option>
    )
  }

  renderLander() {
    return (
      <div className="lander">
        <h1>DataCollector</h1>
        <p>A simple data collection app</p>
        <div>
          <Link to="/login" className="btn btn-info btn-lg">
            Login
          </Link>
          <Link to="/signup" className="btn btn-success btn-lg">
            Signup
          </Link>
        </div>
      </div>
    );
  }

  renderLocations() {
    return (
      <div className="locations">
        <PageHeader>Your Locations</PageHeader>
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Select a Country</ControlLabel>
          <FormControl 
            componentClass="select" 
            placeholder="select" 
            onChange={this.onCountrySelect}
            value={this.state.selectedCountry}
          >
            {!this.state.isLoading && this.renderCountryList(this.props.countries)}
          </FormControl>
        </FormGroup>
        <ListGroup>
          {!this.state.isLoading && this.renderLocationsList(this.state.locations)}
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderLocations() : this.renderLander()}
      </div>
    );
  }
}
