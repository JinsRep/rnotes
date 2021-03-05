import React, { Component } from "react";
import styled from "styled-components";
import { devices } from "../../constants/devices";
import { withNoteContext } from "../../contexts/NoteContext";

const topBarHeight = (props) => props.theme.topbar.height;
const sideBarWidth = (props) => props.theme.sidebar.width;

const ContentRoot = styled.main`
  box-sizing: border-box;
  padding: 15px;
  min-height: calc(100vh - ${topBarHeight}px);
  margin-top: ${topBarHeight}px;
  width: 100%;
  margin-left: ${(props) => (props.sideBarOpen ? `-100%` : 0)};
  transition: all 0.3s ease-in-out;
  @media ${devices.large} {
    width: ${(props) =>
      props.sideBarOpen ? `calc(100% - ${sideBarWidth(props)}px)` : `100%`};
    margin-left: ${(props) =>
      props.sideBarOpen ? `${sideBarWidth(props)}px` : `0`};
  }
`;

class Content extends Component {
  render() {
    const { sideBarOpen } = this.props.appContext;
    return (
      <ContentRoot sideBarOpen={sideBarOpen}>{this.props.children}</ContentRoot>
    );
  }
}

export default withNoteContext(Content);
