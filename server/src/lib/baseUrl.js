exports.baseUrl =  () => {
    const baseUrlWithPort = `${process.env.FRONTEND_URL}:${process.env.FE_PORT}`
    return baseUrlWithPort
};
