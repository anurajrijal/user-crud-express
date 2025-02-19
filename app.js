import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { User } from './models/user.js';



const __filename= fileURLToPath(import.meta.url);
const __dirname= path.dirname(__filename);


const app = express();

app.set("view engine",'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));

app.get('/', (req,res)=>{
    res.render("index.ejs");
});
app.get('/read', async(req,res)=>{
    let users = await User.find()
    res.render("read", { users }); 
})

app.get('/edit/:userid', async(req,res)=>{
    let users = await User.findOne({_id: req.params.userid});
    res.render("edit",{ users }); 
})

app.post('/update/:userid', async(req,res)=>{
    let{image, name, email}= req.body;
    let users = await User.findOneAndUpdate({_id: req.params.userid}, {image, name , email}, {new:true});
    res.redirect("/read"); 
})


app.get('/delete/:id', async(req,res)=>{
    let users = await User.findOneAndDelete({_id: req.params.id});
    res.redirect("/read"); 
})


app.post('/create', async(req,res)=>{
    console.log("Request Body:", req.body);
    let{name,email, image}= req.body;
    let createduser = await User.create(
       { name, email, image}
    );
    res.redirect("/read");
})


app.listen(3000);