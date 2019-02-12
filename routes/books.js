var express = require('express');
var router = express.Router();
var Book = require("../models").Book


router.get('/', (req, res, next) => {
  Book.findAll({order: [['title', 'ASC']]}).then((books) => {
    res.render('index',{//index.pug (the table)
      books
    });
  })
  .catch((error) => {
    res.send(500, error);
  })
});

//                                                    book
router.get('/new', (req, res, next) => {
  res.render('newBook',{
    title: 'Enter A New Book',
  });
})

router.post('/new', function(req, res, next){
  Book.create(req.body).then(function(book){
    res.redirect('/books/');
  })
  .catch((error) => {
    if(error.name === 'SequlizeValidationError'){
      res.render('newBook', {
        book: Book.build(req.body),
        title: 'Enter a New Book',
        errors: error.errors,
      })
    } else {
      throw error;
    }
  })
  .catch((error) => {
    res.send(500,error);
  });
});


router.get('/:id',(req, res, next) =>{
  Book.findById(req.params.id).then((books) => {
    if(books) {
      res.render('updateMe',{books, title:'Is There something you looking for?'});
    } else {
      res.render('notFound');
    }
  })
  .catch((error) => {
    res.send(500,error);
  })
});

router.post('/:id', (req, res, next) => {
  Book.findById(req.params.id).then((books) => {
    if(books) {
      return books.update(req.body);
    } else {
      res.send(404, error);
    }
  })
  .then((books) => {
    res.redirect('/books');
  })
  .catch((error => {
    if(error.name === 'SequelizeValidtionError') {
      const book = Book.build(req.body);
      book.id = req.params.id;
      res.render('updateMe',{
        books: book,
        title: 'Is There something you looking for?',
        errors: error.errors,
      })
    } else{
      throw error
    }
  }))
  .catch((error) => {
    res.send(500, error);
  })
});

router.post('/:id/delete', (req, res, next) => {
  Book.findById(req.params.id).then((books) => {
    if(books) {
      return books.destroy();
    } else {
      res.send(404, error);
    }
  })
  .then((books) => {
    res.redirect('/books/');
  })
  .catch((error) => {
    res.send(500, error);
  });
});

module.exports = router;
