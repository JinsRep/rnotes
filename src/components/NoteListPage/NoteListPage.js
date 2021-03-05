import React, { Component, Fragment } from "react";
import { withNoteContext } from "../../contexts/NoteContext";
import NoteService from "../../services/NoteService";
import Note from "../Note/Note";
import NoteList from "../NoteList/NoteList";
import NoteListActionBar from "../NoteListActionBar/NoteListActionBar";

class NoteListPage extends Component {
  loadNotes = async () => {
    const { tag = "All", color = "All", word = "" } =
      this.props.location.state && this.props.location.state.prevParams
        ? this.props.location.state.prevParams
        : this.props.match.params;

    this.props.appContext.setNotesLoaded(false);
    const notes = await NoteService.getNotes(tag, color, word);
    this.props.appContext.fetchNotesSuccess(notes);
  };

  componentDidMount() {
    this.loadNotes();
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      tag: prevTag = "All",
      color: prevColor = "All",
      word: prevWord = "",
    } = prevProps.match.params;
    const { tag = "All", color = "All", word = "" } = this.props.match.params;

    if (tag !== prevTag || color !== prevColor || word !== prevWord) {
      this.loadNotes();
    }
  }

  render() {
    const { notesLoaded, notes } = this.props.appContext;
    return (
      <Fragment>
        {notesLoaded ? (
          <Fragment>
            <NoteListActionBar />
            <NoteList notes={notes} />
          </Fragment>
        ) : (
          <h2>Loading...</h2>
        )}
      </Fragment>
    );
  }
}

export default withNoteContext(NoteListPage);
