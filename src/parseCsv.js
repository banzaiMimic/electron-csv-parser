const fs = require('fs')
const parse = require('csv-parse/lib/sync')
const Excel = require('exceljs')

const parseHeader = r => {
  const keys = Object.keys(r)
  return keys.map( k => {
    return {
      id: k.toLowerCase(),
      title: k
    }
  })
}

const createCsv = ({header, objArr, output}) => {
  console.log('creating csv to :', output)
  let workbook = new Excel.Workbook()
  try {
    let keys = Object.keys(header)
    let worksheet = workbook.addWorksheet('Worksheet')
    keys.map( (key, idx) => {
      worksheet.getCell(`A${idx}`).value = key
      //worksheet.getCell('B'+idx).value = resultMap[key]
    })
  } catch(e) {
    console.error(e)
  }
  return workbook.xlsx.writeFile(output)
}

const parseCsv = async(app) => {
  try {
    let objArr = []
    let header = []
    const output = `${app.getAppPath()}/tt1.xlsx`
    const filePath = `${__dirname}/data/demo.csv`
    let rawdata = fs.readFileSync( filePath )
    
    const records = parse(rawdata, {
      columns: true,
      skip_empty_lines: true
    })

    records.map((r,idx) => {
      if (idx === 0) {
        header = parseHeader(r)
      }
      console.log(r)
      objArr.push(r)
    })

    console.log('objArr:', objArr)
    console.log('header:', header)

    createCsv({
      header, 
      objArr, 
      output
    })

  } catch(e) {
    console.error(e)
  }
}

module.exports = parseCsv
