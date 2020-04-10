import express from 'express';

const app = express();

app.use(express.json());

/*
Query Params: ?~
Route Params: /id - rota usa-se: RECURSO/:id
Body: JSON
*/

app.get('/users/', (req, res) => {// req(request) & res(responde) são configurados pelo próprio express.
    // let routeParams = req.query; 
    // let routeParams = req.params; 
    let routeParams = req.body; 

    console.log(routeParams);

    return res.json({mensagem: "Olá Mundo"});
})

app.listen(3333);
