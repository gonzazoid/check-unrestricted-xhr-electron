const randomString = () => (Math.random() * 1000000000).toString(36).replace(/[^a-z]+/g, '');

const simpleRequest = (method, resolve, reject) => {
  const origin = 'poor.example.com';
  const xhr = new XMLHttpRequest();
  const body = '<?xml version="1.0"?><person><name>Arun</name></person>';
  xhr.open(method, `${testServerUrl}/check-preflight`);
  xhr.setRequestHeader('Origin', origin);
  xhr.setRequestHeader('Content-Type', 'text/xml;charset=UTF-8');
  xhr.setRequestHeader(`X-UID${randomString()}`, 'Z');
  xhr.onload = function() {
    assert.equal(xhr.response, "false");
    resolve();
  };
  xhr.onerror = reject;
  xhr.send(body);
};

describe('CORS', function() {

  describe('#Check if we can fake preflight request via XMLHttpRequest', function() {

    it('should be able to set Origin header', () => (
      new Promise ((resolve, reject) => {
        const origin = 'poor.example.com';
        const xhr = new XMLHttpRequest();
        xhr.open("OPTIONS", `${testServerUrl}/echo/origin`);
        xhr.setRequestHeader('Origin', origin);
        xhr.onload = function() {
          assert.equal(xhr.response, origin);
          resolve();
        };
        xhr.onerror = reject;
        xhr.send();
      })
    ));

    it('should be able to set Access-Control-Request-Method header', () => (
      new Promise ((resolve, reject) => {
        const method = 'GET';
        const xhr = new XMLHttpRequest();
        xhr.open("OPTIONS", `${testServerUrl}/echo/access-control-request-method`);
        xhr.setRequestHeader('Access-Control-Request-Method', method);
        xhr.onload = function() {
          assert.equal(xhr.response, method);
          resolve();
        };
        xhr.onerror = reject;
        xhr.send();
      })
    ));

    it('should be able to set Access-Control-Request-Headers header', () => (
      new Promise ((resolve, reject) => {
        const headers = 'Content-Type, Content-Language';
        const xhr = new XMLHttpRequest();
        xhr.open("OPTIONS", `${testServerUrl}/echo/access-control-request-headers`);
        xhr.setRequestHeader('Access-Control-Request-Headers', headers);
        xhr.onload = function() {
          assert.equal(xhr.response, headers);
          resolve();
        };
        xhr.onerror = reject;
        xhr.send();
      })
    ));

    it('check if preflight checker works', () => (
      new Promise ((resolve, reject) => {
        const origin = 'poor.example.com';
        const method = 'POST';
        const xuid = `X-UID${randomString()}`;
        const headers = `Content-Type, ${xuid}`;
        const checkPreflightUrl = `${testServerUrl}/check-preflight`;
        const preflight = new XMLHttpRequest();
        preflight.open("OPTIONS", checkPreflightUrl);
        preflight.setRequestHeader('Origin', origin);
        preflight.setRequestHeader('Access-Control-Request-Method', method);
        preflight.setRequestHeader('Access-Control-Request-Headers', headers);
        preflight.onload = function() {
          const xhr = new XMLHttpRequest();
          const body = '<?xml version="1.0"?><person><name>Arun</name></person>';
          xhr.open("POST", checkPreflightUrl);
          xhr.setRequestHeader('Origin', origin);
          xhr.setRequestHeader('Content-Type', 'text/xml;charset=UTF-8');
          xhr.setRequestHeader(xuid, 'Z');
          xhr.onload = function() {
            assert.equal(xhr.response, "true");
            resolve();
          };
          xhr.onerror = reject;
          xhr.send(body);
        };
        preflight.onerror = reject;
        preflight.send();
      })
    ));

  });
  describe('#preflight', function() {

    it('should not fire preflight request: simple PUT',
      () => new Promise ((resolve, reject) => simpleRequest("PUT", resolve, reject))
    );

    it('should not fire preflight request: simple DELETE',
      () => new Promise ((resolve, reject) => simpleRequest("DELETE", resolve, reject))
    );

    it('should not fire preflight request: simple CONNECT',
      () => new Promise ((resolve, reject) => simpleRequest("CONNECT", resolve, reject))
    );

    it('should not fire preflight request: simple OPTIONS',
      () => new Promise ((resolve, reject) => simpleRequest("OPTIONS", resolve, reject))
    );

    it('should not fire preflight request: simple TRACE',
      () => new Promise ((resolve, reject) => simpleRequest("TRACE", resolve, reject))
    );

    it('should not fire preflight request: simple PATCH',
      () => new Promise ((resolve, reject) => simpleRequest("PATCH", resolve, reject))
    );

  });
});
