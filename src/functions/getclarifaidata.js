const Clarifai = require('clarifai')

const app = new Clarifai.App({
  apiKey: '78812b999a7e4e76b5c5765356651516',
})

exports.handler = function(event, context, callback) {
  const query = queryStringParameters.url
  app.models.predict(model, query).then(res => res)
}
