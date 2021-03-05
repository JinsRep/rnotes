import React, { Component } from "react";
import Modal from "react-modal";
import { withNoteContext } from "../../contexts/NoteContext";
import NoteService from "../../services/NoteService";
import AddEditNoteForm from "../AddEditNoteForm/AddEditNoteForm";

class NoteEditorModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      noteDetail: null,
      noteDetailLoaded: false,
    };
  }

  closeModal = () => {
    if (this.props.location.state && this.props.location.state.prevRoute) {
      this.props.history.push(this.props.location.state.prevRoute);
    } else {
      this.props.history.push("/");
    }
  };

  onAfterOpen = async () => {
    const { editorMode = "", id: noteId = 0 } = this.props.match.params;
    switch (editorMode.toLowerCase()) {
      case "create":
        this.setState({
          noteDetail: {
            id: 0,
            title: "Untitled Note",
            text: "",
            color: this.props.appContext.colors.find(
              (c) => c.display === "Default"
            ),
            tags: [],
          },
          noteDetailLoaded: true,
        });
        break;
      case "edit":
        const noteToEdit = await NoteService.getNoteById(noteId);
        this.setState({ noteDetail: noteToEdit, noteDetailLoaded: true });
        break;
    }
  };

  render() {
    const { noteDetail, noteDetailLoaded } = this.state;
    const { editorMode = "" } = this.props.match.params;
    return (
      <Modal
        isOpen={true}
        onRequestClose={() => {
          this.closeModal();
        }}
        portalClassName="rmodal"
        onAfterOpen={this.onAfterOpen}
        ariaHideApp={false}
      >
        {noteDetailLoaded ? (
          <AddEditNoteForm
            note={noteDetail}
            mode={editorMode}
            closeModal={this.closeModal}
          />
        ) : (
          <h2>Loading...</h2>
        )}
      </Modal>
    );
  }
}

export default withNoteContext(NoteEditorModal);
