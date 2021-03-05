import React, { Component } from "react";
import styled from "styled-components";
import Note from "../Note/Note";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const NoteListRoot = styled.div`
  box-sizing: border-box;
  width: 100%;
`;

class NoteList extends Component {
  render() {
    const { notes } = this.props;

    return (
      <NoteListRoot>
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 576: 1, 768: 2, 992: 3, 1200: 4 }}
        >
          <Masonry gutter="15px">
            {notes.map((n) => (
              <Note key={n.id} note={n} />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </NoteListRoot>
    );
  }
}

export default NoteList;
