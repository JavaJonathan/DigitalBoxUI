import { useState } from 'react';
import Divider from '@mui/material/Divider';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Search from './Search';
import { green } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import OrderHistoryTable from './OrderHistoryTable';

const OrderHistory = ({
  pdfItems,
  setPdfItems,
  page,
  setPage,
  handleSortClick,
  isLoading,
  setIsLoading,
  handleCanceledSearch,
  handleShippedSearch,
  sortedByTitle,
  setSortedByTitle,
  handleUndoCancel,
  handleUndoShip
}) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabValueChange = (event, newValue) => {
    setTabValue(newValue);
    setSortedByTitle(false);
    setIsLoading(true);
    setPdfItems([]);
    newValue === 0 ? handleShippedSearch('') : handleCanceledSearch('');
  };
  const theme = createTheme({
    palette: {
      secondary: green
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Box component="div" sx={{ mt: 5 }}>
        Search {tabValue === 0 ? 'Shipped' : 'Canceled'} Orders
      </Box>
      <Search
        pdfItems={pdfItems}
        handleSearch={tabValue === 0 ? handleShippedSearch : handleCanceledSearch}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
        renderSelected={false}
        tabValue={tabValue === 0 ? 'Shipped' : 'Canceled'}
      />
      <Tabs value={tabValue} centered onChange={handleTabValueChange}>
        <Tab label="Shipped" sx={{ fontWeight: 'bold', color: 'green' }} />
        <Divider orientation="vertical" flexItem></Divider>
        <Tab label="Canceled" sx={{ fontWeight: 'bold', color: 'red' }} />
      </Tabs>
      <OrderHistoryTable
        pdfItems={pdfItems}
        setPdfItems={setPdfItems}
        page={page}
        setPage={setPage}
        handleSortClick={handleSortClick}
        sortedByTitle={sortedByTitle}
        tabValue={tabValue}
        handleUndoCancel={handleUndoCancel}
        handleUndoShip={handleUndoShip}
      />
    </ThemeProvider>
  );
};

export default OrderHistory;
