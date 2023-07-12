module.exports = async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        console.error('| Serve Error Detail: ', err, ' |');
        return ctx.error(err);
    }
}