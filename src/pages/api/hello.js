// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { SerialPort } from 'serialport'
// import { mySerialPort, writeSerial } from '../../../server'
// 시리얼 포트 생성
const mySerialPort = new SerialPort({
    path: '/dev/tty.QCY-T13',
    baudRate: 9600,
})
export default function handler(req, res) {
    mySerialPort.write('main screen turn on', function (err) {
        if (err) {
            return console.log('Error on write: ', err.message)
        }
        console.log('message written')
    })
}
