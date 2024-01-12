const hexToDec = (hex) => {
    if (!isNaN(hex)) {
        return parseInt(hex, 16)
    }
}

export default hexToDec;