import React, { Component } from "react";
import { API } from "aws-amplify";
import LoaderButton from "../components/LoaderButton";
import "./Locations.css";
import EditLocation from "./EditLocation"
import NodeTable from "./NodeTable"

export default class Locations extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            location: null,
            isEditingLocationInfo: false
        };
        this.toggleIsEditingLocationInfo = this.toggleIsEditingLocationInfo.bind(this)

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

    toggleIsEditingLocationInfo() {
        this.state.isEditingLocationInfo
        ? this.setState({ isEditingLocationInfo: false })
        : this.setState({ isEditingLocationInfo: true })
    }

    renderWhenEditing() {
        return (
            <span>
                <EditLocation
                    location={this.state.location}
                    history={this.props.history}
                    countries={this.props.countries}
                />
            </span>
        )
    }
    
    renderWhenNotEditing() {
        return (
            <span>
                <b>Location Info:</b><br />
                <h2>{this.state.location.locationName}</h2>
                <h4>{this.state.location.description}</h4>
                <LoaderButton
                    bsStyle="info"
                    bsSize="small"
                    // isLoading={this.state.isDeleting}
                    onClick={this.toggleIsEditingLocationInfo}
                    text="Edit Location Info"
                    loadingText="Editing..."
                />
                <NodeTable />
            </span>
        )
    }

    render() {
        return (
            <div>
                {this.state.isLoading
                    ? <h2>...Loading</h2>
                    : this.state.isEditingLocationInfo
                        ? this.renderWhenEditing()
                        : this.renderWhenNotEditing()
                }
            </div>
        )
    }
}
