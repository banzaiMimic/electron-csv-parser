const { app } = require('electron')

const runTest = () => {
  console.log('runTest...')
}

app.whenReady().then(runTest())

process.exit(0)