import React, { Component } from "react";
import { API } from "aws-amplify";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      locations: []
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

    try {
      const locations = await this.notes();
      this.setState({ locations });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  notes() {
    return API.get("locations", "/locations");
  }

  renderLocationsList(locations) {
    return [{}].concat(locations).map(
      (location, i) =>
        i !== 0
          ? <LinkContainer
              key={location.id}
              to={`/notes/${location.id}`}
            >
              <ListGroupItem header={location.description.trim().split("\n")[0]}>
                {"Created: " + new Date(location.createdAt).toLocaleString()}
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

  renderLander() {
    return (
      <div className="lander">
        <h1>Scratch</h1>
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
