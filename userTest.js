const toTest = require("./app.js");
let assert = require("chai").assert;
const fetch = require("node-fetch");


describe('Show music', () => {
    it('Gets 10 21 song', async () => {
        await fetch("https://itunes.apple.com/search?term=21&limit=10&entity=music")
            .then((res) => {
                return res.json()
            });
            .then((res) => {
                console.log(res);
                assert.equal(res.count, 10)
            });
            .done()
    })
})
