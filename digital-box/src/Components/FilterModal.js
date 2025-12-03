import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const FilterModal = ({
  open,
  handleClose,
  textSearchTypeFilter,
  marketplaceFilter,
  priorityFilter,
  setTextSearchTypeFilter,
  setPriorityFilter,
  setMarketplaceFilter
}) => {
  const handleSelectChange = event => {
    setTextSearchTypeFilter(event.target.value);
  };

  const handlePriorityChange = event => {
    setPriorityFilter(event.target.value);
  };

  const handleMarketplaceChange = event => {
    setMarketplaceFilter(event.target.value);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>{'Search Filters 🤔'}</DialogTitle>
      <DialogContent>
        <div style={{ paddingTop: 5 }}>
          <FormControl fullWidth>
            <InputLabel>Text Search</InputLabel>
            <Select value={textSearchTypeFilter} label="Text Search" onChange={handleSelectChange}>
              <MenuItem value={'orders'}>Orders 💊</MenuItem>
              <MenuItem value={'notes'}>Notes 📄</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div style={{ paddingTop: 10 }}>
          <FormControl fullWidth>
            <InputLabel>Marketplace</InputLabel>
            <Select
              value={marketplaceFilter}
              label="Marketplace"
              onChange={handleMarketplaceChange}
            >
              <MenuItem value={'all'}>All</MenuItem>
              <MenuItem value={'walmart'}>Walmart</MenuItem>
              <MenuItem value={'amazon'}>Amazon</MenuItem>
              <MenuItem value={'shopify'}>Shopify</MenuItem>
              <MenuItem value={'ebay'}>eBay</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div style={{ paddingTop: 10 }}>
          <FormControl fullWidth>
            <InputLabel>Priority Orders</InputLabel>
            <Select value={priorityFilter} label="Priority Orders" onChange={handlePriorityChange}>
              <MenuItem value={false}>All Orders 👍🏼</MenuItem>
              <MenuItem value={true}>Priority Orders Only ⚡</MenuItem>
            </Select>
          </FormControl>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterModal;
