import React, { Component } from "react";
import styled from "styled-components";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { withRouter } from "react-router-dom";
import NoteService from "../../services/NoteService";
import { withNoteContext } from "../../contexts/NoteContext";

const NoteActionBarRoot = styled.div`
  width: 100%;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.1);
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;

  .actionbar-content {
    width: 100%;
    box-sizing: border-box;
    padding: 7px 10px 7px 10px;
    display: flex;
    align-items: center;

    button {
      background-color: transparent;
      border: none;
      outline: none;
      font-size: 18px;
      line-height: 1;
      display: flex;
      align-items: center;
      cursor: pointer;

      svg {
        display: block;
      }
    }
  }
`;

class NoteActionBar extends Component {
  render() {
    const { note } = this.props;
    return (
      <NoteActionBarRoot>
        <div className="actionbar-content">
          <button
            onClick={() => {
              this.props.history.push({
                pathname: `/note/${note.id}/edit`,
                state: {
                  prevRoute: this.props.location.pathname,
                  prevParams: this.props.match.params,
                },
              });
            }}
          >
            <MdModeEdit />
          </button>
          <button
            onClick={async () => {
              if (window.confirm("Do you want to delete this note?")) {
                const deleteResult = await NoteService.deleteNote(note.id);
                if (deleteResult && deleteResult.id > 0) {
                  this.props.appContext.deleteNoteSuccess(deleteResult.id);
                }
              }
            }}
          >
            <MdDelete />
          </button>
        </div>
      </NoteActionBarRoot>
    );
  }
}

export default withRouter(withNoteContext(NoteActionBar));
