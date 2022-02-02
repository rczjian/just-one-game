import { Alert, Badge, FormControl, ListGroup, Table } from "react-bootstrap";
import styled from "styled-components";

export const Prompt = styled.div`
  text-align: center;
  margin-top: 16px;
`;

export const Input = styled(FormControl)`
  text-align: center;
`;

export const BoldItalic = styled.span`
  font-weight: 600;
  font-style: italic;
`;

export const ControlsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin: 8px 8px 0px;
`;

export const CustomBadge = styled(Badge)`
  margin-left: 8px;
  vertical-align: text-top;
`;

export const CustomAlert = styled(Alert)`
  font-size: small;
  padding: 0.25rem 0.5rem;
  margin: 4px 0px 0px;
  text-align: left;
`;

export const CustomTable = styled(Table)`
  margin: 8px 0px;
  td {
    min-width: 100px;
    vertical-align: middle;
    padding: 0.25rem 0.5rem;
  }
  tr:nth-child(even) > td {
    background-color: #dddddd;
  }
  td:last-child {
    border-left: 1px solid #dee2e6;
  }
  tr:first-child {
    td:first-child {
      border-top-left-radius: 4px;
    }
    td:last-child {
      border-top-right-radius: 4px;
    }
  }
  tr:last-child {
    td:first-child {
      border-bottom-left-radius: 4px;
    }
    td:last-child {
      border-bottom-right-radius: 4px;
    }
  }
`;

export const CustomListGroup = styled(ListGroup)`
  text-align: center;
  > div {
    padding: 0.25rem 1rem;
  }
`;

export const InlineError = styled.div`
  text-align: left;
  padding: 0px 8px;
  width: 100%;
  font-size: small;
  color: red;
`;
