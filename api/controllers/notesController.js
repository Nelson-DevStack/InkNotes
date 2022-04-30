const mongoose = require('mongoose');
const noteModel = require('../models/Note');
const Note = mongoose.model('Note', noteModel);

const notesController = {

  getAll: async function(req, res){
    try{
      let notes = await Note.find().sort({createdAt: 'desc'});
      res.status(200).send(notes);
    }catch(err){
      res.send(err)
    }
  },

  post: async function (req, res){
    const { title, description, text } = req.body;
    const note = new Note({
      title,
      description,
      text,
    });

    try{
      let savedNote = await note.save();
      console.log('Saved successfully');
      res.status(200).json(savedNote);
    }catch(err){
      res.send(err)
    }
  },

  update: async function(req, res){
    let { id, title, description, text } = req.body;

    try{
      let updatedNote = await Note.findByIdAndUpdate(id, {
        title,
        description,
        text,
      }, { new: true })
      if(!updatedNote) {
        return res.status(400).json({msg: 'There is no Note with this id'})
      }else{
        console.log('Updated successfully');
        res.status(200).json(updatedNote);
      }
    }catch(err){
      res.status(500).json(err);
    }
  },

  delete: async function(req, res){
    let id = req.params.id;

    try{
      let deletedNote = await Note.findByIdAndDelete(id);
      console.log({msg: 'Deleted successfully', deletedNote: deletedNote});
      res.status(200).json({msg: 'Deleted successfully', deletedNote: deletedNote})
    }catch(err){
      res.status(500).json(err)
    }
  },

  findbyId: async function(req, res){
    let id = req.params.id;
    
    try{
      const noteId = await Note.findById(id);
      if(!noteId){
        console.log('There is no Note with this id');
        res.status(404).send('There is no Note with this Id');
      }else{
        // console.log(noteId);
        res.status(200).send(noteId)
      }
    }catch(err){
      res.send(err)
    }
  }
}

module.exports = notesController;