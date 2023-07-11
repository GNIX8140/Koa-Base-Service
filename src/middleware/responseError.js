module.exports = async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        console.error('Serve Error', err);
        ctx.error(err);
    }
}