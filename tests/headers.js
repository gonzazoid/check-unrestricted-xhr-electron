const checkHeader = (method, headerName, headerValue) => (
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, `${testServerUrl}/echo/${headerName}`);
    xhr.setRequestHeader(headerName, headerValue);
    xhr.onload = function() {
      assert.equal(xhr.response, headerValue);
      resolve();
    };
    xhr.onerror = reject;
    xhr.send();
  })
);

describe('HEADERS', function() {
  describe('#forbidden headers', function() {

    it('should be able to set Accept-Charset header', () => checkHeader('GET', 'Accept-Charset', 'utf-8, iso-8859-1;q=0.5'));
    it('should be able to set Accept-Encoding header', () => checkHeader('GET', 'Accept-Encoding', 'deflate, gzip;q=1.0, *;q=0.5'));
    it('should be able to set Access-Control-Request-Headers header', () => checkHeader('OPTIONS', 'Access-Control-Request-Headers', 'X-PINGOTHER, Content-Type'));
    it('should be able to set Access-Control-Request-Method header', () => checkHeader('OPTIONS', 'Access-Control-Request-Method', 'POST'));
    it('should be able to set Connection header (close)', () => checkHeader('GET', 'Connection', 'close'));
    it('should be able to set Connection header (keep-alive)', () => checkHeader('GET', 'Connection', 'keep-alive'));
    it('should be able to set Content-Length header', () => checkHeader('POST', 'Content-Length', '10'));
    it('should be able to set Cookie header', () => checkHeader('GET', 'Cookie', 'PHPSESSID=298zf09hf012fh2; csrftoken=u32t4o3tb3gg43; _gat=1'));
    it('should be able to set Cookie2 header', () => checkHeader('GET', 'Cookie2', 'PHPSESSID=298zf09hf012fh2; csrftoken=u32t4o3tb3gg43; _gat=1'));
    it('should be able to set Date header', () => checkHeader('GET', 'Date', 'Wed, 21 Oct 2015 07:28:00 GMT'));
    it('should be able to set DNT header (0)', () => checkHeader('GET', 'DNT', '0'));
    it('should be able to set DNT header (1)', () => checkHeader('GET', 'DNT', '1'));
    it('should be able to set Expect header (100-continue)', () => checkHeader('GET', 'Expect', '100-continue'));
    it('should be able to set Host header', () => checkHeader('GET', 'Host', 'developer.mozilla.org'));
    it('should be able to set Keep-Alive header', () => checkHeader('GET', 'Keep-Alive', 'timeout=5, max=1000'));
    it('should be able to set Origin header', () => checkHeader('GET', 'Origin', 'https://developer.mozilla.org'));
    it('should be able to set Referer header', () => checkHeader('GET', 'Referer', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'));
    it('should be able to set TE header', () => checkHeader('GET', 'TE', 'trailers, deflate;q=0.5'));
    it('should be able to set Trailer header', () => checkHeader('GET', 'Trailer', 'Expires'));
    it('should be able to set Transfer-Encoding header', () => checkHeader('GET', 'Transfer-Encoding', 'gzip, chunked'));
    it('should be able to set Upgrade header', () => checkHeader('GET', 'Upgrade', 'HTTP/2.0, SHTTP/1.3, IRC/6.9, RTA/x11'));
    it('should be able to set Via header', () => checkHeader('GET', 'Via', '1.0 fred, 1.1 p.example.net'));
    it('should be able to set Proxy-* header', () => checkHeader('GET', 'Proxy-Authorization', 'Basic YWxhZGRpbjpvcGVuc2VzYW1l'));
    it('should be able to set Sec-* header', () => checkHeader('GET', 'Sec-Fetch-Site', 'same-origin'));


  });

});
