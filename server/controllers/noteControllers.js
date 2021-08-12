import asyncHandler from "express-async-handler";
import Note from "../models/noteModel.js";

// @desc get notes & get token
// @route POST /api/notes/
// @access Private
const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id });
  res.json(notes);
});

// @desc create note
// @route POST /api/notes/create
// @access Private
const createNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;
  if (!title || !content || !category) {
    res.status(400);
    throw new Error("Please fill all the fields!");
  } else {
    const note = new Note({ user: req.user._id, title, content, category });

    const createNote = await note.save();
    res.status(201).json(createNote);
  }
});

// @desc get single note by id
// @route POST /api/notes/:id
// @access Private
const getNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note) {
    res.json(note);
  } else {
    res.status(404);
    throw new Error("Note not found!");
  }
});

// @desc update note
// @route POST /api/notes/
// @access Private
const updateNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;
  const note = await Note.findById(req.params.id);

  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action!");
  }
  if (note) {
    note.title = title;
    note.content = content;
    note.category = category;

    const updateNote = await note.save();
    res.json(updateNote);
  } else {
    res.status(404);
    throw new Error("Note not found!");
  }
});

// @desc get notes & get token
// @route POST /api/notes/
// @access Private
const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action!");
  }

  if (note) {
    await note.remove();
    res.json({ message: "Note removed!" });
  } else {
    res.status(404);
    throw new Error("note not found!");
  }
});

export { getNotes, createNote, getNoteById, updateNote, deleteNote };
