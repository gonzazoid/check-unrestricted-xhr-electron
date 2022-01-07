const express = require('express');
const app = express();

const preflightRequests = {};

app.get('/set-simple-cookie', function (req, res) {
  res.set('Set-Cookie', 'user=Chewbacca;');
  res.status(200).send('Ok');
})


const echo = function (req, res) {
  console.log(req.params);
  const { headerName } = req.params;
  res.status(200).send(req.headers[headerName.toLowerCase()]);
};

app.get('/echo/:headerName', echo);
app.options('/echo/:headerName', echo);


const getUidFromHeaders = headers => {
  const header = headers.find(header => header.length > 5 && header.substring(0, 5).toLowerCase() === "x-uid");
  const uid = header ? header.substring(5).toLowerCase() : header;
  return uid;
};

const checkPreflight = function (req, res) {
  console.log(req.headers);
  const uid = getUidFromHeaders(Object.keys(req.headers));
  if(!uid) {
    res.status(400).send('Bad Request');
    return;
  }

  const withPreflight = preflightRequests.hasOwnProperty(uid);
  
  if (withPreflight) {
    delete preflightRequests[uid];
  }

  res.status(200).send(withPreflight);
}

app.options('/check-preflight', function (req, res) {
  const {
    origin,
    "access-control-request-method": requestMethod,
    "access-control-request-headers": requestHeaders,
  } = req.headers;
  if (requestMethod && requestHeaders) {
    const uid = getUidFromHeaders(requestHeaders.split(",").map(header => header.trim()));
    if (!uid) {
      res.status(400).send('Bad Request');
      return;
    }
    preflightRequests[uid] = true;
    res.status(200).send('Ok');
  } else {
    checkPreflight(req, res);
  }
})

app.get('/check-preflight', checkPreflight)
app.post('/check-preflight', checkPreflight)
app.put('/check-preflight', checkPreflight)
app.delete('/check-preflight', checkPreflight)
app.connect('/check-preflight', checkPreflight)
app.trace('/check-preflight', checkPreflight)
app.patch('/check-preflight', checkPreflight)


app.get('/http-auth', function (req, res) {
  res.set('WWW-Authenticate', 'Basic');
  res.status(401).send('Unauthorized');
})

app.get('/proxy-auth', function (req, res) {
  res.set('Proxy-Authenticate', 'Basic');
  res.status(407).send('Proxy Authentication Required');
})



app.listen(3000)
