import './App.css';
import React, { Fragment, useEffect, useState } from 'react';
import * as HttpHelper from './Components/HttpHelper';
import NavBar from './Components/NavBar';
import AlertUI from './Components/Alert';
import GoogleIcon from '@mui/icons-material/Google';
import Button from '@mui/material/Button';
import Search from './Components/Search';
import '@fontsource/alfa-slab-one';
import GlobalStyles from '@mui/material/GlobalStyles';
import OrderHistory from './Components/OrderHistory';
import { useGoogleLogin } from '@react-oauth/google';
import ButtonContainer from './Components/ButtonContainer';
import OrderTable from './Components/OrderTable';
import { Backdrop, CircularProgress } from '@mui/material';

function App() {
  //state defined in App.js is gloabl and passed via props, we could use this opportunity to implement the Redux pattern
  const [pdfItems, setPdfItems] = useState([]);
  const [authToken, setAuthToken] = useState('');
  const [signedIn, setSignedIn] = useState(false);
  const [message, setMessage] = useState('');
  const [page, setPage] = useState(1);
  const [orderHistory, setOrderHistory] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sortedByTitle, setSortedByTitle] = useState(false);
  const [sortedByNote, setSortedByNote] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem('DigitalBoxRefreshToken');
    if (!token) setSignedIn(false)
    else setSignedIn(true)
  }, []);

  useEffect(() => {
    if (authToken) localStorage.setItem('DigitalBoxRefreshToken', authToken);
  }, [authToken]);

  const login = useGoogleLogin({
    flow: "auth-code",
    redirect_uri: "http://localhost:3000",
    scope:
      'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/drive.appfolder https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.resource https://www.googleapis.com/auth/drive.metadata https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/drive.readonly.metadata https://www.googleapis.com/auth/drive.photos.readonly https://www.googleapis.com/auth/drive.readonly',
      access_type: "offline",
      prompt: "consent",
    onSuccess: tokenResponse => {
      localStorage.setItem('DigitalBoxRefreshCode', `${tokenResponse.code}`);
      setSignedIn(true);
    }
  });

  const handleUndoCancel = async (fileId, name) => {
    setIsLoading(true);
    await HttpHelper.undoCancelledOrder(
      setPdfItems,
      setMessage,
      fileId,
      name,
      setIsLoading,
      setAuthToken
    );
  };

  const handleUndoShip = async (fileId, name) => {
    setIsLoading(true);
    await HttpHelper.undoShippedOrder(setPdfItems, setMessage, fileId, name, setIsLoading, setAuthToken);
  };

  const handleDownloadReportClick = () => {
    HttpHelper.downloadReport();
  };

  const handleAddNote = (fileId, note) => {
    setIsLoading(true);
    HttpHelper.addNoteToOrder(setPdfItems, setMessage, fileId, note, setIsLoading, setAuthToken);
  };

  const handleTogglePriority = (fileId, priority) => {
    setIsLoading(true);
    HttpHelper.togglePriority(
      setPdfItems,
      setMessage,
      fileId,
      priority,
      setIsLoading,
      setAuthToken
    );
  };

  const handleSearch = (searchValue, filters) => {
    HttpHelper.searchOrders(
      setPdfItems,
      setMessage,
      searchValue,
      filters,
      setIsLoading,
      setAuthToken
    );
    setPage(1);
    setSortedByTitle(false);
    setSortedByNote(false);
  };

  const handleCanceledSearch = searchValue => {
    HttpHelper.searchCanceledOrders(
      setPdfItems,
      setMessage,
      searchValue,
      setIsLoading,
      setAuthToken
    );
    setPage(1);
  };

  const handleShippedSearch = searchValue => {
    HttpHelper.searchShippedOrders(
      setPdfItems,
      setMessage,
      searchValue,
      setIsLoading,
      setAuthToken
    );
    setPage(1);
  };

  const handleSyncDatabase = () => {
    HttpHelper.refreshOrders(setPdfItems, setMessage, '', setIsLoading, setAuthToken);
  };

  const handleGenerateReport = formData => {
    HttpHelper.generateReport(setPdfItems, setMessage, setIsLoading, setAuthToken, formData);
  };

  const handleNoteSortClick = () => {
    let localPdfItems = pdfItems.map(item => {
      return { ...item, Checked: false };
    });

    if (sortedByNote) {
      localPdfItems.sort((itemA, itemB) => {
        return !!itemA.note - !!itemB.note;
      });
      setSortedByNote(false);
    } else {
      setSortedByTitle(false);
      setSortedByNote(true);
      localPdfItems.sort((itemA, itemB) => {
        return !!itemB.note - !!itemA.note;
      });
    }
    setPdfItems(localPdfItems);
  };

  const handleTitleSortClick = tabValue => {
    let localPdfItems = pdfItems.map(item => {
      return { ...item, Checked: false };
    });

    if (sortedByTitle && tabValue !== undefined) {
      if (tabValue === 0) {
        localPdfItems.sort((a, b) => Date.parse(b.shippedOn) - Date.parse(a.shippedOn));
      } else {
        localPdfItems.sort((a, b) => Date.parse(b.canceledOn) - Date.parse(a.canceledOn));
      }
      setPdfItems(localPdfItems);
      setSortedByTitle(false);
    } else if (sortedByTitle && tabValue === undefined) {
      localPdfItems.sort((a, b) => {
        if (a.FileContents[0].ShipDate === '') {
          return Date.parse(a.FileContents[1].ShipDate) - Date.parse(b.FileContents[0].ShipDate);
        }

        return Date.parse(a.FileContents[0].ShipDate) - Date.parse(b.FileContents[0].ShipDate);
      });
      setPdfItems(localPdfItems);
      setSortedByTitle(false);
    } else {
      localPdfItems.sort((a, b) => {
        //put empty strings at the end of the list
        if (a.FileContents[0].ShipDate === '') {
          return 1;
        }
        if (b.FileContents[0].ShipDate === '') {
          return -1;
        }

        return (
          a.FileContents[0].Title.localeCompare(b.FileContents[0].Title) ||
          Date.parse(a.FileContents[0].ShipDate) - Date.parse(b.FileContents[0].ShipDate)
        );
      });
      setPdfItems(localPdfItems);
      setSortedByTitle(true);
      setSortedByNote(false);
    }
  };

  if (!signedIn) {
    return (
      <div className="App">
        <GlobalStyles
          styles={{
            body: {
              fontFamily: 'Alfa Slab One'
            }
          }}
        />
        <div
          style={{
            display: 'flex',
            flex: 1,
            minHeight: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'Alfa Slab One',
            fontSize: '72px',
            flexDirection: 'column',
            pb: '20px',
            background:
              'linear-gradient(90deg, rgba(69,136,242,1) 12%, rgba(7,140,252,1) 46%, rgba(6,0,96,1) 94%)'
          }}
        >
          {'<Digital Box />'}
          <br />
          <Button
            onClick={login}
            variant="contained"
            style={{ background: 'black' }}
            endIcon={<GoogleIcon fontSize="large" />}
          >
            Sign In With Google
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <GlobalStyles
        styles={{
          body: {
            'font-family': 'Alfa Slab One'
          }
        }}
      />
      <Fragment>
        <NavBar
          setIsLoading={setIsLoading}
          setOrderHistory={setOrderHistory}
          orderHistory={orderHistory}
          setPdfItems={setPdfItems}
          setSortedByTitle={setSortedByTitle}
          handleGenerateReport={handleGenerateReport}
          handleDownloadReportClick={handleDownloadReportClick}
        />
        {orderHistory ? (
          <Fragment>
            {message !== '' ? (
              <AlertUI propMessage={message} setMessage={setMessage} setSignedIn={setSignedIn} />
            ) : null}
            <OrderHistory
              pdfItems={pdfItems}
              setPdfItems={setPdfItems}
              page={page}
              setPage={setPage}
              handleSortClick={handleTitleSortClick}
              setIsLoading={setIsLoading}
              isLoading={isLoading}
              handleCanceledSearch={handleCanceledSearch}
              handleShippedSearch={handleShippedSearch}
              sortedByTitle={sortedByTitle}
              setSortedByTitle={setSortedByTitle}
              handleUndoCancel={handleUndoCancel}
              handleUndoShip={handleUndoShip}
            />
          </Fragment>
        ) : (
          <Fragment>
            {message !== '' ? (
              <AlertUI propMessage={message} setMessage={setMessage} setSignedIn={setSignedIn} />
            ) : null}
            <Search
              pdfItems={pdfItems}
              handleSearch={handleSearch}
              setIsLoading={setIsLoading}
              isLoading={isLoading}
              renderSelected={true}
            />
            <ButtonContainer
              page={page}
              pdfItems={pdfItems}
              setAuthToken={setAuthToken}
              setMessage={setMessage}
              setPdfItems={setPdfItems}
              handleSyncDatabase={handleSyncDatabase}
            />
            <OrderTable
              pdfItems={pdfItems}
              setPdfItems={setPdfItems}
              page={page}
              setPage={setPage}
              handleSortClick={handleTitleSortClick}
              renderSwitch={true}
              sortedByTitle={sortedByTitle}
              handleTogglePriority={handleTogglePriority}
              isLoading={isLoading}
              handleAddNote={handleAddNote}
              handleNoteSortClick={handleNoteSortClick}
              sortedByNote={sortedByNote}
            />
          </Fragment>
        )}
        <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={isLoading}>
          <CircularProgress size={100} color="primary" />
        </Backdrop>
      </Fragment>
    </div>
  );
}

export default App;
