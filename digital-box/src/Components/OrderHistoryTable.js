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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyBoardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, IconButton } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import UndoShippedOrderModal from './UndoShippedOrderModal';
import UndoCancelledOrderModal from './UndoCancelledOrderModal';

const OrderHistoryTable = props => {
  const [pageCount, setPageCount] = useState(1);
  const [undoShipModalOpen, setUndoShipModalOpen] = useState(false);
  const [undoCancelModalOpen, setUndoCancelModalOpen] = useState(false);
  const [currentFileId, setCurrentFileId] = useState('');

  const handleUndoShipClick = fileId => {
    setCurrentFileId(fileId);
    setUndoShipModalOpen(true);
  };

  const handleUndoShipClose = () => {
    setUndoShipModalOpen(false);
  };

  const handleUndoShip = () => {
    setUndoShipModalOpen(false);
    props.handleUndoShip(currentFileId);
  };

  const handleUndoCancelClick = fileId => {
    setCurrentFileId(fileId);
    setUndoCancelModalOpen(true);
  };

  const handleUndoCancelClose = () => {
    setUndoCancelModalOpen(false);
  };

  const handleUndoCancel = () => {
    setUndoCancelModalOpen(false);
    props.handleUndoCancel(currentFileId);
  };

  const handleUndoClick = row => {
    getColumnName() === 'Shipped On'
      ? handleUndoShipClick(row.FileId)
      : handleUndoCancelClick(row.FileId);
  };

  const handleChange = (event, value) => {
    props.setPage(value);
  };

  useEffect(() => {
    getAmountOfPages();
  }, [props.pdfItems]);

  useEffect(() => {
    let newPdfItems = props.pdfItems.map(item => {
      return {
        ...item,
        Checked: false
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

  const getColumnName = () => {
    if (props.tabValue === undefined) {
      return 'Ship Date';
    } else if (props.tabValue === 0) {
      return 'Shipped On';
    } else {
      return 'Cancelled On';
    }
  };

  const getDateColumnValue = (order, orderItem) => {
    if (props.tabValue === undefined) {
      return orderItem.ShipDate;
    } else if (props.tabValue === 0) {
      return order.shippedOn;
    } else {
      return order.canceledOn;
    }
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          flexGrow: 1,
          maxWidth: '94%',
          ml: '3%',
          mr: '3%',
          mt: '.5%',
          boxShadow: 10,
          borderRadius: '20px'
        }}
      >
        <Table sx={{ whiteSpace: 'normal', borderColor: 'grey' }}>
          <TableHead
            style={{
              background:
                'linear-gradient(90deg, rgba(69,136,242,1) 12%, rgba(7,140,252,1) 46%, rgba(6,0,96,1) 94%)'
            }}
          >
            <TableRow sx={{ border: 2, whiteSpace: 'normal' }}>
              <TableCell
                sx={{ border: 2 }}
                style={{ color: 'white', fontFamily: 'Alfa Slab One' }}
                className="cell"
              >
                Order Number
              </TableCell>
              <TableCell
                sx={{ border: 2, cursor: 'pointer' }}
                style={{ color: 'white', fontFamily: 'Alfa Slab One' }}
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
                style={{ color: 'white', fontFamily: 'Alfa Slab One' }}
              >
                Quantity
              </TableCell>
              <TableCell
                sx={{ border: 2 }}
                align="center"
                style={{ color: 'white', fontFamily: 'Alfa Slab One' }}
              >
                {getColumnName()}
              </TableCell>
              <TableCell
                sx={{ border: 2 }}
                align="center"
                style={{ color: 'white', fontFamily: 'Alfa Slab One' }}
              >
                Undo?
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.pdfItems.map((row, index) =>
              index > props.page * 25 - 1 || index < props.page * 25 - 25
                ? null
                : row.FileContents.map((item, index) => (
                    <TableRow>
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
                            pl: '1vh',
                            border: 1
                          }}
                        >
                          {row.FileContents[0].OrderNumber}
                        </TableCell>
                      ) : null}
                      <TableCell
                        style={{
                          wordBreak: 'break-word',
                          borderColor: 'darkgray'
                        }}
                        sx={{
                          p: '1vh'
                        }}
                      >
                        <span style={{ fontWeight: 'bold' }}>{`${index + 1}.`}&nbsp;</span>
                        {`${item.Title}`}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          borderColor: 'darkgray'
                        }}
                      >
                        {item.Quantity}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          borderColor: 'darkgray'
                        }}
                      >
                        {getDateColumnValue(row, item)}
                      </TableCell>
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
                            pl: '1vh',
                            border: 1
                          }}
                        >
                          <IconButton onClick={() => handleUndoClick(row)}>
                            <ReplayIcon />
                          </IconButton>
                        </TableCell>
                      ) : null}
                    </TableRow>
                  ))
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
      <UndoShippedOrderModal
        open={undoShipModalOpen}
        handleClick={handleUndoShip}
        handleClose={handleUndoShipClose}
      />
      <UndoCancelledOrderModal
        open={undoCancelModalOpen}
        handleClick={handleUndoCancel}
        handleClose={handleUndoCancelClose}
      />
    </>
  );
};

export default OrderHistoryTable;
