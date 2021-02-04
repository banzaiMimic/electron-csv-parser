const { app } = require('electron')
const parseCsv = require('./parseCsv')

app.whenReady().then(
  parseCsv(app)
)

process.exit(0)