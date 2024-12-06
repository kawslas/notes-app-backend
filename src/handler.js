const { nanoid } = require("nanoid");
const notes = require('./notes');

const addNoteHandler = (request, h) => {
    const { title, tags, body } = request.payload;
    const createdAt = new Date().toISOString;
    const updatedAt = createdAt;
    const id = nanoid(16);

    const newNotes = {
        title, tags, body, createdAt, updatedAt, id,
    };

    notes.push(newNotes);


    const isItSuccess = notes.filter((note) => note.id === id ).length > 0;

    if (isItSuccess){
        const response = h.response({
            status: 'Success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id,
            },
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'Fail',
        message: 'Catatan gagal ditambahkan',
    });
    response.code(500);
    return response;
};
const allNotesHandler = () => ({
    status: 'success',
    data: {
        notes,
    },
});

const showingNotesDetail = (request, h) => {
    const { id } = request.params;
    
    const note = notes.filter((n) => n.id === id)[0];

    if (note !== undefined){
        return {
            status: 'Success',
            data: {
                note,
            },
        };
    }
    const response = h.response({
        status: 'Fail',
        message: 'Catatan gagal diakses',
    });
    response.code(404);
    return response;
};

const editNotes = (request, h) => {
    const { id } = request.params;
    const { title, tags, body } = request.payload;
    const updatedAt = new Date().toISOString;
    const createdAt = updatedAt;
    
    const notesIndex = notes.findIndex((note) => note.id === id);

    if (notesIndex !== -1){
        notes[notesIndex] = {
            ...notes[notesIndex],
            title,
            tags,
            body,
            updatedAt,
            createdAt,
        };

        const response = h.response({
            status: 'Success',
            message: 'Catatan berhasil diedit',
        });
        response.code(200);
        return response;
    };
    const response = h.response({
        status: 'Fail',
        message: 'Catatan gagal diedit',
    });
    response.code(400);
    return response;
    

};
const deleteNoteById = (request, h) => {
    const { id } = request.params;

    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1){
        notes.splice(index, 1);
        const response = h.response({
            status: 'Success',
            message: 'Berhasil menghapus catatan',
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'Fail',
        message: 'Catatan gagal untuk dihapus',
    });
    response.code(400);
    return response;
}


module.exports = {addNoteHandler, allNotesHandler, showingNotesDetail, editNotes, deleteNoteById};