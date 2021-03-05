import React, { Component } from "react";
import styled from "styled-components";
import { MdCheck } from "react-icons/md";

const ColorDotRoot = styled.span`
  display: inline-block;
  width: 18px;
  height: 18px;
  border-radius: 9px;
  border: 1px solid #000;
  background-color: ${(props) => props.bgcolor};
  margin-right: 10px;

  svg {
    display: block;
  }
`;

class ColorDot extends Component {
  render() {
    return (
      <ColorDotRoot
        bgcolor={this.props.bgcolor}
        onClick={() => {
          this.props.onColorClick(this.props.bgcolor);
        }}
      >
        {this.props.selected && <MdCheck />}
      </ColorDotRoot>
    );
  }
}

export default ColorDot;
