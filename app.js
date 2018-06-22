/* importar as configurações do servidor */
var app = require('./config/server');
const PORT = process.env.PORT || 5000;

/* parametrizar a porta de escuta */
app.listen(PORT, function(){
	console.log('Servidor online');
});


/*
ALWAYS DO THAT

1 - export GOOGLE_APPLICATION_CREDENTIALS=Small-Talk-9e39e7f52b88.json

2 - change node_modules/node-spotify-webhelper/index.js - line 158: return util.format("http://%s:%d%s", generateRandomLocalHostName(), localPort, url);

 */
