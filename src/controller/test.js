const TestService = require('../service/test');
exports.Test = (ctx) => {
    let query = ctx.query; // GET Query
    let data = ctx.request.body; // POST Body
    return ctx.success(TestService.Test(query, data));
}