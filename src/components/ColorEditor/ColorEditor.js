import React, { Component } from "react";
import ColorDot from "../ColorDot/ColorDot";

class ColorEditor extends Component {
  render() {
    const { colors } = this.props;
    return (
      <div>
        {colors.map((c) => (
          <ColorDot
            key={c.id}
            bgcolor={c.code}
            selected={this.props.selectedColor === c.code}
            onColorClick={() => this.props.onColorClick(c)}
          />
        ))}
      </div>
    );
  }
}

export default ColorEditor;
