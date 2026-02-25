const API_URL = 'http://localhost:2020';

export async function cancelOrders(setPdfItems, setMessage, orders, setAuthToken, setIsLoading) {
  let responseBody = '';

  await fetch(`${API_URL}/cancel`, {
    method: 'POST',
    headers: {
      'content-type': 'text/plain'
    },
    body: JSON.stringify({
      code: localStorage.getItem('DigitalBoxRefreshCode'),
      Orders: orders,
      Action: 'cancel'
    })
  })
    .then(response => response.json().then(r => (responseBody = r)))
    .then(() => {
      setMessage(responseBody.Message);
      setPdfItems(responseBody.Orders);
      setAuthToken(responseBody.Token);
      setIsLoading(false);
    });
}

export async function shipOrders(setPdfItems, setMessage, orders, setAuthToken, setIsLoading) {
  let responseBody = '';

  await fetch(`${API_URL}/ship`, {
    method: 'POST',
    headers: {
      'content-type': 'text/plain'
    },
    body: JSON.stringify({
      code: localStorage.getItem('DigitalBoxRefreshCode'),
      Orders: orders,
      Action: 'ship'
    })
  })
    .then(response => response.json().then(r => (responseBody = r)))
    .then(() => {
      setMessage(responseBody.Message);
      setPdfItems(responseBody.Orders);
      setAuthToken(responseBody.Token);
      setIsLoading(false);
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

  await fetch(`${API_URL}/search`, {
    method: 'POST',
    headers: {
      'content-type': 'text/plain'
    },
    body: JSON.stringify({
      code: localStorage.getItem('DigitalBoxRefreshCode'),
      searchValue: searchValue,
      filters: filters
    })
  })
    .then(response => response.json().then(r => (responseBody = r)))
    .then(() => {
      setMessage(responseBody.Message);
      setPdfItems(responseBody.Orders);
      setIsLoading(false);
      setAuthToken(responseBody.Token);
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

  await fetch(`${API_URL}/shippedOrders`, {
    method: 'POST',
    headers: {
      'content-type': 'text/plain'
    },
    body: JSON.stringify({
      code: localStorage.getItem('DigitalBoxRefreshCode'),
      searchValue: searchValue
    })
  })
    .then(response => response.json().then(r => (responseBody = r)))
    .then(() => {
      setMessage(responseBody.Message);
      setPdfItems(responseBody.Orders);
      setIsLoading(false);
      setAuthToken(responseBody.Token);
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

  await fetch(`${API_URL}/canceledOrders`, {
    method: 'POST',
    headers: {
      'content-type': 'text/plain'
    },
    body: JSON.stringify({
      code: localStorage.getItem('DigitalBoxRefreshCode'),
      searchValue: searchValue
    })
  })
    .then(response => response.json().then(r => (responseBody = r)))
    .then(() => {
      setMessage(responseBody.Message);
      setPdfItems(responseBody.Orders);
      setIsLoading(false);
      setAuthToken(responseBody.Token);
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

  await fetch(`${API_URL}/`, {
    method: 'POST',
    headers: {
      'content-type': 'text/plain'
    },
    body: JSON.stringify({
      code: localStorage.getItem('DigitalBoxRefreshCode'),
      Filter: searchValue
    })
  })
    .then(response => response.json().then(r => (responseBody = r)))
    .then(() => {
      setMessage(responseBody.Message);
      setPdfItems(responseBody.Orders);
      setIsLoading(false);
      setAuthToken(responseBody.Token);
    });
}

export async function togglePriority(
  setPdfItems,
  setMessage,
  fileId,
  priority,
  searchValue,
  filters,
  setIsLoading,
  setAuthToken
) {
  let responseBody = '';

  await fetch(`${API_URL}/priority`, {
    method: 'POST',
    headers: {
      'content-type': 'text/plain'
    },
    body: JSON.stringify({
      code: localStorage.getItem('DigitalBoxRefreshCode'),
      priority: priority,
      FileId: fileId,
      searchValue: searchValue,
      filters: filters
    })
  })
    .then(response => response.json().then(r => (responseBody = r)))
    .then(() => {
      setMessage(responseBody.Message);
      setPdfItems(responseBody.Orders);
      setIsLoading(false);
      setAuthToken(responseBody.Token);
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
    'code',
    JSON.stringify({
      code: localStorage.getItem('DigitalBoxRefreshCode')
    })
  );

  await fetch(`${API_URL}/generateReport`, {
    method: 'POST',
    body: formData
  })
    .then(response => response.json().then(r => (responseBody = r)))
    .then(() => {
      setMessage(responseBody.Message);
      setPdfItems(responseBody.Orders);
      setIsLoading(false);
      setAuthToken(responseBody.Token);
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

  await fetch(`${API_URL}/addNote`, {
    method: 'POST',
    headers: {
      'content-type': 'text/plain'
    },
    body: JSON.stringify({
      code: localStorage.getItem('DigitalBoxRefreshCode'),
      note: note,
      FileId: fileId
    })
  })
    .then(response => response.json().then(r => (responseBody = r)))
    .then(() => {
      setMessage(responseBody.Message);
      setPdfItems(responseBody.Orders);
      setIsLoading(false);
      setAuthToken(responseBody.Token);
    });
}

export async function downloadReport() {
  const response = await fetch(`${API_URL}/downloadReport`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      code: localStorage.getItem('DigitalBoxRefreshCode')
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

  await fetch(`${API_URL}/reportStatus`, {
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
  name,
  setIsLoading,
  setAuthToken
) {
  let responseBody = '';

  await fetch(`${API_URL}/undoCancel`, {
    method: 'POST',
    headers: {
      'content-type': 'text/plain'
    },
    body: JSON.stringify({
      code: localStorage.getItem('DigitalBoxRefreshCode'),
      FileId: fileId,
      name: name
    })
  })
    .then(response => response.json().then(r => (responseBody = r)))
    .then(() => {
      setMessage(responseBody.Message);
      setPdfItems(responseBody.Orders);
      setIsLoading(false);
      setAuthToken(responseBody.Token);
    });
}

export async function undoShippedOrder(
  setPdfItems,
  setMessage,
  fileId,
  name,
  setIsLoading,
  setAuthToken
) {
  let responseBody = '';

  await fetch(`${API_URL}/undoShip`, {
    method: 'POST',
    headers: {
      'content-type': 'text/plain'
    },
    body: JSON.stringify({
      code: localStorage.getItem('DigitalBoxRefreshCode'),
      FileId: fileId,
      name: name
    })
  })
    .then(response => response.json().then(r => (responseBody = r)))
    .then(() => {
      setMessage(responseBody.Message);
      setPdfItems(responseBody.Orders);
      setIsLoading(false);
      setAuthToken(responseBody.Token);
    });
}
