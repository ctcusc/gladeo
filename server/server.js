const { port } = require('../config')
const app = require('./api/app')

app.set('port', port || 3001)

app.listen(app.get('port'), () => {
  console.log(`App is listening on port ${port}`)
})
