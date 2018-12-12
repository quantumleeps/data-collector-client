import React, { Component } from "react";
// import { Button, Glyphicon } from "react-bootstrap";
import "./NodeBox.css";
import DataPointBox from "./DataPointBox"

export default class NodeBox extends Component {

    render() {
        return (
            <div style={this.props.boxStyle} className="NodeBox">
                {this.props.text}
                {this.props.items.length && this.props.items.map(
                    (item) =>
                        <DataPointBox text={item}/>
                )}
            </div>
        )
    }
}
