'use client'
import React, { useEffect, useState } from 'react'

const ConnectButton = () => {
    const [port, setPort] = useState(null)
    const [writer, setWriter] = useState(null)
    const connectPort = async () => {
        const filter = [{
            usbProductId: 8963,
            usbVendorId: 1659
        }]
        // const port = await navigator.serial.requestPort({filter})
        const ports = await navigator.serial.getPorts();
        
        const port = ports.find(port => {
            return port.getInfo().usbProductId == 8963 && port.getInfo().usbVendorId == 1659
        })
        // 시리얼 포트가 오픈되길 기다린다.
        await port.open({ baudRate: 9600 })
        setPort(port)
        const writer = await port.writable.getWriter();
        setWriter(writer)
        // console.log(port.writable.getWriter());
        

    }
    // navigator.serial.readable.getReader()
    const openDoor = async () => {
        
        //const writer = port.writable.getWriter();
        // SEND HEX DATA CODE TO RELAY NUMBER 01 (RELAY ON)
        const data = new Uint8Array([0x33, 0x01, 0x12, 0x00, 0x00, 0x00, 0x01, 0x47]); // 
        await writer.write(data);

        // // Allow the serial port to be closed later.
        // writer.releaseLock();
    }
    const closeDoor = async () => {
        // SEND HEX DATA CODE TO RELAY NUMBER 01 (RELAY OFF)
        const data = new Uint8Array([0x33, 0x01, 0x11, 0x00, 0x00, 0x00, 0x01, 0x46]);
        await writer.write(data)
    }
    return (
        <>
            <button onClick={connectPort}> connect</button>
            <div>
                <button onClick={openDoor}> open</button>
                <button onClick={closeDoor}> close</button>
            </div>
            
        </>
    )
}

export default ConnectButton
