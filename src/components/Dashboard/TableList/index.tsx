import { ReactNode, useContext } from "react";
import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Checkbox
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import {
  ShowTableDataContext,
  UpdateDataContext,
} from "../../../utils/showHideTabData";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.text.secondary,
    padding: "8px"
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: "white",
  },
  '&:nth-of-type(even)': {
    backgroundColor: "grey",
  },
}));



type tableProps = {
  tableHead: string[];
  children: ReactNode;
  type?: boolean;
  checkbox?: boolean;
  showAction?: boolean;
  hideAction?: boolean;
};

export default function TableList({ tableHead, children, type, checkbox, showAction = true, hideAction }: tableProps) {
  const { setEditData } = useContext(UpdateDataContext) ?? {};
  const { showListData, setShowListData } = useContext(ShowTableDataContext) ?? {};
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <StyledTableRow>
            {tableHead.map((item, index) => {
              if (index === tableHead.length - 1 && type) {
                return (
                  <StyledTableCell
                    key={item}
                    align={"center"}
                  >
                    {index === 0 && checkbox ? <Checkbox /> : null}
                    {item}

                  </StyledTableCell>
                )
              }
              return (

                <StyledTableCell
                  key={item}
                  align={index === 0 ? "left" : "center"}
                >
                  {index === 0 && checkbox ? <Checkbox /> : null}
                  {item}

                </StyledTableCell>
              );
            })}
            {((!type) && (hideAction || showAction)) && (
              <StyledTableCell align="center" sx={{ textAlign: "right" }}>
                <Button
                  variant="contained"
                  onClick={() => {
                    setShowListData(!showListData);
                    setEditData(null);
                  }}
                >
                  Add
                </Button>
              </StyledTableCell>
            )}
          </StyledTableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
}
