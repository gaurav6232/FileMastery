const express = require('express')
const app = express();
 const path = require('path')
 const fs = require('fs')

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))

app.get("/", function(req, res, next){
    fs.readdir(`./files`, function(err, files){
        // console.log(files)
        res.render("index",{files: files})
    })
})



app.get("/file/:filename", function(req, res, next){
     fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err, filedata){
         res.render("Detail", {filename: req.params.filename, filedata: filedata})
     })
})


app.get("/edit/:filename", function(req, res, next){
    res.render('edit', {filename: req.params.filename})
})

app.post("/edit", function(req, res, next){
    fs.rename(`./files/${req.body.Previous}`, `./files/${req.body.New}`, function(err){
        res.redirect("/")
    })
})


app.post("/create", function(req, res, next){
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, function(err){
        res.redirect("/")
    })
  
})




// app.get("/profile/:username", function(req, res, next){
//     res.send(`welcome ${req.params.username}`)
// })

// app.get("/profile/:username/:age", function(req, res, next){
//     res.send(`welcome ${req.params.username} of age ${req.params.age}`)
// })


app.listen(3000, function(){
    console.log("its runing")
})
