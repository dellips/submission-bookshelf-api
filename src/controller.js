import { nanoid } from 'nanoid';
import books from './books.js';

export const createBook = (req, res, next) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.body;

    if (!name) {
        return res.status(400).json({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
    }

    if (readPage > pageCount) {
        return res.status(400).json({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
    }

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage;

    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
        
    };
    books.push(newBook);

    return res.status(201).json({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
            bookId: id
        },
    });
};

export const getBooks = (req, res) => {
    const responseBooks = books.map(({ id, name, publisher }) => ({
        id,
        name,
        publisher,
    }));

    return res.status(200).json({
        status: 'success',
        data: {
            books: responseBooks,
        },
    });
};

export const getBookById = (req, res) => {
    const { id } = req.params;
    const book = books.find((n) => n.id === id);
    if (book) {
        return res.status(200).json({
            status: 'success',
            data: { book }
        });
    }
    return res.status(404).json({
        status: 'fail',
        message: 'Buku tidak ditemukan'
    });
};

export const editBookById = (req, res) => {
    const { id } = req.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.body;

    if (!name) {
        return res.status(400).json({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        });
    }

    if (readPage > pageCount) {
        return res.status(400).json({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        });
    }

    const index = books.findIndex((book) => book.id === id);

    if (index === -1) {
        return res.status(404).json({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan',
        });
    }

    const updatedAt = new Date().toISOString();
    const finished = pageCount === readPage;

    books[index] = {
        ...books[index],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        updatedAt,
    };

    return res.status(200).json({
        status: 'success',
        message: 'Buku berhasil diperbarui',
    });
};

export const deleteBookById = (req, res) => {
    const { id } = req.params;
    const index = books.findIndex((n) => n.id === id);

    if (index !== -1) {
        books.splice(index, 1);
        return res.json({
            status: 'success',
            message: 'Buku berhasil dihapus'
        });
    }

    return res.status(404).json({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan'
    });
};