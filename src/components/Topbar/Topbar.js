import React, { Component } from "react";
import styled from "styled-components";
import { MdMenu } from "react-icons/md";
import { withNoteContext } from "../../contexts/NoteContext";

const TopBarRoot = styled.nav`
  box-sizing: border-box;
  width: 100%;
  height: ${(props) => props.theme.topbar.height}px;
  background-color: ${(props) => props.theme.topbar.backgroundColor};
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  padding: 7px 15px 7px 15px;
  display: flex;
  align-items: center;
  z-index: 9999;

  button.hamburgerButton {
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 40px;
    line-height: 1;
    color: #fff;
    margin-right: 15px;

    svg {
      display: block;
    }
  }

  a.brand {
    text-decoration: none;
    color: #fff;

    &:link,
    &:visited,
    &:active {
      color: #fff;
    }

    h1 {
      margin: 0;
      font-size: 32px;
      font-weight: 500;
    }
  }
`;

class Topbar extends Component {
  render() {
    const { toggleSideBar } = this.props.appContext;
    return (
      <TopBarRoot>
        <button
          className="hamburgerButton"
          onClick={() => {
            toggleSideBar();
          }}
        >
          <MdMenu />
        </button>
        <a href="#" className="brand">
          <h1>React Notes</h1>
        </a>
      </TopBarRoot>
    );
  }
}

export default withNoteContext(Topbar);
