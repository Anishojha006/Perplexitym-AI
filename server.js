import dotenv from 'dotenv'
dotenv.config();
import dns from 'dns'
dns.setServers([
    "8.8.8.8",
    "8.8.4.4"
]);

import app from './src/app.js';
import mongooseConnect from './src/config/database.connect.js'

async function connectingToDatabase() {
    await mongooseConnect();

}
connectingToDatabase()
app.listen(3000, () => {
    console.log("server is live on 3000 port");
})