const { GraphQlSchema } = require("../GraphQl/Index.graphql");

function graphQlConfig(req, res){
    return {
        schema: GraphQlSchema,
        graphiql: true,
        context: {req, res},
    }
}

module.exports = {
    graphQlConfig
}