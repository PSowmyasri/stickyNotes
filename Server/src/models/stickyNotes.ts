import mongoose from 'mongoose';



export interface INotes extends mongoose.Document{
    uuid?: string,
    email?:string,
    notes?: {uuid:string,header:string,body:string}[]
}

export const NoteSchema = new mongoose.Schema({
        uuid:{
        type : String,
        unique: true,
        required: true
    },
    email:{
        type:String,
    },
    notes:[{uuid : String, header:String, body:String}]
})

const Notes = mongoose.model<INotes>("Notes",NoteSchema);

export default Notes;






