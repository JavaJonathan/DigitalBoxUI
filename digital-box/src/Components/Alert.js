import { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';

const getSeverityAndMessage = propMessage => {
  if (propMessage.includes('Your search results are up to date as of'))
    return { severity: 'info', message: propMessage };
  if (propMessage.includes('Your search is missing some new orders.'))
    return { severity: 'warning', message: propMessage };
  if (propMessage.includes('successfully'))
    return { severity: 'success', message: `${propMessage} 🥳` };
  if (propMessage === 'Shipping... please wait a moment while we download your requested orders.')
    return { severity: 'warning', message: `${propMessage} 🫸🏾` };
  if (propMessage === 'Sorry, we encountered an error. Please try again.')
    return { severity: 'error', message: `${propMessage} 🙃` };
  if (propMessage === 'Some of your orders have already been shipped or cancelled. Please re-sync the database.')
    return { severity: 'warning', message: propMessage };
  if (propMessage === 'You have been logged out, please log in again and retry.')
    return { severity: 'error', message: propMessage };
  if (propMessage === 'Some of your files were not downloaded. Please check the api console to see which files failed.')
    return { severity: 'warning', message: propMessage };
  if (propMessage === 'Generating report.. Once completed, you can refresh the page and click the Paper Icon to download.')
    return { severity: 'warning', message: `${propMessage} ⌛` };
  if (propMessage === 'Undo successful.')
    return { severity: 'success', message: `${propMessage} 😌` };
  return null;
};

const AlertUI = props => {
  const [alertState, setAlertState] = useState({ open: false, severity: '', message: '' });

  useEffect(() => {
    if (!props.propMessage) return;

    const result = getSeverityAndMessage(props.propMessage);
    if (!result) return;

    setAlertState({ open: true, severity: result.severity, message: result.message });

    if (props.propMessage === 'You have been logged out, please log in again and retry.') {
      props.setSignedIn(false);
      props.setMessage('');
    }
  }, [props.propMessage]);

  return alertState.open ? (
    <Alert
      onClose={() => {
        setAlertState(prev => ({ ...prev, open: false }));
        props.setMessage('');
      }}
      severity={alertState.severity}
      style={{
        position: 'fixed',
        zIndex: 99999,
        marginTop: '3vh',
        fontFamily: 'Alfa Slab One'
      }}
      variant="filled"
    >
      {alertState.message}
    </Alert>
  ) : null;
};

export default AlertUI;
