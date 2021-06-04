require('dotenv').config();
const app = require('./app');


const server = app.listen(app.get('port'), () => {
    console.log('App is on',process.env.NODE_ENV, 'environment, listening on port ', app.get('port'))
});

process.on('unhandledRejection',(err,promise)=>{
    console.log('Errors ==>', err.message);
    server.close(()=> process.exit(1));
})