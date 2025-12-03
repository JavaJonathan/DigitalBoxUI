import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import RefreshIcon from '@mui/icons-material/Refresh';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend';
import * as HttpHelper from './HttpHelper';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import ShipOrdersModal from './ShipModal';
import CancelOrdersModal from './CancelModal';
import SyncDatabaseModal from './SyncDatabaseModal';

export default function ButtonContainer(props) {
  const [cancelOrderModalOpen, setCancelOrderModalOpen] = useState(false);
  const [shipOrderModalOpen, setShipOrderModalOpen] = useState(false);
  const [syncDatabaseModalOpen, setSyncDatabaseModalOpen] = useState(false);
  const orders = props.pdfItems.filter(item => item.Checked !== false);
  const disabled = orders.length < 1;

  const handleCancelClick = async () => {
    if (orders.length < 1) return;
    setCancelOrderModalOpen(true);
  };

  const handleCancelClose = async () => {
    setCancelOrderModalOpen(false);
  };

  const handleCancelOrders = async () => {
    setCancelOrderModalOpen(false);

    let cancelledIds = [];
    orders.forEach(order => {
      cancelledIds.push(order.FileId);
    });
    await HttpHelper.cancelOrders(
      props.setPdfItems,
      props.setMessage,
      cancelledIds,
      props.setAuthToken
    );
  };

  const handleShipClick = async () => {
    setShipOrderModalOpen(true);
  };

  const handleShipClose = async () => {
    setShipOrderModalOpen(false);
  };

  const handleShipOrders = async () => {
    setShipOrderModalOpen(false);

    let shippedIds = [];
    orders.forEach(order => {
      shippedIds.push(order.FileId);
    });
    props.setMessage('Shipping... please wait a moment while we download your requested orders.');
    await HttpHelper.shipOrders(
      props.setPdfItems,
      props.setMessage,
      shippedIds,
      props.setAuthToken
    );
  };

  const handleSelectAll = async () => {
    let pagedItems = props.pdfItems.filter((item, index) => {
      return !(index > props.page * 25 - 1 || index < props.page * 25 - 25);
    });
    let orders = [];

    if (pagedItems.every(pagedItem => pagedItem.Checked)) {
      orders = props.pdfItems.map((item, index) => {
        if (index > props.page * 25 - 1 || index < props.page * 25 - 25) {
          return item;
        } else {
          return { ...item, Checked: false };
        }
      });
    } else {
      orders = props.pdfItems.map((item, index) => {
        if (index > props.page * 25 - 1 || index < props.page * 25 - 25) {
          return item;
        } else {
          return { ...item, Checked: true };
        }
      });
    }
    props.setPdfItems(orders);
  };

  const handleSyncDatabaseClick = () => {
    setSyncDatabaseModalOpen(true);
  };

  const handleSyncDatabaseClose = () => {
    setSyncDatabaseModalOpen(false);
  };

  const handleSyncDatabase = () => {
    setSyncDatabaseModalOpen(false);
    props.handleSyncDatabase();
  };

  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }} alignItems="center" justifyContent="center">
      <Tooltip title="Select All" placement="top">
        <Fab
          sx={{
            bgcolor: 'black',
            fontWeight: 'bold',
            color: 'white',
            '&:hover': {
              bgcolor: '#4188f2'
            }
          }}
          onClick={handleSelectAll}
        >
          <CheckBoxIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="Ship" placement="top">
        <Fab
          sx={{
            bgcolor: 'green',
            fontWeight: 'bold',
            color: 'white',
            '&:hover': {
              bgcolor: 'black'
            },
            '&:disabled': {
              bgcolor: '#87f3be'
            }
          }}
          onClick={handleShipClick}
          disabled={disabled}
        >
          <LocalShippingIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="Cancel" placement="top">
        <Fab
          sx={{
            bgcolor: 'red',
            fontWeight: 'bold',
            color: 'white',
            '&:hover': {
              bgcolor: 'black'
            },
            '&:disabled': {
              bgcolor: '#db5858'
            }
          }}
          onClick={handleCancelClick}
          disabled={disabled}
        >
          <CancelScheduleSendIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="Sync Database" placement="top">
        <Fab
          sx={{
            bgcolor: 'black',
            fontWeight: 'bold',
            color: 'white',
            '&:hover': {
              bgcolor: '#4188f2'
            }
          }}
          onClick={handleSyncDatabaseClick}
        >
          <RefreshIcon />
        </Fab>
      </Tooltip>
      <ShipOrdersModal
        open={shipOrderModalOpen}
        handleClick={handleShipOrders}
        handleClose={handleShipClose}
        shippedOrderCount={orders.length}
      />
      <CancelOrdersModal
        open={cancelOrderModalOpen}
        handleClick={handleCancelOrders}
        handleClose={handleCancelClose}
        cancelledOrderCount={orders.length}
      />
      <SyncDatabaseModal
        open={syncDatabaseModalOpen}
        handleClick={handleSyncDatabase}
        handleClose={handleSyncDatabaseClose}
      />
    </Box>
  );
}
