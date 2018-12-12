import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import "./DataGrid.css"
import data from "./StaticData"
import { Responsive, WidthProvider } from "react-grid-layout";

import { Button } from "react-bootstrap";
const ResponsiveReactGridLayout = WidthProvider(Responsive);


export default class ShowcaseLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentBreakpoint: "lg",
            compactType: "vertical",
            mounted: false,
            layouts: { lg: props.initialLayout }
        };

        this.onBreakpointChange = this.onBreakpointChange.bind(this);
        this.onLayoutChange = this.onLayoutChange.bind(this);
        this.onNewLayout = this.onNewLayout.bind(this);
        this.handleBoxClick = this.handleBoxClick.bind(this);
    }

    componentDidMount() {
        this.setState({ mounted: true });
    }

    handleBoxClick(e, i) {
        console.log(i)
    }

    generateDOM(inputFunc) {
        return _.map(this.state.layouts.lg, function (l, i) {
            return (
                <div key={i}>
                    {(
                            <span key={i} className="text">
                                <div className="System"><b>{l.data.system}: </b></div>
                                <div className="PIDTag"><b>{l.data.pidTag}</b></div>
                                <div className="Description">{l.data.name}</div>
                                <Button onClick={(e) => inputFunc(e, i)}>Input Data</Button>
                                <Button style={{marginLeft: 15}} bsStyle="warning">Skip</Button>
                            </span>
                        )}
                </div>
            );
        });
    }

    onBreakpointChange(breakpoint) {
        this.setState({
            currentBreakpoint: breakpoint
        });
    }

    onLayoutChange(layout, layouts) {
        this.props.onLayoutChange(layout, layouts);
    }

    onNewLayout() {
        this.setState({
            layouts: { lg: generateLayout() }
        });
    }

    render() {
        return (
            <div>
                <ResponsiveReactGridLayout
                    {...this.props}
                    layouts={this.state.layouts}
                    onBreakpointChange={this.onBreakpointChange}
                    onLayoutChange={this.onLayoutChange}
                    margin={[15, 15]}
                    // WidthProvider option
                    measureBeforeMount={false}
                    // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
                    // and set `measureBeforeMount={true}`.
                    useCSSTransforms={this.state.mounted}
                    compactType={this.state.compactType}
                    preventCollision={!this.state.compactType}
                >
                    {this.generateDOM(this.handleBoxClick)}
                </ResponsiveReactGridLayout>
            </div>
        );
    }
}

ShowcaseLayout.propTypes = {
    onLayoutChange: PropTypes.func.isRequired
};

ShowcaseLayout.defaultProps = {
    className: "layout",
    rowHeight: 34,
    onLayoutChange: function () { },
    cols: { lg: 12, md: 12, sm: 12, xs: 4, xxs: 4 },
    initialLayout: generateLayout(data)
};

function generateLayout(data) {
    return _.map(data, function (item, i) {
        return {
            x: 4 * (i % 3),
            y: Math.floor(i / 3),
            w: 4,
            h: 4,
            i: i.toString(),
            data: item
        }

    });
}
