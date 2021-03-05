import styled from "styled-components";
import { devices } from "../../constants/devices";

const SideBarList = styled.ul`
  display: block;
  list-style-type: none;
  margin: 0;
  padding: 0;

  li {
    display: flex;
    align-items: center;
    padding: 10px 15px 10px 15px;
    cursor: pointer;

    &.active {
      background-color: #ccc;

      cursor: default;

      @media ${devices.large} {
        border-right: 8px solid purple;
      }
    }

    &.all {
      font-weight: 700;
    }

    svg {
      display: block;
      margin-right: 10px;
    }
  }
`;

export default SideBarList;
