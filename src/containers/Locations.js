import React, { Component } from "react";
import { API } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Locations.css";
import EditLocation from "./EditLocation"

export default class Locations extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            location: null,
        };
    }

    async componentDidMount() {
        try {
            const location = await this.getLocation();

            this.setState({
                location
            });

            this.setState({ isLoading: false })
        } catch (e) {
            alert(e);
        }
    }

    getLocation() {
        return API.get("locations", `/locations/${this.props.match.params.countryId}/${this.props.match.params.locationId}`);
    }

    render() {
        return (
            <div>
                {!this.state.isLoading && <EditLocation location={this.state.location} history={this.props.history} />}
            </div>
        )
    }
}
