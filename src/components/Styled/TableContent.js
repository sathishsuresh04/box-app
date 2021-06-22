import styled from "styled-components";
const TableContent = styled.div`
  max-height: 50vh;
  overflow-y: auto;
  table {
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.12);
    box-sizing: border-box;
    border-radius: 6px;
    border-spacing: 0;
    width: 100%;
    th {
      font-weight: 500;
    }
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem 0.8rem 0.5rem 1rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
      text-align: left;
      color: #565d6e;

      :last-child {
        border-right: 0;
      }
    }
    tbody {
      tr {
        &.disabled td {
          opacity: 0.7;
        }
        &.disabled:hover {
          background: white;
          cursor: default;
        }
        td.disabled:after {
          content: "";
          display: block;
          width: 25px;
          height: 25px;
          background-position: center center;
          background-repeat: no-repeat;
          background-image: url(./Resources/Images/Portal/locked-darkgray.svg);
        }
      }
      tr:hover {
        background: rgba(196, 196, 196, 0.15);
        cursor: pointer;
      }
      tr.row-selected {
        background-color: rgba(100, 184, 103, 0.26);
        td:first-child {
          border-left: 4px solid #64b867;
        }
      }
    }
  }
`;
export default TableContent;
