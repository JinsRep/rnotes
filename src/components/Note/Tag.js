import React, { Component } from "react";
import styled from "styled-components";

const TagRoot = styled.span`
  display: inline-block;
  padding: 3px 10px 3px 10px;
  background-color: #000;
  color: #fff;
  font-size: 12px;
  line-height: 1;
  border-radius: 10px;
  margin-right: 5px;
`;

class Tag extends Component {
  render() {
    const { tag } = this.props;
    return <TagRoot>{tag.text}</TagRoot>;
  }
}

export default Tag;
