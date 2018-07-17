const byline = require('byline')
const fetch = require('node-fetch')
const zlib = require('zlib')

if (process.argv.length !== 3) {
  console.log('node index.js {t}')
  process.exit()
}

fetch(`https://maps.gsi.go.jp/xyz/${process.argv[2]}/mokuroku.csv.gz`)
  .then(res => {
    const s = byline(res.body.pipe(zlib.createGunzip()))
    s.on('data', line => {
      zxy = line.toString().split('/').map(v => parseInt(v))
      if (zxy.length !== 3) return
      console.log(zxy)
    })
  })

