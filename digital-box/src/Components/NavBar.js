import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";

const NavBar = (props) => {
  const handleOrderHistoryClick = () => {
    props.setIsLoading(true);
    props.setPdfItems([]);
    props.setOrderHistory(true);
    props.setSortedByTitle(false);
  };

  const handleHomeClick = () => {
    props.setIsLoading(true);
    props.setPdfItems([]);
    props.setOrderHistory(false);
    props.setSortedByTitle(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{
          background:
            "linear-gradient(90deg, rgba(69,136,242,1) 12%, rgba(7,140,252,1) 46%, rgba(6,0,96,1) 94%)",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontFamily: "Alfa Slab One" }}
          >
            {"<DigitalBox />"}
          </Typography>
          {props.orderHistory ? (
            <Button
              variant="contained"
              size="small"
              color="success"
              onClick={handleHomeClick}
              sx={{
                position: "absolute",
                bgcolor: "black",
                fontWeight: "bold",
              }}
            >
              Back Home
            </Button>
          ) : (
            <Button
              variant="contained"
              size="small"
              onClick={handleOrderHistoryClick}
              sx={{
                position: "absolute",
                bgcolor: "black",
                fontWeight: "bold",
              }}
            >
              Order History
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
