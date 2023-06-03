module.exports = {
    publicPath: process.env.NODE_ENV === 'production'?'/DataLife/':'',
    configureWebpack:{
        module: {
            rules: [
                {
                    test: /\.mjs$/,
                    include: /node_modules/,
                    type: "javascript/auto"
                },
            ]
        }
    }
    
}