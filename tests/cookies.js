describe('Cookies', function() {
  describe('#document.cookies', function() {

    it('should return empty string after document.cookie="..."', function() {
      assert.equal(document.cookie, "");
      document.cookie = "user=Chewbacca";
      assert.equal(document.cookie, "");
    });
  });

  describe('#XMLHttpRequest', function() {
    it('should return empty string after XMLHttpRequest', () => (
      new Promise ((resolve, reject) => {
        assert.equal(document.cookie, "");
        const xhr = new XMLHttpRequest();
        xhr.open("GET", `${testServerUrl}/set-simple-cookie`);
        xhr.onload = function() {
          assert.equal(document.cookie, "");
          resolve();
        };
        xhr.onerror = reject;
        xhr.send();
      })
    ));

    it('should be able to set cookies header', () => (
      new Promise ((resolve, reject) => {
        assert.equal(document.cookie, "");
        const cookie = 'some fancy cookie';
        const xhr = new XMLHttpRequest();
        xhr.open("GET", `${testServerUrl}/echo/cookie`);
        xhr.setRequestHeader('Cookie', cookie);
        xhr.onload = function() {
          assert.equal(document.cookie, "");
          assert.equal(xhr.response, cookie);
          resolve();
        };
        xhr.onerror = reject;
        xhr.send();
      })
    ));

  });
});
