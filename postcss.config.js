module.exports = {
    plugins: [
        require('autoprefixer')({
            browsers: [
                'last 10 versions',
                'Chrome >= 4',
                'Firefox >= 2',
                'Explorer >= 8',
            ]
        })
    ]
};