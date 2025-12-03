import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { Fragment, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SendIcon from "@mui/icons-material/Send";
import { Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

const Search = ({
  setIsLoading,
  pdfItems,
  handleSearch,
  isLoading,
  renderSelected,
  tabValue,
}) => {
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setSearchText("");
    handleSearch(searchText);
  }, []);

  const handleSearchClick = (e) => {
    e.preventDefault();
    setIsLoading(true);
    handleSearch(searchText);
  };

  return (
    <Fragment>
      <Box alignItems="center" justifyContent="center">
        <form onSubmit={handleSearchClick}>
          <Input
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            sx={{ width: "50%", pt: "2%" }}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            endIcon={<SendIcon />}
            sx={{ ml: "1vh", mb: "1vh", fontWeight: "bold", bgcolor: "black" }}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Search"}
          </Button>
        </form>
      </Box>
      <Stack
        direction="row"
        spacing={2}
        sx={{ pt: "1%", display: "flex", pb: "1%" }}
        alignItems="center"
        justifyContent="center"
      >
        {isLoading ? (
          <Box component="span" sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        ) : renderSelected ? (
          <Box component="span" sx={{ fontSize: 24, color: "black" }}>
            {pdfItems.filter((item) => item.Checked !== false).length} Order(s)
            Selected | {pdfItems.length} Order(s) Total
          </Box>
        ) : (
          <Box component="span" sx={{ fontSize: 24, color: "black" }}>
            {pdfItems.length} {tabValue} Order(s)
          </Box>
        )}
      </Stack>
    </Fragment>
  );
};

export default Search;
