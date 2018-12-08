import React, { Component } from "react";
import { API, Storage } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { s3Upload } from "../libs/awsLib";
import config from "../config";
import "./Locations.css";

export default class Locations extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: null,
            isDeleting: null,
            location: null,
            locationName: null,
            country: null,
            description: null
        };
    }

    async componentDidMount() {
        try {
            const location = await this.getLocation();
            const { locationName, country, description } = location;

            this.setState({
                location,
                locationName,
                country,
                description
            });
        } catch (e) {
            alert(e);
        }
    }

    getLocation() {
        return API.get("locations", `/locations/${this.props.match.params.id}`);
    }

    saveLocation(location) {
        return API.put("locations", `/locations/${this.props.match.params.id}`, {
            body: location
        });
    }

    deleteLocation() {
        return API.del("locations", `/locations/${this.props.match.params.id}`);
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
            await this.saveLocation({
                locationName: this.state.locationName,
                country: this.state.country,
                description: this.state.description,
                modifiedAt: Date.now()
            });
            this.props.history.push("/");
        } catch (e) {
            alert(e);
            this.setState({ isLoading: false });
        }
    }

    handleDelete = async event => {
        event.preventDefault();

        const confirmed = window.confirm(
            "Are you sure you want to delete this location?"
        );

        if (!confirmed) {
            return;
        }

        this.setState({ isDeleting: true });

        try {
            await this.deleteLocation();
            this.props.history.push("/");
        } catch (e) {
            alert(e);
            this.setState({ isDeleting: false });
        }
    }

    render() {
        return (
            <div className="Locations">
                {this.state.location &&
                    <form onSubmit={this.handleSubmit}>
                        <FormGroup controlId="locationName">
                            <ControlLabel>Location Name</ControlLabel>
                            <FormControl
                                onChange={this.handleChange}
                                value={this.state.locationName}
                                componentClass="input"
                            />
                        </FormGroup>
                        <FormGroup controlId="country">
                            <ControlLabel>Country</ControlLabel>
                            <FormControl
                                onChange={this.handleChange}
                                value={this.state.country}
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
                            text="Save"
                            loadingText="Saving…"
                        />
                        <LoaderButton
                            block
                            bsStyle="danger"
                            bsSize="large"
                            isLoading={this.state.isDeleting}
                            onClick={this.handleDelete}
                            text="Delete"
                            loadingText="Deleting…"
                        />
                    </form>}
            </div>
        );
    }
}
