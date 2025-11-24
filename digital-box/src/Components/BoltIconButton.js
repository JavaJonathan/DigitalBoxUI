import BoltIcon from "@mui/icons-material/Bolt";
import IconButton from "@mui/material/IconButton";
import { yellow } from "@mui/material/colors";
import CircularProgress from "@mui/material/CircularProgress";

const BoltIconButton = ({
  fileId,
  priority,
  handleTogglePriority,
  isLoading,
}) => {
  const handleClick = () => {
    handleTogglePriority(fileId, priority);
  };

  return (
    <IconButton onClick={handleClick}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <BoltIcon
          fontSize="large"
          sx={{ color: priority ? yellow[900] : "disabled" }}
        />
      )}
    </IconButton>
  );
};

export default BoltIconButton;
