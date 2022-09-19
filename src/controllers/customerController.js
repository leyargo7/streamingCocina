const controller = {};
// const nodemailer = require('nodemailer');

const router = require('../routes/customer');
const fs = require('fs');

const { v4: uuidv4 } = require('uuid');
const { name } = require('ejs');


controller.list = (req, res) => {
    
    res.render('index', {
        
    });
}

controller.eventC = (req, res) => {
    res.render('customers',{} );
}
//test
controller.test = (req, res) => {
    res.render('evenTest',{} );
}

const client_data = fs.readFileSync('src/visits.json', 'utf-8');
let dbClient = JSON.parse(client_data);

controller.save = (req, res) => {
    
    const {name} = req.body;
 
    let newCliente ={    
        id: uuidv4(),
        name
    };

    dbClient.push(newCliente);

    const json_client = JSON.stringify(dbClient);
    fs.writeFileSync('src/visits.json', json_client, 'utf-8');

    req.session.my_name = req.body.name;
    res.redirect('/streamingArteCocinayAmor2');
    
    
};


controller.delete = (req, res) => {
    dbClient = dbClient.filter(client => client.id != req.params.id);
    const json_client = JSON.stringify(dbClient);
    fs.writeFileSync('src/visits.json', json_client, 'utf-8');
    res.render('customer_view_db', {dbClient});
}

controller.stream = (req, res) => {
    
    if(req.session.my_name){
        const textUser = req.session.my_name;
        delete req.session.my_name;

        res.render('stream', {
            textUser
        });
    }else{
    res.redirect('/notRecord.html');
    
    }
    
};

controller.mostrarDBViews = (req, res) => {
    res.render('customer_view_db', {dbClient});
    
};


module.exports = controller;
