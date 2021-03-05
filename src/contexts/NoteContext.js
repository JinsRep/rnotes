import React, { Component } from "react";

export const NoteContext = React.createContext({
  sideBarOpen: false,
});

export class NoteContextProvider extends Component {
  render() {
    return (
      <NoteContext.Provider value={this.props.value}>
        {this.props.children}
      </NoteContext.Provider>
    );
  }
}

export const withNoteContext = (WrappedComponent) => {
  class WithNoteContext extends Component {
    render() {
      return (
        <NoteContext.Consumer>
          {(context) => (
            <WrappedComponent {...this.props} appContext={context} />
          )}
        </NoteContext.Consumer>
      );
    }
  }

  return WithNoteContext;
};
