'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());

const PORT = process.env.PORT;

//connect the express server with mongodb
mongoose.connect('mongodb://localhost:27017/books', { useNewUrlParser: true, useUnifiedTopology: true });


//create a schema
const BookSchema = new mongoose.Schema({
    name: String,
    description: String,
    image_url: String,
});


//create a schema
const UserSchema = new mongoose.Schema({
    email: String,
    books: [BookSchema]
});

//create a model 
const bookModel = mongoose.model('book', BookSchema);

//create a model
const userModel = mongoose.model('user', UserSchema);


//data seeding (store data)
function seedBookCollection() {
    const lesMiserables = new bookModel({
        name: 'Les Misérables',
        description: 'Bthe novel is usually referred to by its original French title. However, several alternatives have been used, including The Miserables, The Wretched, The Miserable Ones, The Poor Ones, The Wretched Poor, The Victims and The Dispossessed.[5] Beginning in 1815 and culminating in the 1832 June Rebellion in Paris, the novel follows the lives and interactions of several characters, particularly the struggles of ex-convict Jean Valjean and his experience of redemption.',
        image_url: 'https://i.pinimg.com/originals/c0/79/d1/c079d16ae2be38a69f4a4edddc27ff2c.jpg'
    });

    const laChartreuseDeParme = new bookModel({
        name: 'La Chartreuse de Parme',
        description: 'The book begins with the French army sweeping into Milan and stirring up the sleepy region of Lombardy, which was allied with Austria. Fabrice grows up surrounded by intrigues and alliances for and against the French — his father the Marchese comically fancies himself a spy for the Viennese. It is broadly hinted at that Fabrice may have actually been fathered by a visiting French lieutenant. The novels early section describes Fabrices rather quixotic effort to join Napoleon when the latter returns to France in March 1815 (the Hundred Days).',
        image_url: 'https://m.media-amazon.com/images/I/515QYG6FNdL.jpg'
    });


    const bonjourTristesse = new bookModel({
        name: 'Bonjour Tristesse',
        description: ' is a novel by Françoise Sagan. Published in 1954, when the author was only 18, it was an overnight sensation. The title is derived from a poem by Paul Éluard, "À peine défigurée", which begins with the lines "Adieu tristesse/Bonjour tristesse..." An English-language film adaptation was released in 1958, directed by Otto Preminger.[1]',
        image_url: 'https://d3525k1ryd2155.cloudfront.net/h/082/787/1102787082.0.x.jpg'
    });

    // console.log(lesMiserables);
    // console.log(laChartreuseDeParme);
    // console.log(bonjourTristesse);

    lesMiserables.save();
    laChartreuseDeParme.save();
    bonjourTristesse.save();

}

// seedBookCollection();



//data seeding

function seedBookCollection() {
    const sara = new userModel({
        email: 'Sara.Zwairi @gmail.com',
        books: [
            {
                name: 'LEnfer cest les autres',
                description: 'is a 1944 existentialist French play by Jean-Paul Sartre. The original title is the French equivalent of the legal term in camera, referring to a private discussion behind closed doors. The play was first performed at the Théâtre du Vieux-Colombier in May 1944.'   ,
                image_url: 'https://images-na.ssl-images-amazon.com/images/I/41bDz8fScrL._SX331_BO1,204,203,200_.jpg'
            }
            ,
            {
                name: 'Le Rouge et le Noir',
                description: 'is a historical psychological novel in two volumes by Stendhal, published in 1830.[1] It chronicles the attempts of a provincial young man to rise socially beyond his modest upbringing through a combination of talent, hard work, deception, and hypocrisy. He ultimately allows his passions to betray him.',
                image_url: 'https://images-na.ssl-images-amazon.com/images/I/71JTQtfS6yL.jpg'
            }
        ]
    })


    const dina = new userModel({
        email: 'dina_albarghouthi@yahoo.com',
        books: [
            {
                name: 'Notre-Dame de Paris',
                description: ' referred to simply as Notre-Dame,[a] is a medieval Catholic cathedral on the Île de la Cité in the 4th arrondissement of Paris. The cathedral was consecrated to the Virgin Mary and considered to be one of the finest examples of French Gothic architecture. ',
                img: 'https://images-na.ssl-images-amazon.com/images/I/81umBb4X8yL.jpg'
            }
        ]
    });

    sara.save();
    dina.save();

}

// seedBookCollection();


app.get('/',homeHandler);
app.get('/books', getBooksHandler);


function homeHandler(req, res) {
    res.send('Home Page');
}



function getBooksHandler(req,res) {
    let userEmail = req.query.email;
    
    userModel.find({email:userEmail},function(err,userData){
        if(err) {
            console.log('something went wrong')
        } else {
          
            // console.log(userData[0].books)
            res.send(userData[0].books)
        }
    })
}



    app.listen(PORT, () => {
        console.log(`Listening on ${PORT}`);
    });