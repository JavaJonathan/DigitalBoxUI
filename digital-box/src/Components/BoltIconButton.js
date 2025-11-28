import BoltIcon from "@mui/icons-material/Bolt";
import IconButton from "@mui/material/IconButton";
import { yellow } from "@mui/material/colors";
import { useState } from "react";
import PriorityModal from "./PriorityModal";

const BoltIconButton = ({
  fileId,
  priority,
  handleTogglePriority,
}) => {
  const [open, setOpen] = useState(false)
  const handleClick = () => {
    setOpen(true)
  }

  const handlePrioritySubmit = () => {
    setOpen(false)
    handleTogglePriority(fileId, priority);
  };

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <IconButton onClick={handleClick}>
        <BoltIcon
          fontSize="large"
          sx={{ color: priority ? yellow[900] : "disabled" }}
        />
      </IconButton>
      <PriorityModal open={open} handleClose={handleClose} handleClick={handlePrioritySubmit} priority={priority}></PriorityModal>
    </>
  );
};

export default BoltIconButton;
