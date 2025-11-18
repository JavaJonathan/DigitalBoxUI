import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import RefreshIcon from "@mui/icons-material/Refresh";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CancelScheduleSendIcon from "@mui/icons-material/CancelScheduleSend";
import * as HttpHelper from "./HttpHelper";
import Tooltip from "@mui/material/Tooltip";

export default function ButtonContainer(props) {
  const handleCancelClick = async () => {
    let orders = props.pdfItems.filter((item) => item.Checked !== false);

    if (orders.length < 1) return;

    let cancelledIds = [];
    orders.forEach((order) => {
      cancelledIds.push(order.FileId);
    });
    if (
      window.confirm(
        `Are you sure you want to cancel ${orders.length} order(s)?`
      )
    ) {
      await HttpHelper.cancelOrders(
        props.setPdfItems,
        props.setMessage,
        cancelledIds,
        props.setAuthToken
      );
    } else {
      //do nothing
    }
  };

  const handleShipClick = async () => {
    let orders = props.pdfItems.filter((item) => item.Checked !== false);

    if (orders.length < 1) return;

    let shippedIds = [];
    orders.forEach((order) => {
      shippedIds.push(order.FileId);
    });

    if (
      window.confirm(`Are you sure you want to ship ${orders.length} order(s)?`)
    ) {
      props.setMessage(
        "Shipping... please wait a moment while we download your requested orders."
      );
      await HttpHelper.shipOrders(
        props.setPdfItems,
        props.setMessage,
        shippedIds,
        props.setAuthToken
      );
    } else {
      // do nothing
    }
  };

  const handleSelectAll = async () => {
    let pagedItems = props.pdfItems.filter((item, index) => {
      return !(index > props.page * 25 - 1 || index < props.page * 25 - 25);
    });
    let orders = [];

    if (pagedItems.every((pagedItem) => pagedItem.Checked)) {
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

  const handleRefreshOrders = () => {
    if (
      window.confirm(
        `Are you sure you want to refresh the orders? This may take a moment.`
      )
    ) {
      props.handleRefreshOrders();
    } else {
      //do nothing
    }
  };

  return (
    <Box
      sx={{ "& > :not(style)": { m: 1 } }}
      alignItems="center"
      justifyContent="center"
    >
      <Tooltip title="Select All" placement="top">
        <Fab
          sx={{
            bgcolor: "black",
            fontWeight: "bold",
            color: "white",
            "&:hover": {
              bgcolor: "#4188f2",
            },
          }}
          onClick={handleSelectAll}
        >
          <CheckBoxIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="Ship" placement="top">
        <Fab
          sx={{
            bgcolor: "green",
            fontWeight: "bold",
            color: "white",
            "&:hover": {
              bgcolor: "black",
            },
          }}
          onClick={handleShipClick}
        >
          <LocalShippingIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="Cancel" placement="top">
        <Fab
          sx={{
            bgcolor: "red",
            fontWeight: "bold",
            color: "white",
            "&:hover": {
              bgcolor: "black",
            },
          }}
          onClick={handleCancelClick}
        >
          <CancelScheduleSendIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="Sync Database" placement="top">
        <Fab
          sx={{
            bgcolor: "black",
            fontWeight: "bold",
            color: "white",
            "&:hover": {
              bgcolor: "#4188f2",
            },
          }}
          onClick={handleRefreshOrders}
        >
          <RefreshIcon />
        </Fab>
      </Tooltip>
    </Box>
  );
}
