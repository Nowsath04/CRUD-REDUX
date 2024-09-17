const asyncHandler = (cotroller) => async (req, res, next) => {
    try {
        await cotroller(req, res, next)
    } catch (error) {
        next(error)
    }
}


module.exports = asyncHandler;