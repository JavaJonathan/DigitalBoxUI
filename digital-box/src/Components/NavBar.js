import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import UploadFileIcon from "@mui/icons-material/UploadFile";

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

  const handleReportUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "text/csv" && !file.name.toLowerCase().endsWith(".csv")) {
      alert("Only CSV files are allowed");
      event.target.value = "";
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    props.handleGenerateReport(formData);
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
          <Button
            component="label"
            variant="contained"
            size="small"
            sx={{
              position: "absolute",
              fontWeight: "bold",
              right: "2vw",
              bgcolor: "#4188f2",
            }}
          >
            <input
              type="file"
              accept=".csv,text/csv"
              style={{ display: "none" }}
              onChange={handleReportUpload}
            ></input>
            Shippable Items
            <UploadFileIcon sx={{ ml: 0.5 }} fontSize="small" />
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
