const Excel = require('exceljs')
const fs = require('fs');
const path = require('path');

let rawdata = fs.readFileSync(path.resolve(__dirname, 'config.json'))
let config = JSON.parse(rawdata)
console.log(config)
const { inputCsv, outputCsv } = config

const ALPHABET = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split('')

const writeCsv = ({headers, objArr}) => {
  
  console.log('writing csv:', {
    headers, objArr, outputCsv
  })
  let workbook = new Excel.Workbook()
  try {
    let worksheet = workbook.addWorksheet('Worksheet')
    headers.map( (key, idx) => {
      const cellAlpha = `${ALPHABET[idx]}`
      worksheet.getCell(`${cellAlpha}1`).value = key
    })

    objArr.map( (doc, rowIdx) => {
      headers.map( (k, idx) => {
        const cellAlpha = `${ALPHABET[idx]}`
        worksheet.getCell(`${cellAlpha}${rowIdx + 2}`).value = doc[k]
      })
    })
  } catch(e) {
    console.error(e)
  }
  return workbook.xlsx.writeFile(outputCsv)
}

const parseCsv = file => {
  let workbook = new Excel.Workbook()
  let headers = []
  let objArr = []
  const parseHeaders = values => {
    headers = Object.assign([], values)
  }
  try {
    return workbook.csv.readFile( file )
    .then((worksheet) => {
      worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {

        if (rowNumber === 1) {
          parseHeaders(row.values)
        } else {
          let newObj = {}
          row.values.map( (v, idx) => {
            newObj[headers[idx]] = v
          })
          objArr.push(newObj)
        }
      })
      headers.shift()
      return {
        headers,
        objArr
      }
    })
  } catch(e) {
    console.error(e)
  }
}

const main = async() => {
  const csvData = await parseCsv( inputCsv )
  let done = await writeCsv( {
    headers: csvData.headers, 
    objArr: csvData.objArr
  })
  //window.close()
}

main()
