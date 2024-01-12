const hexToDec = (hex) => {

    if (!isNaN(hex)) {
        return parseInt(hex["_hex"], 16)
    }
}

export default hexToDec;