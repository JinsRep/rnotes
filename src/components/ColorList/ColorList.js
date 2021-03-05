import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { withNoteContext } from "../../contexts/NoteContext";
import ColorDot from "../ColorDot/ColorDot";
import SideBarList from "../SideBarList/SidBarList";
import NoteService from "../../services/NoteService";

const ColorListRoot = styled.section`
  .header {
    width: 100%;
    padding-left: 15px;
    padding-right: 15px;

    h1 {
      margin: 15px 0 15px 0;
      font-weight: 600;
    }

    hr {
      margin: 0;
    }
  }
`;

class ColorList extends Component {
  render() {
    const { colors, colorsLoaded } = this.props.appContext;
    const { tag = "All", color = "All", word = "" } =
      this.props.location.state && this.props.location.state.prevParams
        ? this.props.location.state.prevParams
        : this.props.match.params;

    return (
      <ColorListRoot>
        <div className="header">
          <h1>Colors</h1>
          <hr />
        </div>
        <SideBarList>
          {colorsLoaded ? (
            <Fragment>
              <li
                className="all"
                className={color === "All" ? "all active" : "all"}
                onClick={() => {
                  this.props.history.push(
                    NoteService.buildUrl(tag, "All", word)
                  );
                }}
              >
                All
              </li>

              {colors.map((c) => (
                <li
                  key={c.id}
                  className={
                    c.display.toLowerCase() === color.toLowerCase()
                      ? "active"
                      : null
                  }
                  onClick={() => {
                    this.props.history.push(
                      NoteService.buildUrl(tag, c.display, word)
                    );
                  }}
                >
                  <ColorDot bgcolor={c.code} /> {c.display}
                </li>
              ))}
            </Fragment>
          ) : (
            <li>Loading...</li>
          )}
        </SideBarList>
      </ColorListRoot>
    );
  }
}

export default withRouter(withNoteContext(ColorList));
