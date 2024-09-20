import { createServer } from 'http'
import { parse } from 'url'
import { SerialPort } from 'serialport'
import next from 'next'

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// 시리얼 포트 생성
export const mySerialPort = new SerialPort({
    path: '/dev/tty.QCY-T13',
    baudRate: 9600,
})

app.prepare().then(() => {
    createServer((req, res) => {
        const parsedUrl = parse(req.url, true)
        handle(req, res, parsedUrl)
    }).listen(port)

    console.log(`> Server listening at http://localhost:${port} as ${dev ? 'development' : process.env.NODE_ENV}`)

    // 시리얼 포트 확인
    SerialPort.list().then((ports) => {
        ports.forEach(function (port) {
            console.log(port.path)
        })
    })

    mySerialPort.write('main screen turn on', function (err) {
        if (err) {
            return console.log('Error on write: ', err.message)
        }
        console.log('message written')
    })
})

// Open errors will be emitted as an error event
mySerialPort.on('error', function (err) {
    console.log('Error: ', err.message)
})
