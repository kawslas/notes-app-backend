const { 
    addNoteHandler, 
    allNotesHandler, 
    showingNotesDetail, 
    editNotes, deleteNoteById } = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler,
    },
    {
        method: 'GET',
        path: '/notes',
        handler: allNotesHandler,
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: showingNotesDetail,
      },
      {
        method: 'PUT',
        path: '/notes/{id}',
        handler: editNotes,
      },
      {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteNoteById,
      }
];

module.exports = routes;