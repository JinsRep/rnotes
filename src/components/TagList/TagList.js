import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { MdLabel } from "react-icons/md";
import { devices } from "../../constants/devices";
import { withNoteContext } from "../../contexts/NoteContext";
import SideBarList from "../SideBarList/SidBarList";
import { withRouter } from "react-router-dom";
import NoteService from "../../services/NoteService";

const TagListRoot = styled.section`
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

class TagList extends Component {
  render() {
    const { tagsLoaded, tags } = this.props.appContext;
    const { tag = "All", color = "All", word = "" } =
      this.props.location.state && this.props.location.state.prevParams
        ? this.props.location.state.prevParams
        : this.props.match.params;

    return (
      <TagListRoot>
        <div className="header">
          <h1>Tags</h1>
          <hr />
        </div>
        <SideBarList>
          {tagsLoaded ? (
            <Fragment>
              <li
                className={tag === "All" ? "all active" : "all"}
                onClick={() => {
                  this.props.history.push(
                    NoteService.buildUrl("All", color, word)
                  );
                }}
              >
                All
              </li>
              {tags.map((t) => (
                <li
                  key={t.id}
                  className={
                    t.text.toLowerCase() === tag.toLowerCase() ? "active" : null
                  }
                  onClick={() => {
                    this.props.history.push(
                      NoteService.buildUrl(t.text, color, word)
                    );
                  }}
                >
                  <MdLabel />
                  {t.text}
                </li>
              ))}
            </Fragment>
          ) : (
            <li>Loading...</li>
          )}
        </SideBarList>
      </TagListRoot>
    );
  }
}

export default withRouter(withNoteContext(TagList));
