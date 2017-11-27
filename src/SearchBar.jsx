import React, { Component } from "react";
import { PanelBlock, Input, Icon, Control } from "bloomer";

export default class SearchBar extends Component {
  render() {
    return (
      <PanelBlock>
        <Control hasIcons="left">
          <Input
            isSize="small"
            placeholder="Search"
            onChange={e => this.props.onSearch(e.target.value)}
          />
          <Icon isSize="small" isAlign="left">
            <span className="fa fa-search" aria-hidden="true" />
          </Icon>
        </Control>
      </PanelBlock>
    );
  }
}
