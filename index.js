const express = require('express')
const ElasticEmail = require('@elasticemail/elasticemail-client');
const app = express()
const PORT = process.env.PORT || 5000;
let defaultClient = ElasticEmail.ApiClient.instance;
let apikey = defaultClient.authentications['apikey'];

apikey.apiKey = "D9A6BCB0E501CEBE7B7E4EF8BDD0D8D48A606746307FDA9184D124881623F337DFBB6C15CF381FE17A171FCFBF2EDD3E"

app.use(express.json())
app.get('/',(req,res) => {
    res.send('Welcome to Email SEnd API')
})
app.get('/delete',(req,res) => {
let api = new ElasticEmail.CampaignsApi()

let name = "name_example"; // {String} Name of Campaign to delete

let callback = function(error, data, response) {

  if (error) {

    console.error(error);
    res.send(error);

  } else {

    console.log('API called successfully.');
    res.send('API called successfully.')

  }

};
    api.campaignsByNameDelete(name, callback);
})
app.listen(PORT,()=>console.log("Serveer Runnign on PORT"))