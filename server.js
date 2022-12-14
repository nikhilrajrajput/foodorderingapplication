require('dotenv').config();
const express = require('express');
const app=express();
const path=require('path')
const ejs=require('ejs');
const expressLayout=require('express-ejs-layouts')
const mongoose=require('mongoose')
const session = require('express-session')
const flash=require('express-flash');
const passport = require('passport');
// const MongoStore = require('connect-mongo');
const MongoDbStore = require('connect-mongodb-session')(session);
// let mix = require('laravel-mix');

const port=process.env.PORT || 3000;

//Database Connection

const url='mongodb://localhost:27017/test';



// const connection=mongoose.connection;
mongoose.connect(url,{
    useNewUrlParser: true,
    // useCreateIndex:true,
    useUnifiedTopology:true,
    // useFindAndModify:true
}).then(()=>{
    console.log('Connection successful');
    
}).catch((err)=>{
    console.log(`Connection failed due ${err}`);
})


        //Session store
        
// let mongoStore = new MongoDbStore({
//             mongooseConnection: 'mongodb://localhost:27017/pizza',
//             // mongooseConnection: connection,
//             collection: 'sessions'
//         })
        
        
        
// Session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoDbStore({
        mongooseConnection: url,
        collection: 'session'
    }),

    // store: MongoStore,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hour
}))

const passportInit = require('./app/config/passport')
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());




app.use(flash());
app.use((req,res,next)=>{
    res.locals.session= req.session
    res.locals.user = req.user
    next()
})



app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())






app.use(expressLayout);
app.set('views', path.join(__dirname,'/resources/views'))
app.set('view engine', 'ejs')



require('./routes/web')(app);

app.listen(port,()=>{
    console.log(`Server is running at ${port}`)
})
