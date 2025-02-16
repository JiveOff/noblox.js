// Includes
var http = require('../util/http.js').func
var getGeneralToken = require('../util/getGeneralToken.js').func

// Args
exports.required = ['assetId']
exports.optional = ['jar']

// Define
function getMarketplaceAsset (jar, token, assetId) {
  var httpOpt = {
    url: 'http://api.roblox.com/Marketplace/ProductInfo?assetId=' + assetId,
    options: {
      method: 'GET',
      jar: jar,
      headers: {
        'X-CSRF-TOKEN': token
      },
      resolveWithFullResponse: true
    }
  }
  return http(httpOpt)
    .then(function (res) {
      if (res.statusCode === 200) {
        var body = res.body
        return body;
      } else {
        console.error("Failed Market.")
        var body = res.body
        return body;
      }
    })
}

exports.func = function (args) {
  var jar = args.jar
  console.log(args);
  return getGeneralToken({ jar: jar })
    .then(function (xcsrf) {
      return getMarketplaceAsset(jar, xcsrf, args.assetId)
    })
}
