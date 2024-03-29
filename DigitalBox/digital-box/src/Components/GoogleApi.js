export async function cancelOrders(setPdfItems, setMessage, orders, setAuthToken) {
  let responseBody = "";

  await fetch("http://localhost:2020/cancel", {
    method: "POST",
    headers: {
      "content-type": "text/plain",
    },
    body: JSON.stringify({
      token: {
        access_token: localStorage.getItem("DigitalBoxToken"),
      },
      Orders: orders,
      Action: "cancel",
    }),
  })
    .then((response) => response.json().then((r) => (responseBody = r)))
    .then(() => {
      console.log(responseBody);
      setMessage(responseBody.Message);
      setPdfItems(responseBody.Orders);
      setAuthToken(responseBody.Token.token)
    });
}

export async function shipOrders(setPdfItems, setMessage, orders, setAuthToken) {
  let responseBody = "";

  await fetch("http://localhost:2020/ship", {
    method: "POST",
    headers: {
      "content-type": "text/plain",
    },
    body: JSON.stringify({
      token: {
        access_token: localStorage.getItem("DigitalBoxToken"),
      },
      Orders: orders,
      Action: "ship",
    }),
  })
    .then((response) => response.json().then((r) => (responseBody = r)))
    .then(() => {
      console.log(responseBody);
      setMessage(responseBody.Message);
      setPdfItems(responseBody.Orders);
    });
}

export async function getFileContent(setPdfItems, setMessage, searchValue, setIsLoading, setAuthToken) {
  let responseBody = "";

  await fetch("http://localhost:2020/", {
    method: "POST",
    headers: {
      "content-type": "text/plain",
    },
    body: JSON.stringify({
      token: {
        access_token: localStorage.getItem("DigitalBoxToken"),
      },
      Filter: searchValue,
    }),
  })
    .then((response) => response.json().then((r) => (responseBody = r)))
    .then(() => {
      console.log(responseBody);
      setMessage(responseBody.Message);
      setPdfItems(responseBody.Orders);
      setIsLoading(false);
      setAuthToken(responseBody.Token.token)
    });
}
