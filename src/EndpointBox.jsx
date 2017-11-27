import React, { Component } from "react";
import { Control, Select, Field, Label } from "bloomer";
import "./EndpointBox.css"
export default class EndpointBox extends Component {
  changEndPoint(event) {
    this.props.changEndPoint(event.target.value);
  }
  render() {
    return (
      <Control className="Endpoint-Box">
        <Field>
          <Label>List Movie</Label>
          <Select onChange={e => this.props.changeEndPoint(e.target.value)}>
            <option value="now_playing">Now Playing</option>
            <option value="top_rated">Top Rate</option>
          </Select>
        </Field>
         <Field>
          <Label>Sort Movie</Label>
          <Select onChange={e => this.props.changeSorting(e.target.value)}>
          <option value="rating">Sort by rating</option>
          <option value="popularity">Sort by Popularity</option>
          <option value="release_date">Sort by release date</option>
          </Select>
        </Field>
      </Control>
    );
  }
}
