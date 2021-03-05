import React, { Component } from "react";
import styled from "styled-components";
import Tag from "./Tag";

const NoteTagListRoot = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

class NoteTagList extends Component {
  render() {
    const { tags } = this.props;

    return (
      <NoteTagListRoot>
        {tags.map((t) => (
          <Tag key={t.id} tag={t} />
        ))}
      </NoteTagListRoot>
    );
  }
}

export default NoteTagList;
