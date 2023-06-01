const express = require('express');
const starWars = require('./data.json');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.listen(PORT, (req, res)=>{
    console.log('Servidor escuchando: '+PORT)
});

//middlerare
app.use(express.json());

//Rutas
app.get('/', (req, res)=>{
    res.sendFile(__dirname+'/index.html');
});

app.get('/api/personajes', (req, res)=>{
    res.send(starWars);
});

app.get('/api/data1', (req, res)=>{
    let data1 = [];
    for(let i of starWars.results){
        data1.push({
            'name': i.name, 
            'height':i.height
        })
    }
    res.send(data1)
})

app.get('/api/data2', (req, res)=>{
    let data2 = [];
    for(let i of starWars.results){
        data2.push({
            'name': i.name,
            'gender': i.gender
        })
    }
    res.send({message:'Todo salio correcto',
    data2})
    
})

//kevin con map
/* app.get('/api/data2', (req, res) => {   //Ruta que devuelve nombre y genero utilizando map
    let characters = starWars.results.map(character => {
        return {
            name: character.name,
            gender: character.gender
        };
    });
    res.json(characters);    
}); */

app.post("/api/personajes", (req, res)=>{
    console.log(req.body)
    let {name, height, gender} = req.body;
    let personaje = {name, height, gender} 
    starWars.results.push(personaje)
    res.status(201).send({
        message: 'Personaje creado con exito',
        starWars: personaje
    });
});

app.delete("/api/personajes/:name", (req, res)=>{
    const name = req.params.name
    
    for(let i of starWars.results){
        if(i.name == name){
            starWars.results = starWars.results.filter(p => p.name != name)
            res.send({
                message:('Borrado con exito '+name)
            })
        }
    }
});

app.put("/api/personajes/:name", (req, res)=>{
    const name = req.params.name
    console.log(name)
    let personaje = starWars.results.find(p => p.name == name)
    console.log(personaje)
    if(personaje){
        let {name, height, gender} = req.body;
        personaje.name = name;
        personaje.height = height;
        personaje.gender = gender;
        console.log('Modificado exitosamente')
        res.status(201).send(personaje)
    }
});
