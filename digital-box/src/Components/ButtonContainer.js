import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend';
import * as HttpHelper from './HttpHelper';
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
    props.setIsLoading(true);

    let cancelledIds = [];
    orders.forEach(order => {
      cancelledIds.push(order.FileId);
    });
    await HttpHelper.cancelOrders(
      props.setPdfItems,
      props.setMessage,
      cancelledIds,
      props.setAuthToken,
      props.setIsLoading
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
    props.setIsLoading(true);

    let shippedIds = [];
    orders.forEach(order => {
      shippedIds.push(order.FileId);
    });
    props.setMessage('Shipping... please wait a moment while we download your requested orders.');
    await HttpHelper.shipOrders(
      props.setPdfItems,
      props.setMessage,
      shippedIds,
      props.setAuthToken,
      props.setIsLoading
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
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mx: '3%',
        my: 1.5,
        gap: 1
      }}
    >
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          variant="outlined"
          startIcon={<CheckBoxIcon />}
          onClick={handleSelectAll}
          sx={{
            fontWeight: 'bold',
            borderColor: '#374151',
            color: '#374151',
            '&:hover': {
              borderColor: '#4188f2',
              color: '#4188f2',
              bgcolor: 'rgba(65,136,242,0.06)'
            }
          }}
        >
          Select Page
        </Button>
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={handleSyncDatabaseClick}
          sx={{
            fontWeight: 'bold',
            borderColor: '#4188f2',
            color: '#4188f2',
            '&:hover': { bgcolor: 'rgba(65,136,242,0.06)' }
          }}
        >
          Sync Database
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          variant="contained"
          startIcon={<LocalShippingIcon />}
          onClick={handleShipClick}
          disabled={disabled}
          sx={{
            fontWeight: 'bold',
            bgcolor: '#2e7d32',
            '&:hover': { bgcolor: '#1b5e20' },
            '&.Mui-disabled': { bgcolor: '#a5d6a7', color: 'white' }
          }}
        >
          {`Ship${orders.length > 0 ? ` (${orders.length})` : ''}`}
        </Button>
        <Button
          variant="contained"
          startIcon={<CancelScheduleSendIcon />}
          onClick={handleCancelClick}
          disabled={disabled}
          sx={{
            fontWeight: 'bold',
            bgcolor: '#c62828',
            '&:hover': { bgcolor: '#b71c1c' },
            '&.Mui-disabled': { bgcolor: '#ef9a9a', color: 'white' }
          }}
        >
          {`Cancel${orders.length > 0 ? ` (${orders.length})` : ''}`}
        </Button>
      </Box>

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
