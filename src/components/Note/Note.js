import React, { Component } from "react";
import styled from "styled-components";
import NoteActionBar from "./NoteActionBar";
import NoteTagList from "./NoteTagList";
import { devices } from "../../constants/devices";
import Mark from "mark.js";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

const NoteRoot = styled.div`
  width: 100%;
  padding: 0;
  background-color: ${(props) => props.bgcolor};
  color: #000;
  border-radius: 7px;
  box-shadow: 0 0 3px 2px #ddd;
  align-self: flex-start;

  .note-content {
    padding: 10px;

    h3 {
      margin: 0 0 10px 0;
    }

    .highlight {
      background-color: purple;
      color: #fff;
    }
  }

  @media ${devices.large} {
    .actionbar-content {
      visibility: hidden;
    }

    &:hover .actionbar-content {
      visibility: visible;
    }
  }
`;

class Note extends Component {
  render() {
    const { note } = this.props;

    const { word = "" } =
      this.props.location.state && this.props.location.state.prevParams
        ? this.props.location.state.prevParams
        : this.props.match.params;

    if (word.trim() !== "") {
      if (note.title.toLowerCase().indexOf(word.toLowerCase().trim()) > -1) {
        note.title = note.title.replace(new RegExp(word, "ig"), (val) => {
          return `<mark class="highlight">${val}</mark>`;
        });
      }

      let dummyElement = document.createElement("p");
      dummyElement.innerHTML = note.text;
      const markInstance = new Mark(dummyElement);
      markInstance.unmark({
        done: () => {
          markInstance.mark(word, {
            element: "mark",
            className: "highlight",
          });
        },
      });
      note.text = dummyElement.innerHTML;
      dummyElement = null;
    }

    return (
      <NoteRoot bgcolor={note.color.code} className="note">
        <div className="note-content">
          <h3 dangerouslySetInnerHTML={{ __html: note.title }}></h3>
          <div>
            <p dangerouslySetInnerHTML={{ __html: note.text }}></p>
          </div>
          <NoteTagList tags={note.tags} />
        </div>
        <NoteActionBar note={note} />
      </NoteRoot>
    );
  }
}

export default withRouter(Note);
