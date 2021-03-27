import express, { Request, Response } from 'express'
import { generateUUID } from '../generateUUID'
import Notes from '../models/stickyNotes'


// const router = express.Router();

// GET : return all entries

export let allNotes = (req: Request, res: Response) => {

  let notes = Notes.find((err: any, notes: any) => {
    if (err) {
      res.send("Error!")
    }
    else {
      res.send(notes);
    }
  })
}


export let oneNote = (req: Request, res: Response) => {
  let notes = Notes.findById(req.params.id, (err: any, notes: any) => {
    if (err) {
      res.send("Error!")
    }
    else {
      res.send(notes);
    }
  })
}


export let deleteNotes = (req: Request, res: Response) => {
  console.log(req.params.id);
  //let {uuid} = req.body;
  let options; // it is just a dummy document
  let note = Notes.deleteOne({ _id: req.params.id }, options, (err: any) => {
    if (err) {
      res.send(err);
    }
    else {
      res.send("Successfully delete book");
    }
  });

}


export let updateNotes = (req: Request, res: Response) => {
  console.log(req.body);
  let note = Notes.findByIdAndUpdate(
    req.params.id,
    req.body,
    (err: any, note: any) => {
      if (err) {
        res.send(err);
      }
      else {
        res.send("Succesfully updated note!")
      }
    }
  )
}

export let createLink = (req: Request, res: Response) => {
  // console.log(req.body);
  const uuid = generateUUID();
  let note = new Notes({ uuid });
  console.log(note);
  note.save((err: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send(note);
    }
  });
}

export let addNote = async (req: Request, res: Response) => {
  console.log(req.body);
  const uuid = generateUUID();
  let note = await Notes.findOne({ "_id": req.params.id });
  //  console.log(note);
  note.notes.push({ uuid: uuid, header: req.body.header, body: req.body.body });
  note.save((err: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send(note);
    }
  });
}

export let updateNote = async (req: Request, res: Response) => {
  let options; //dummy one
  let note = await Notes.findOneAndUpdate({ _id: req.params.id1, "notes._id": req.params.id2 },
    { "$set": { "notes.$.header": req.body.header, "notes.$.body": req.body.body } }, options, (err: any) => {
      if (err) {
        res.send(err);
      }
      else {
        res.send("Successfully updated note !!");
      }
    }
  );
  console.log(note);
}

export let deleteNote = async (req: Request, res: Response) => {
  let note = Notes.findOne({ _id: req.params.id1},
    (err: any, result : any ) => {
    if (err) {
      result.send(err);
    }
    else {
      console.log(result.notes.id(req.params.id2));
      result.notes.id(req.params.id2).remove();
      result.save();
      res.send("scuccessfully deleted note");
    }
  });

}




