require('dotenv').config();
const AssistantV1 = require('watson-developer-cloud/assistant/v1');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(express.static('./public'));

const port = 3000;

const assistant = new AssistantV1({
  iam_apikey: 'a3Rpg2BHaK9x1zN3aOA_ssM3SxvcNZK2tOCy6GPiNfre',
  version: '2019-09-21',
  url: 'https://gateway-wdc.watsonplatform.net/assistant/api/',
});

app.post('/conversation/', (req, res) => {
  const { text, context = {} } = req.body;

  const params = {
    input: { text },
    workspace_id: '75fe514c-6dca-4bc2-9b51-4cc2adfd7212',
    context,
  };

  assistant.message(params, (err, response) => {
    if (err) {
      console.error(err);
      res.status(500).json(err);
    } else {
      if(response.output.text =='instituicoes'){
         response.output.text.pop();
         response.output.text.push('Compra um teclado');}
      res.json(response);
    }
  });
});


app.listen(port, () => console.log(`Running on port ${port}`));
