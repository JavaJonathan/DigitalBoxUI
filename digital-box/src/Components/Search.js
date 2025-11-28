import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { Fragment, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SendIcon from "@mui/icons-material/Send";
import { Box, IconButton, Tooltip } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterModal from "./FilterModal";

const Search = ({
  setIsLoading,
  pdfItems,
  handleSearch,
  renderSelected,
  tabValue,
}) => {
  const [searchText, setSearchText] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [textSearchTypeFilter, setTextSearchTypeFilter] = useState("orders");
  const [marketplaceFilter, setMarketplaceFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState(false);

  useEffect(() => {
    setSearchText("");
    handleSearch(searchText, {
      textSearchTypeFilter: textSearchTypeFilter,
      marketplaceFilter: marketplaceFilter,
      priorityFilter: priorityFilter,
    });
  }, []);

  const handleSearchClick = (e) => {
    e.preventDefault();
    setIsLoading(true);
    handleSearch(searchText, {
      textSearchTypeFilter: textSearchTypeFilter,
      marketplaceFilter: marketplaceFilter,
      priorityFilter: priorityFilter,
    });
  };

  const handleFilterOpen = () => {
    setFilterModalOpen(true);
  };

  const handleFilterClose = () => {
    setFilterModalOpen(false);
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
            sx={{
              ml: "1vh",
              mr: "1vh",
              fontWeight: "bold",
              bgcolor: "black",
              "& .MuiButton-root": { minWidth: 25 },
            }}
          >            
            <SendIcon fontSize="small" />
          </Button>
          {
            !tabValue ? (
              <Tooltip title="Search Filters" placement="top">
                <IconButton onClick={handleFilterOpen} sx={{ color: "#4188f2" }}>
                  <FilterListIcon />
                </IconButton>
              </Tooltip>
            ) : null
          }
        </form>
      </Box>
      <Stack
        direction="row"
        spacing={2}
        sx={{ pt: "1%", display: "flex", pb: "1%" }}
        alignItems="center"
        justifyContent="center"
      >
        {renderSelected ? (
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
      <FilterModal
        open={filterModalOpen}
        handleClose={handleFilterClose}
        setTextSearchTypeFilter={setTextSearchTypeFilter}
        setMarketplaceFilter={setMarketplaceFilter}
        setPriorityFilter={setPriorityFilter}
        textSearchTypeFilter={textSearchTypeFilter}
        marketplaceFilter={marketplaceFilter}
        priorityFilter={priorityFilter}
      />
    </Fragment>
  );
};

export default Search;
