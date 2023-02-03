import express = require("express");

const app = express();
const port = 5000;
app.post('/', (request, response) => {
    response.json({message:"rere"});
});
app.listen(port, () => console.log(`Running on port ${port}`));