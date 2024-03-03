const express = require("express");
const ElasticEmail = require("@elasticemail/elasticemail-client");
const app = express();
const PORT = process.env.PORT || 5000;
let defaultClient = ElasticEmail.ApiClient.instance;
let apikey = defaultClient.authentications["apikey"];

apikey.apiKey =
  "D9A6BCB0E501CEBE7B7E4EF8BDD0D8D48A606746307FDA9184D124881623F337DFBB6C15CF381FE17A171FCFBF2EDD3E";
let emailApi = new ElasticEmail.EmailsApi();

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome to Email SEnd API");
});

app.get("/send", (req, res) => {
  try {
    let email = ElasticEmail.EmailMessageData.constructFromObject({
      Recipients: [new ElasticEmail.EmailRecipient("MeowWow ")],
      Content: {
        Body: [
          ElasticEmail.BodyPart.constructFromObject({
            ContentType: "HTML",
            Content: "My test email content ;)",
          }),
        ],
        Subject: "JS EE lib test",
        From: "betelguesebusiness@gmail.com",
      },
    });

    var callback = function (error, data, response) {
      if (error) {
        console.error(error);
        res.send(response.text);
      } else {
        console.log("API called successfully.");
        res.send(data);
      }
    };

    emailApi.emailsPost(email, callback);
  } catch (e) {}
});

app.listen(PORT, () => console.log("Serveer Runnign on PORT"));
