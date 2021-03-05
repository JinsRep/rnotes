import React, { Component } from "react";
import styled from "styled-components";
import { MdAddCircleOutline, MdSearch, MdClose } from "react-icons/md";
import { withRouter } from "react-router-dom";
import NoteService from "../../services/NoteService";

const NoteListActionBarRoot = styled.div`
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 15px;
  display: flex;
  align-items: center;

  .addnew {
    font-size: 24px;
    display: flex;
    align-items: center;
    padding: 10px;
    font-weight: 600;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    outline: none;
    background-color: #ebebeb;
    margin-right: 10px;

    span {
      line-height: 1;
    }

    .icon {
      color: purple;
      display: inline-block;
      margin-right: 5px;

      svg {
        display: block;
      }
    }
  }

  .serachBox {
    display: flex;
    align-items: center;
    flex: 1;
    position: relative;
    input {
      font-size: 24px;
      padding: 10px;
      width: 100%;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding-right: 32px;
      outline: none;
    }

    span {
      color: purple;
      display: inline-block;
      margin-right: 5px;
      position: absolute;
      right: 0;

      svg {
        display: block;
      }
    }
  }
`;

class NoteListActionBar extends Component {
  constructor(props) {
    super(props);
    this.searchTextBoxRef = React.createRef();
  }

  render() {
    const { tag = "All", color = "All", word = "" } = this.props.match.params;
    return (
      <NoteListActionBarRoot>
        <button
          className="addnew"
          onClick={() => {
            this.props.history.push({
              pathname: "/note/0/create",
              state: {
                prevRoute: this.props.location.pathname,
                prevParams: this.props.match.params,
              },
            });
          }}
        >
          <span className="icon">
            <MdAddCircleOutline size="32px" />
          </span>
          <span>Add New Note</span>
        </button>
        <div className="serachBox">
          <input
            type="text"
            ref={this.searchTextBoxRef}
            defaultValue={word || ""}
            onKeyDown={(e) => {
              if (word.trim() !== "") {
                e.preventDefault();
                e.stopPropagation();
              } else {
                if (e.key === "Enter") {
                  this.props.history.push(
                    NoteService.buildUrl(tag, color, e.target.value)
                  );
                }
              }
            }}
          />
          <span
            onClick={() => {
              if (word.trim() !== "") {
                this.searchTextBoxRef.current.value = "";
                this.props.history.push(NoteService.buildUrl(tag, color, ""));
              } else {
                this.props.history.push(
                  NoteService.buildUrl(
                    tag,
                    color,
                    this.searchTextBoxRef.current.value
                  )
                );
              }
            }}
          >
            {word.trim() !== "" ? (
              <MdClose size="32px" />
            ) : (
              <MdSearch size="32px" />
            )}
          </span>
        </div>
      </NoteListActionBarRoot>
    );
  }
}

export default withRouter(NoteListActionBar);
