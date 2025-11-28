import React, { useEffect, useState } from "react";
import "../App.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyBoardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box, IconButton } from "@mui/material";
import BoltIconButton from "./BoltIconButton";
import NoteIcon from "@mui/icons-material/Note";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import NoteModal from "./NoteModal";

const OrderTable = (props) => {
  const theme = createTheme({
    palette: {
      primary: { main: '#4188f2' },
    },
  });

  const [pageCount, setPageCount] = useState(1);
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState(false);
  const [note, setNote] = useState("");

  const handleSelected = (event) => {
    let selectedItem = props.pdfItems.find(
      (item) => item.FileId === event.target.value
    );
    selectedItem.Checked = !selectedItem.Checked;
    props.setPdfItems([...props.pdfItems]);
  };

  const handleChange = (event, value) => {
    props.setPage(value);
  };

  const handleNoteClick = (fileId, note) => {
    setNoteModalOpen(true);
    setSelectedFileId(fileId);
    setNote(note);
  };

  const handleNoteModalClose = () => {
    setNoteModalOpen(false);
  };

  useEffect(() => {
    getAmountOfPages();
  }, [props.pdfItems]);

  useEffect(() => {
    let newPdfItems = props.pdfItems.map((item) => {
      return {
        ...item,
        Checked: false,
      };
    });
    props.setPdfItems([...newPdfItems]);
  }, [props.page]);

  const getAmountOfPages = () => {
    let pages = 0;
    if (props.pdfItems.length % 25 > 0) {
      pages = props.pdfItems.length / 25 + 1;
    } else {
      pages = props.pdfItems.length / 25;
    }
    setPageCount(Math.floor(pages));
  };

  return (
    <ThemeProvider theme={theme}>
      <TableContainer
        component={Paper}
        sx={{
          flexGrow: 1,
          maxWidth: "94%",
          ml: "3%",
          mr: "3%",
          mt: ".5%",
          boxShadow: 10,
          borderRadius: "20px",
        }}
      >
        <Table sx={{ whiteSpace: "normal", borderColor: "grey" }}>
          <TableHead
            style={{
              background:
                "linear-gradient(90deg, rgba(69,136,242,1) 12%, rgba(7,140,252,1) 46%, rgba(6,0,96,1) 94%)",
            }}
          >
            <TableRow sx={{ border: 2, whiteSpace: "normal" }}>
              <TableCell
                sx={{ border: 2 }}
                style={{ color: "white", fontFamily: "Alfa Slab One" }}
                className="cell"
              >
                Order Number
              </TableCell>
              <TableCell
                sx={{ border: 2, cursor: "pointer" }}
                style={{ color: "white", fontFamily: "Alfa Slab One" }}
                align="center"
                onClick={() => props.handleSortClick(props.tabValue)}
              >
                Title
                <Box
                  component="span"
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  {props.sortedByTitle ? (
                    <KeyBoardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </Box>
              </TableCell>
              <TableCell
                sx={{ border: 2 }}
                align="center"
                style={{ color: "white", fontFamily: "Alfa Slab One" }}
              >
                Quantity
              </TableCell>
              <TableCell
                sx={{ border: 2 }}
                align="center"
                style={{ color: "white", fontFamily: "Alfa Slab One" }}
              >
                Ship Date
              </TableCell>
              <TableCell
                sx={{ border: 2 }}
                align="center"
                style={{ color: "white", fontFamily: "Alfa Slab One" }}
              >
                Priority
              </TableCell>
              <TableCell
                sx={{ border: 2, cursor: "pointer" }}
                align="center"
                style={{ color: "white", fontFamily: "Alfa Slab One" }}
                onClick={() => props.handleNoteSortClick()}
              >
                Notes
                <Box
                  component="span"
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  {props.sortedByNote ? (
                    <KeyBoardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.pdfItems.map((row, index) =>
              index > props.page * 25 - 1 || index < props.page * 25 - 25
                ? null
                : row.FileContents.map((item, index) => (
                    <TableRow key={index}>
                      {index === 0 ? (
                        <TableCell
                          align="center"
                          rowSpan={row.FileContents.length}
                          style={{
                            padding: "15px",
                            fontWeight: "bold",
                            borderColor: "#4588f2",
                          }}
                          sx={{
                            bgcolor: row.Checked ? "#c7f7d4" : "",
                            pl: "1vh",
                            border: 1,
                          }}
                        >
                          <div
                            style={{
                              pb: "2vh",
                              fontSize: "15px",
                            }}
                          >
                            {props.renderSwitch ? (
                              <Switch
                                value={row.FileId}
                                checked={row.Checked}
                                onClick={handleSelected}
                                color="success"
                              ></Switch>
                            ) : null}
                          </div>
                          {row.FileContents[0].OrderNumber}
                        </TableCell>
                      ) : null}
                      <TableCell
                        style={{
                          wordBreak: "break-word",
                          borderColor: "darkgray",
                        }}
                        sx={{
                          p: "1vh",
                          bgcolor: row.Checked ? "#c7f7d4" : "#f5f1f1",
                        }}
                      >
                        <span style={{ fontWeight: "bold" }}>
                          {`${++index}.`}&nbsp;
                        </span>
                        {`${item.Title}`}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          borderColor: "darkgray",
                          bgcolor: row.Checked ? "#c7f7d4" : "",
                        }}
                      >
                        {item.Quantity}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          borderColor: "darkgray",
                          bgcolor: row.Checked ? "#c7f7d4" : "#f5f1f1",
                        }}
                      >
                        {item.ShipDate}
                      </TableCell>
                      {index === 1 ? (
                        <TableCell
                          align="center"
                          sx={{
                            bgcolor: row.Checked ? "#c7f7d4" : "",
                            border: "1px solid darkgray",
                          }}
                          rowSpan={row.FileContents.length}
                        >
                          <BoltIconButton
                            priority={row.priority}
                            handleTogglePriority={props.handleTogglePriority}
                            fileId={row.FileId}
                            isLoading={props.isLoading}
                          />
                        </TableCell>
                      ) : null}
                      {index === 1 ? (
                        <TableCell
                          align="center"
                          sx={{
                            borderColor: "darkgray",
                            bgcolor: row.Checked ? "#c7f7d4" : "#f5f1f1",
                            borderLeft: 1,
                          }}
                          rowSpan={row.FileContents.length}
                          onClick={() =>
                            handleNoteClick(row.FileId, row.note || "")
                          }
                        >
                          <IconButton>
                            {row.note ? (
                              <NoteIcon
                                fontSize="large"
                                sx={{ color: "#4188f2" }}
                              />
                            ) : (
                              <NoteAddIcon fontSize="large" />
                            )}
                          </IconButton>
                        </TableCell>
                      ) : null}
                    </TableRow>
                  ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2} alignItems="center" sx={{ mb: "2vh", mt: "2vh" }}>
        <Pagination
          count={pageCount}
          size="large"
          page={props.page}
          onChange={handleChange}
          color="primary"
          variant="outlined"
          sx={{ color: "white" }}
        />
      </Stack>
      <NoteModal
        open={noteModalOpen}
        handleClose={handleNoteModalClose}
        note={note}
        handleAddNote={props.handleAddNote}
        selectedFileId={selectedFileId}
      />
    </ThemeProvider>
  );
};

export default OrderTable;
