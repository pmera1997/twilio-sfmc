const FuelRest = require('fuel-rest');

const options = {
  auth: {
    clientId: "g95o40t7yy6g1v5z1vn0t2o4",
    clientSecret: "8cnFgw7elEJI30RQuJwlFRxE",
    authOptions: {
      authVersion: 2,
      accountId: "514015916",
    },
    authUrl: `https://mc6vgk-sxj9p08pqwxqz9hw9-4my.auth.marketingcloudapis.com/v2/token`,
  },
  origin: `https://mc6vgk-sxj9p08pqwxqz9hw9-4my.rest.marketingcloudapis.com/`,
  globalReqOptions: {
  },
};

const client = new FuelRest(options);

/**
 * Save data in DE
 * @param externalKey
 * @param data
 * @returns {?Promise}
 */
const saveData = async (externalKey, data) => client.post({
  uri: `/hub/v1/dataevents/key:9400A203-842C-4AB7-9004-EC12BC6D910F/rowset`,
  headers: {
    'Content-Type': 'application/json',
  },
  json: true,
  body: data,
});

module.exports = {
  client,
  saveData,
};
