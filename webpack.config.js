const path = require('path')

module.exports = {
    entry : {
        home : ['./src/index-home.js'],
        create : ['./src/index-create.js']
    },
    output : {
        path : path.resolve(__dirname , 'public/scripts/'),
        filename: '[name]-bundle.js'
    },
    devServer: {
        contentBase : path.resolve(__dirname , 'public'),
        publicPath : '/scripts/'
    }
}