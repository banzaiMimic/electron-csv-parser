const Excel = require('exceljs')

const ALPHABET = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split('')

const writeCsv = ({headers, objArr, output}) => {
  console.log('creating csv to :', output)
  let workbook = new Excel.Workbook()
  try {
    let worksheet = workbook.addWorksheet('Worksheet')
    headers.map( (key, idx) => {
      const cell = `${ALPHABET[idx]}1`
      console.log('cell is :', cell)
      worksheet.getCell(cell).value = key
      console.log(`setting cell ${cell} value to ${key}`)
    })
  } catch(e) {
    console.error(e)
  }
  return workbook.xlsx.writeFile(output)
}

const parseCsv = file => {
  let workbook = new Excel.Workbook()
  let headers = []
  let objArr = []
  try {
    return workbook.csv.readFile( file )
    .then((worksheet) => {
      worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
        console.log("Row " + rowNumber + " = " + JSON.stringify(row.values))
        
        if (rowNumber === 1) {
          headers = Object.assign([], row.values)
        } else {
          let newObj = {}
          row.values.map( (v, idx) => {
            newObj[headers[idx]] = v
          })
          objArr.push(newObj)
        }
      })
      headers.shift()
      console.log('headers:', headers)
      console.log('objArr:', objArr)
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
  const csvData = await parseCsv('src/data/demo.csv')
  let done = await writeCsv( {
    headers: csvData.headers, 
    objArr: csvData.objArr, 
    output: 'tt1.csv'
  })
  //window.close()
}

main()
