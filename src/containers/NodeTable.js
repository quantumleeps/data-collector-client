import React, { Component } from "react"
import { Jumbotron, Glyphicon } from "react-bootstrap"
import "./NodeTable.css"
// import DataPointBox from "../components/DataPointBox"
import NodeBox from "../components/NodeBox"

export default class NodeTable extends Component {
    constructor(props) {
        super(props)

        this.state = {
            testing: "testing",
            table: [],
            nodes: [{
                name: "boost",
                children: [{
                    name: "motor",
                    children: [{
                        name: "Outboard Bearing",
                        datapoints: ["temperature", "vibration"],
                        children: []
                    }, {
                        name: "Inboard Bearing",
                        datapoints: ["temperature", "vibration"],
                        children: []
                    }],
                    datapoints: []
                }, {
                    name: "pump",
                    children: [],
                    datapoints: []
                }],
                datapoints: ["general condition", "status", "weight"]
            }, {
                name: "membrane",
                children: [{
                    name: "adaptor",
                    children: [{
                        name: "plastic",
                        datapoints: ["wear", "color"],
                        children: []
                    }, {
                        name: "sulfphone",
                        datapoints: ["color", "porosity"],
                        children: []
                    }],
                    datapoints: []
                }, {
                    name: "holder",
                    children: [],
                    datapoints: []
                }],
                datapoints: ["age", "status", "weight"]
            }]
        }
        
    }

    returnNodeBox(table, nodes) {
        nodes.forEach(
            (node, i) => {
                table.push(<NodeBox text={node.name} items={node.datapoints.length && node.datapoints}/>)
                node.children.length && this.returnNodeBox(table, node.children)
            }
        )
        return table
    }
    
    render() {
        return (
            
            <div>
                {this.returnNodeBox(this.state.table, this.state.nodes)}
            </div>

        )
    }
}