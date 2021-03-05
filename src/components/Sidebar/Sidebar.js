import React, { Component } from "react";
import styled from "styled-components";
import { devices } from "../../constants/devices";
import { withNoteContext } from "../../contexts/NoteContext";
import AddTagForm from "../AddTagForm/AddTagForm";
import ColorList from "../ColorList/ColorList";
import TagList from "../TagList/TagList";

const topBarHeight = (props) => props.theme.topbar.height;
const sideBarWidth = (props) => props.theme.sidebar.width;

const SidebarRoot = styled.aside`
  box-sizing: border-box;
  position: fixed;
  left: ${(props) => (props.open ? 0 : `-100%`)};
  top: ${topBarHeight}px;
  width: 100%;
  height: calc(100vh - ${topBarHeight}px);
  background-color: ${(props) => props.theme.sidebar.backgroundColor};
  overflow: auto;
  transition: all 0.3s ease-in-out;
  @media ${devices.large} {
    width: ${sideBarWidth}px;
    left: ${(props) => (props.open ? 0 : -1 * sideBarWidth(props))}px;
  }
`;

class Sidebar extends Component {
  render() {
    const { sideBarOpen } = this.props.appContext;

    return (
      <SidebarRoot open={sideBarOpen}>
        <TagList />
        <AddTagForm />
        <ColorList />
      </SidebarRoot>
    );
  }
}

export default withNoteContext(Sidebar);
