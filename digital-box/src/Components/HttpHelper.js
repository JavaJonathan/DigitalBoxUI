export async function cancelOrders(setPdfItems, setMessage, orders, setAuthToken) {
  let responseBody = '';

  await fetch('http://localhost:2020/cancel', {
    method: 'POST',
    headers: {
      'content-type': 'text/plain'
    },
    body: JSON.stringify({
      token: {
        access_token: localStorage.getItem('DigitalBoxToken')
      },
      Orders: orders,
      Action: 'cancel'
    })
  })
    .then(response => response.json().then(r => (responseBody = r)))
    .then(() => {
      setMessage(responseBody.Message);
      setPdfItems(responseBody.Orders);
      setAuthToken(responseBody.Token.token);
    });
}

export async function shipOrders(setPdfItems, setMessage, orders, setAuthToken) {
  let responseBody = '';

  await fetch('http://localhost:2020/ship', {
    method: 'POST',
    headers: {
      'content-type': 'text/plain'
    },
    body: JSON.stringify({
      token: {
        access_token: localStorage.getItem('DigitalBoxToken')
      },
      Orders: orders,
      Action: 'ship'
    })
  })
    .then(response => response.json().then(r => (responseBody = r)))
    .then(() => {
      setMessage(responseBody.Message);
      setPdfItems(responseBody.Orders);
    });
}

export async function searchOrders(
  setPdfItems,
  setMessage,
  searchValue,
  filters,
  setIsLoading,
  setAuthToken
) {
  let responseBody = '';

  console.log(filters);

  await fetch('http://localhost:2020/search', {
    method: 'POST',
    headers: {
      'content-type': 'text/plain'
    },
    body: JSON.stringify({
      token: {
        access_token: localStorage.getItem('DigitalBoxToken')
      },
      searchValue: searchValue,
      filters: filters
    })
  })
    .then(response => response.json().then(r => (responseBody = r)))
    .then(() => {
      setMessage(responseBody.Message);
      setPdfItems(responseBody.Orders);
      setIsLoading(false);
      setAuthToken(responseBody.Token.token);
    });
}

export async function searchShippedOrders(
  setPdfItems,
  setMessage,
  searchValue,
  setIsLoading,
  setAuthToken
) {
  let responseBody = '';

  await fetch('http://localhost:2020/shippedOrders', {
    method: 'POST',
    headers: {
      'content-type': 'text/plain'
    },
    body: JSON.stringify({
      token: {
        access_token: localStorage.getItem('DigitalBoxToken')
      },
      searchValue: searchValue
    })
  })
    .then(response => response.json().then(r => (responseBody = r)))
    .then(() => {
      setMessage(responseBody.Message);
      setPdfItems(responseBody.Orders);
      setIsLoading(false);
      setAuthToken(responseBody.Token.token);
    });
}

export async function searchCanceledOrders(
  setPdfItems,
  setMessage,
  searchValue,
  setIsLoading,
  setAuthToken
) {
  let responseBody = '';

  await fetch('http://localhost:2020/canceledOrders', {
    method: 'POST',
    headers: {
      'content-type': 'text/plain'
    },
    body: JSON.stringify({
      token: {
        access_token: localStorage.getItem('DigitalBoxToken')
      },
      searchValue: searchValue
    })
  })
    .then(response => response.json().then(r => (responseBody = r)))
    .then(() => {
      setMessage(responseBody.Message);
      setPdfItems(responseBody.Orders);
      setIsLoading(false);
      setAuthToken(responseBody.Token.token);
    });
}

export async function refreshOrders(
  setPdfItems,
  setMessage,
  searchValue,
  setIsLoading,
  setAuthToken
) {
  let responseBody = '';

  await fetch('http://localhost:2020/', {
    method: 'POST',
    headers: {
      'content-type': 'text/plain'
    },
    body: JSON.stringify({
      token: {
        access_token: localStorage.getItem('DigitalBoxToken')
      },
      Filter: searchValue
    })
  })
    .then(response => response.json().then(r => (responseBody = r)))
    .then(() => {
      setMessage(responseBody.Message);
      setPdfItems(responseBody.Orders);
      setIsLoading(false);
      setAuthToken(responseBody.Token.token);
    });
}

export async function togglePriority(
  setPdfItems,
  setMessage,
  fileId,
  priority,
  setIsLoading,
  setAuthToken
) {
  let responseBody = '';

  await fetch('http://localhost:2020/priority', {
    method: 'POST',
    headers: {
      'content-type': 'text/plain'
    },
    body: JSON.stringify({
      token: {
        access_token: localStorage.getItem('DigitalBoxToken')
      },
      priority: priority,
      FileId: fileId
    })
  })
    .then(response => response.json().then(r => (responseBody = r)))
    .then(() => {
      setMessage(responseBody.Message);
      setPdfItems(responseBody.Orders);
      setIsLoading(false);
      setAuthToken(responseBody.Token.token);
    });
}

export async function generateReport(
  setPdfItems,
  setMessage,
  setIsLoading,
  setAuthToken,
  formData
) {
  let responseBody = '';

  formData.append(
    'token',
    JSON.stringify({
      access_token: localStorage.getItem('DigitalBoxToken')
    })
  );

  await fetch('http://localhost:2020/generateReport', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json().then(r => (responseBody = r)))
    .then(() => {
      setMessage(responseBody.Message);
      setPdfItems(responseBody.Orders);
      setIsLoading(false);
      setAuthToken(responseBody.Token.token);
    });
}

export async function addNoteToOrder(
  setPdfItems,
  setMessage,
  fileId,
  note,
  setIsLoading,
  setAuthToken
) {
  let responseBody = '';

  await fetch('http://localhost:2020/addNote', {
    method: 'POST',
    headers: {
      'content-type': 'text/plain'
    },
    body: JSON.stringify({
      token: {
        access_token: localStorage.getItem('DigitalBoxToken')
      },
      note: note,
      FileId: fileId
    })
  })
    .then(response => response.json().then(r => (responseBody = r)))
    .then(() => {
      setMessage(responseBody.Message);
      setPdfItems(responseBody.Orders);
      setIsLoading(false);
      setAuthToken(responseBody.Token.token);
    });
}

export async function downloadReport() {
  const response = await fetch('http://localhost:2020/downloadReport', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      token: {
        access_token: localStorage.getItem('DigitalBoxToken')
      }
    })
  });

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);

  const disposition = response.headers.get('Content-Disposition');
  let filename = 'DigitalBoxReport.csv';

  if (disposition && disposition.includes('filename=')) {
    filename = disposition.split('filename=')[1].replace(/"/g, '');
  }

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();

  window.URL.revokeObjectURL(url);
}

export async function getReportStatus(setReportStatus) {
  let responseBody = '';

  await fetch('http://localhost:2020/reportStatus', {
    method: 'GET'
  })
    .then(response => response.json().then(r => (responseBody = r)))
    .then(() => {
      setReportStatus(responseBody);
    });
}

export async function undoCancelledOrder(
  setPdfItems,
  setMessage,
  fileId,
  setIsLoading,
  setAuthToken
) {
  let responseBody = '';

  await fetch('http://localhost:2020/undoCancel', {
    method: 'POST',
    headers: {
      'content-type': 'text/plain'
    },
    body: JSON.stringify({
      token: {
        access_token: localStorage.getItem('DigitalBoxToken')
      },
      FileId: fileId
    })
  })
    .then(response => response.json().then(r => (responseBody = r)))
    .then(() => {
      setMessage(responseBody.Message);
      setPdfItems(responseBody.Orders);
      setIsLoading(false);
      setAuthToken(responseBody.Token.token);
    });
}

export async function undoShippedOrder(
  setPdfItems,
  setMessage,
  fileId,
  setIsLoading,
  setAuthToken
) {
  let responseBody = '';

  await fetch('http://localhost:2020/undoShip', {
    method: 'POST',
    headers: {
      'content-type': 'text/plain'
    },
    body: JSON.stringify({
      token: {
        access_token: localStorage.getItem('DigitalBoxToken')
      },
      FileId: fileId
    })
  })
    .then(response => response.json().then(r => (responseBody = r)))
    .then(() => {
      setMessage(responseBody.Message);
      setPdfItems(responseBody.Orders);
      setIsLoading(false);
      setAuthToken(responseBody.Token.token);
    });
}
