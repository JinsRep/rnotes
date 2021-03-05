import React, { Component, Fragment } from "react";
import Topbar from "../Topbar/Topbar";
import Sidebar from "../Sidebar/Sidebar";
import Content from "../Content/Content";
import { NoteContextProvider } from "../../contexts/NoteContext";
import { devices } from "../../constants/devices";
import NoteService from "../../services/NoteService";
import { Route } from "react-router-dom";
import NoteListPage from "../NoteListPage/NoteListPage";
import NoteEditorModal from "../NoteEditorModal/NoteEditorModal";

class NoteApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sideBarOpen: window.matchMedia(devices.large).matches,
      toggleSideBar: () => {
        this.setState({ sideBarOpen: !this.state.sideBarOpen });
      },
      tagsLoaded: false,
      tags: [],
      addTagSuccess: (tag) => {
        this.setState({ tags: [...this.state.tags, tag] });
      },
      colorsLoaded: false,
      colors: [],
      notesLoaded: false,
      notes: [],
      addNoteSuccess: (note) => {
        this.setState({ notes: [...this.state.notes, note] });
      },
      updateNoteSucess: (updatedNote) => {
        this.setState({
          notes: this.state.notes.map((n) => {
            if (n.id === updatedNote.id) {
              return { ...updatedNote };
            } else {
              return { ...n };
            }
          }),
        });
      },
      deleteNoteSuccess: (Id) => {
        this.setState({
          notes: this.state.notes.filter((n) => n.id !== Id),
        });
      },
      fetchNotesSuccess: (notes) => {
        this.setState({ notes: [...notes], notesLoaded: true });
      },
      setNotesLoaded: (status) => {
        this.setState({ notesLoaded: status });
      },
    };
  }

  loadTags = async () => {
    const tags = await NoteService.getTags();
    this.setState({ tags: tags, tagsLoaded: true });
  };

  loadColors = async () => {
    const colors = await NoteService.getColors();
    this.setState({ colors: colors, colorsLoaded: true });
  };

  componentDidMount() {
    this.loadTags();
    this.loadColors();
  }

  render() {
    return (
      <NoteContextProvider value={this.state}>
        <Topbar />
        <Sidebar />
        <Content>
          <Route
            path={[
              "/",
              "/tag/:tag",
              "/color/:color",
              "/word/:word",
              "/tag/:tag/color/:color",
              "/tag/:tag/word/:word",
              "/color/:color/word/:word",
              "/tag/:tag/color/:color/word/:word",
              "/note/:id/:editorMode",
            ]}
            exact
            component={NoteListPage}
          />
          <Route
            path="/note/:id/:editorMode"
            component={NoteEditorModal}
            exact
          />
        </Content>
      </NoteContextProvider>
    );
  }
}

export default NoteApp;
