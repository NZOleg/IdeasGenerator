if (process.env.NODE_ENV == 'production'){
    module.exports = {mongoURI:'mongodb://Olegok:qwerty1234@ds125618.mlab.com:25618/idea-prod'};
}else{
        module.exports = {mongoURI:'mongodb://localhost/ideas-dev'};
}
