const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const sequelize = require('./util/database');

const User = require('./models/User');
var cors = require('cors');

const app = express();

app.use(cors());

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.post('user/add-user', async(req, res, next) =>{
    try{
        const name =  req.body.name;
        const email =  req.body.email;
        const phone_no =  req.body.phone_no;
        const date = req.body.date;
        const time = req.req.time;

        const data  =  await User.create ( {name: name, email: email, phone_no: phone_no , date: date , time: time });
        res.status(201).json( {newUserDetail: data});
    }
    catch(err){
        console.log("Post User is failing ", JSON.stringify(err));
        res.status(500).json({
            error: err
        })
    }
});
app.get('user/get-users' , async(req, res, next) =>{
    try{
        const users = await User.findAll();
        res.status(200).json({allusers : users});
    }
    catch(err){
        console.log("Get User is failing ", JSON.stringify(err));
        res.status(500).json({
            error: err
        })
    }
});

app.delete('user/delete-user/:id' , async(req, res, next) =>{
    try{
        if(!res.params.id){
            console.log("id is missing");
            return res.status(400);
        }
        const userId = req.params.id;
        await User.destroy({where: {id: userId}});
        res.sendStatus(200);
    }
    catch(err){
        console.log("Delete User is failing ", JSON.stringify(err));
        res.sendStatus(500).json({
            error: err
        })
    }
});

app.use(errorController.get404);

sequelize
.sync()
.then(result =>{
    // console.log(result);
    app.listen(9000);
})
.catch(err=>{
    console.log(err);
});


