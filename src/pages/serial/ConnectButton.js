import React, { useEffect, useState } from 'react'

const ConnectButton = () => {
    const [port, setPort] = useState(null)
    const connectPort = async () => {
        const port = await navigator.serial.requestPort()
        // 시리얼 포트가 오픈되길 기다린다.
        // await port.open({ baudRate: 9600 })
        setPort(port)
        port.onconnect = () => {
            // Add |e.target| to the UI or automatically connect.
            console.log('connect!')
        }
        console.log(port)
    }
    useEffect(() => {
        navigator.serial.addEventListener('connect', (e) => {
            // Add |e.target| to the UI or automatically connect.
            console.log('connect!')
        })
    }, [])
    navigator.serial.readable.getReader()
    const openPort = async () => {
        const reader = port.readable.getReader()
        const { value, done } = await reader.read()
        console.log(value)
        console.log(done)
        // await port.open({ baudRate: 9600 })
    }
    return (
        <>
            <button onClick={connectPort}> connect</button>
            <button onClick={openPort}> connect</button>
        </>
    )
}

export default ConnectButton
