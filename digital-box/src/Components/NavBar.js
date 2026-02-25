import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ArticleIcon from '@mui/icons-material/Article';
import { IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import * as HttpHelper from './HttpHelper';
import CircularProgress from '@mui/material/CircularProgress';

const NavBar = props => {
  const [reportStatus, setReportStatus] = useState(false);

  useEffect(() => {
    HttpHelper.getReportStatus(setReportStatus);
  }, []);

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

  const handleReportUpload = event => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'text/csv' && !file.name.toLowerCase().endsWith('.csv')) {
      alert('Only CSV files are allowed');
      event.target.value = '';
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    props.handleGenerateReport(formData);
    setReportStatus(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{
          background:
            'linear-gradient(90deg, rgba(69,136,242,1) 12%, rgba(7,140,252,1) 46%, rgba(6,0,96,1) 94%)'
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontFamily: 'Alfa Slab One' }}
          >
            {'<DigitalBox />'}
          </Typography>
          {props.orderHistory ? (
            <Button
              variant="contained"
              size="small"
              onClick={handleHomeClick}
              sx={{
                position: 'absolute',
                bgcolor: 'black',
                fontWeight: 'bold'
              }}
            >
              Home 🏠
            </Button>
          ) : (
            <Button
              variant="contained"
              size="small"
              onClick={handleOrderHistoryClick}
              sx={{
                position: 'absolute',
                bgcolor: 'black',
                fontWeight: 'bold'
              }}
            >
              Order History 📋
            </Button>
          )}
          <div style={{ position: 'absolute', right: '2vw' }}>
            {reportStatus ? (
              <IconButton
                component="label"
                variant="contained"
                size="large"
                sx={{ color: '#4188f2' }}
                onClick={props.handleDownloadReportClick}
              >
                <ArticleIcon sx={{ ml: 0.5 }} />
              </IconButton>
            ) : (
              <CircularProgress sx={{ mr: 2 }} size={20} />
            )}
            <Button
              component="label"
              variant="contained"
              size="small"
              sx={{
                fontWeight: 'bold',
                bgcolor: '#4188f2'
              }}
              disabled={!reportStatus}
            >
              <input
                type="file"
                accept=".csv,text/csv"
                style={{ display: 'none' }}
                onChange={handleReportUpload}
              />              
              Shippable Items 📝
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
