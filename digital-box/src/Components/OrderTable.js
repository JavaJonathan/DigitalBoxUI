import React, { useEffect, useState } from 'react';
import '../App.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyBoardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, IconButton } from '@mui/material';
import BoltIconButton from './BoltIconButton';
import NoteIcon from '@mui/icons-material/Note';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import NoteModal from './NoteModal';

const theme = createTheme({
  palette: {
    primary: { main: '#4188f2' }
  }
});

const HEADER_BG = '#4188f2';
const ROW_ALT_BG = '#f8f9fa';
const GROUP_SEPARATOR_SX = { borderBottom: '2px solid rgba(65,136,242,0.35)' };

const OrderTable = props => {
  const [pageCount, setPageCount] = useState(1);
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState(false);
  const [note, setNote] = useState('');

  const handleSelected = event => {
    let selectedItem = props.pdfItems.find(item => item.FileId === event.target.value);
    selectedItem.Checked = !selectedItem.Checked;
    props.setPdfItems([...props.pdfItems]);
  };

  const handleChange = (event, value) => {
    props.setPdfItems(props.pdfItems.map(item => ({ ...item, Checked: false })));
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
    const pages = Math.ceil(props.pdfItems.length / 25);
    setPageCount(pages);
  }, [props.pdfItems]);

  return (
    <ThemeProvider theme={theme}>
      <TableContainer
        component={Paper}
        sx={{
          flexGrow: 1,
          maxWidth: '94%',
          ml: '3%',
          mr: '3%',
          mt: '.5%',
          boxShadow: 10,
          borderRadius: '12px'
        }}
      >
        <Table sx={{ whiteSpace: 'normal', borderColor: 'grey' }}>
          <TableHead style={{ background: HEADER_BG }}>
            <TableRow sx={{ border: 2, whiteSpace: 'normal' }}>
              <TableCell
                sx={{ border: 2 }}
                style={{ color: 'white', fontWeight: 'bold' }}
                className="cell"
              >
                Order Number
              </TableCell>
              <TableCell
                sx={{ border: 2, cursor: 'pointer' }}
                style={{ color: 'white', fontWeight: 'bold' }}
                align="center"
                onClick={() => props.handleSortClick(props.tabValue)}
              >
                Title
                <Box component="span" sx={{ display: 'flex', justifyContent: 'center' }}>
                  {props.sortedByTitle ? <KeyBoardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </Box>
              </TableCell>
              <TableCell
                sx={{ border: 2 }}
                align="center"
                style={{ color: 'white', fontWeight: 'bold' }}
              >
                Quantity
              </TableCell>
              <TableCell
                sx={{ border: 2 }}
                align="center"
                style={{ color: 'white', fontWeight: 'bold' }}
              >
                Ship Date
              </TableCell>
              <TableCell
                sx={{ border: 2 }}
                align="center"
                style={{ color: 'white', fontWeight: 'bold' }}
              >
                Priority
              </TableCell>
              <TableCell
                sx={{ border: 2, cursor: 'pointer' }}
                align="center"
                style={{ color: 'white', fontWeight: 'bold' }}
                onClick={() => props.handleNoteSortClick()}
              >
                Notes
                <Box component="span" sx={{ display: 'flex', justifyContent: 'center' }}>
                  {props.sortedByNote ? <KeyBoardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.pdfItems.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  align="center"
                  sx={{ py: 5, color: 'text.secondary', fontStyle: 'italic', fontSize: '0.95rem' }}
                >
                  No orders found. Use the search above to find orders.
                </TableCell>
              </TableRow>
            ) : (
              props.pdfItems.map((row, index) =>
                index > props.page * 25 - 1 || index < props.page * 25 - 25
                  ? null
                  : row.FileContents.map((item, index) => {
                      const isLastInGroup = index === row.FileContents.length - 1;
                      const groupSx = isLastInGroup ? GROUP_SEPARATOR_SX : {};

                      return (
                        <TableRow key={`${row.FileId}-${index}`}>
                          {index === 0 ? (
                            <TableCell
                              align="center"
                              rowSpan={row.FileContents.length}
                              style={{
                                padding: '15px',
                                fontWeight: 'bold',
                                borderColor: '#4588f2'
                              }}
                              sx={{
                                bgcolor: row.Checked ? '#e8f4fd' : '',
                                pl: '1vh',
                                border: 1,
                                ...GROUP_SEPARATOR_SX
                              }}
                            >
                              <div
                                style={{
                                  paddingBottom: '8px',
                                  fontSize: '15px'
                                }}
                              >
                                {props.renderSwitch ? (
                                  <Switch
                                    value={row.FileId}
                                    checked={row.Checked}
                                    onClick={handleSelected}
                                  ></Switch>
                                ) : null}
                              </div>
                              {row.FileContents[0].OrderNumber}
                            </TableCell>
                          ) : null}
                          <TableCell
                            style={{
                              wordBreak: 'break-word',
                              borderColor: 'darkgray'
                            }}
                            sx={{
                              p: '1vh',
                              bgcolor: row.Checked ? '#e8f4fd' : ROW_ALT_BG,
                              ...groupSx
                            }}
                          >
                            <span style={{ fontWeight: 'bold' }}>{`${index + 1}.`}&nbsp;</span>
                            {`${item.Title}`}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              borderColor: 'darkgray',
                              bgcolor: row.Checked ? '#e8f4fd' : '',
                              ...groupSx
                            }}
                          >
                            {item.Quantity}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              borderColor: 'darkgray',
                              bgcolor: row.Checked ? '#e8f4fd' : ROW_ALT_BG,
                              ...groupSx
                            }}
                          >
                            {item.ShipDate}
                          </TableCell>
                          {index === 0 ? (
                            <TableCell
                              align="center"
                              sx={{
                                bgcolor: row.Checked ? '#e8f4fd' : '',
                                border: '1px solid darkgray',
                                ...GROUP_SEPARATOR_SX
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
                          {index === 0 ? (
                            <TableCell
                              align="center"
                              sx={{
                                borderColor: 'darkgray',
                                bgcolor: row.Checked ? '#e8f4fd' : ROW_ALT_BG,
                                borderLeft: 1,
                                ...GROUP_SEPARATOR_SX
                              }}
                              rowSpan={row.FileContents.length}
                              onClick={() => handleNoteClick(row.FileId, row.note || '')}
                            >
                              <IconButton>
                                {row.note ? (
                                  <NoteIcon fontSize="large" sx={{ color: '#4188f2' }} />
                                ) : (
                                  <NoteAddIcon fontSize="large" />
                                )}
                              </IconButton>
                            </TableCell>
                          ) : null}
                        </TableRow>
                      );
                    })
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2} alignItems="center" sx={{ mb: '2vh', mt: '2vh' }}>
        <Pagination
          count={pageCount}
          size="large"
          page={props.page}
          onChange={handleChange}
          color="primary"
          variant="outlined"
          sx={{ color: 'white' }}
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
