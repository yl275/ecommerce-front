import styled from "styled-components";

const StyledTable = styled.table`
  width: 100%;
  th {
    text-align: left;
    text-transform: uppercase;
    color: #aaa;
    font-weight: 700;
    font-size: 0.8rem;
  }
  td {
    border-top: 1px solid #ccc;
  }
`;

export default function Table(props) {
  return <StyledTable {...props} />;
}
