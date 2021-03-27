import express from 'express';
import mongoose from 'mongoose'
import * as noteController from './controller/api'

const app = express();
const port = 3000;

//go to mongo create the stickynotes database
mongoose.connect('mongodb://127.0.0.1:27017/stickyNotes',{
  useCreateIndex : true,
  useNewUrlParser : true,
  useUnifiedTopology : true
},()=>{
  console.log('connected to database')
})

app.use(express.json())

//createLink
app.post("/create",noteController.createLink);

//adding note in a link
app.put("/addNote/:id", noteController.addNote);

//updating note in a link
app.put("/updateNote/:id1/:id2", noteController.updateNote);

//Deleting note in a link
app.delete("/deleteNote/:id1/:id2", noteController.deleteNote);

//reveing all the created links
//Notes: only for testing purpose
app.get("/alllinks", noteController.allNotes);

//retrieve each link
app.get("/notes/:id", noteController.oneNote);

// app.post("/notes", noteController.addNotes);

//updating the link
app.put("/updatenotes/:id", noteController.updateNotes);


//deleting the link
app.delete("/deletenotes/:id", noteController.deleteNotes);





app.listen(port,  () => {
  return console.log(`server is listening on ${port}`);
});