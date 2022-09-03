const colors = require('colors');
const fs = require('fs');
let userArr = JSON.parse(fs.readFileSync('data.JSON', 'utf8'));
const path = require('path')


// Random Users
module.exports.getRandomUsers = (req, res) => {
    const randomUser = Math.floor(Math.random() * userArr.length);
    res.send(userArr[randomUser]);
    res.end();
}


// All Users
module.exports.getAllUsers = (req, res) => {
    const size = req.query.size;
    if(size){
        if(size > userArr.length){
            res.send({error: `Limit is crossed!, Your limit should be less than ${userArr.length}`})
        }else{
            res.send(userArr.slice(0, size))
            res.end()
        }  
    }else{
        res.send(userArr)
        res.end()
    }
}


// Save User
module.exports.saveUsers = (req, res) => {
    const newUser = req.body;
    newUser.id = userArr.length+1;

    if(!(newUser.id && newUser.name && newUser.gender && newUser.contact && newUser.address && newUser.photoUrl)){
        res.send("Make sure these fields are there in your data == Id, Name, Content, Gender, Address, PhotoUrl" .red
        )
    }else{        
        userArr.push(newUser);
        fs.writeFile('data.JSON', JSON.stringify(userArr), (err)=> { // to send dynamic data you must stringify it.
            if(err){
                res.send("error")
            }else{
                res.send("added")
            }
        });
    }
}


// Update User Info
module.exports.UpdateUser = (req, res) => {
    if(req.params.id != Number){
        res.send("Your ID Did Not Matched!!" .red)  
    }else{
        const id = req.params.id;
        const getUser = userArr.find(user => user.id == id)
        getUser.id = req.body.id || getUser.id;
        getUser.name = req.body.name || getUser.name;
        getUser.contact = req.body.contact || getUser.contact;
        getUser.gender = req.body.gender || getUser.gender;
        getUser.address = req.body.address || getUser.address;
        getUser.PhotoUrl = req.body.photoUrl || getUser.photoUrl;

        fs.writeFile('data.JSON', JSON.stringify(userArr), (err)=> { // to send dynamic data you must stringify it.
            if(err){
                res.send("error")
                res.end()
            }else{
                res.send("added")
                res.end()
            }
        });
    }
}


// Bulk-Update
module.exports.updateBulk = (req, res) => {
    const AllIds = req.body.ids;
    AllIds.forEach(_id => {
        const {address, gender, contact, photoUrl, id, name} = req.body;
        const gotData =  userArr.filter(user => user.id == _id)
        gotData[0].address = address || gotData[0].address
        gotData[0].name = name || gotData[0].name
        gotData[0].gender = gender || gotData[0].gender
        gotData[0].contact = contact || gotData[0].contact
        gotData[0].photoUrl = photoUrl || gotData[0].photoUrl
        gotData[0].id = id || gotData[0].id
    });
    
    fs.writeFile('data.JSON', JSON.stringify(userArr), (err)=> { // to send dynamic data you must stringify it.
        if(err){
            res.send("error")
            res.end()
        }else{
            res.send("added")
            res.end()
        }
    });
}


// Delete User
module.exports.deleteUser = (req, res) => {
        const id = req.params.id
        const newData = userArr.filter(user => user.id != id)
        fs.writeFile('data.JSON', JSON.stringify(newData), (err)=> { // to send dynamic data you must stringify it.
            if(err){
                res.send("error")
                res.end()
            }else{
                res.send("added")
                res.end()
            }
        });
}
