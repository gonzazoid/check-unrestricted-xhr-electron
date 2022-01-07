describe('AUTH', function() {
  describe('#http auth', function() {

    it('should should be able to read 401 response', () => (
      new Promise ((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", `${testServerUrl}/http-auth`);
        xhr.onload = function() {
          assert.equal(xhr.status, 401)
          resolve();
        };
        xhr.onerror = reject;
        xhr.send();
      })
    ));

  });

  describe('#proxy auth', function() {

    it('should should be able to read 407 response', () => (
      new Promise ((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", `${testServerUrl}/proxy-auth`);
        xhr.onload = function() {
          assert.equal(xhr.status, 407)
          resolve();
        };
        xhr.onerror = reject;
        xhr.send();
      })
    ));

  });

});
