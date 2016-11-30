var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Task = mongoose.model('Task');

/* Param to get task from DB */

router.param('task', function(req, res, next, id){
  var query = Task.findById(id);

  query.exec(function (err, task){
    if(err) { return next(err);}
    if(!task) { return next(new Error('Task não encontrada!'))}

    req.task = task;
    return next();
  })
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  Task.find(function(err, tasks){
    if(err){return next(err)};
    res.render('index', { tasks: tasks });
  })
});

router.get('/new', function(req, res, next) {
  Task.find(function(err, tasks){
    if(err){return next(err)};
    res.render('new', { tasks: tasks });
  })
});

router.post('/new', function(req, res, next){
  var task = new Task(req.body);

  task.save(function (err, post){
    if(err) return next(err);

    res.redirect('/')
  })
});

router.get('/delete/:task', function(req, res, next){
  var task = req.task;
  task.remove( function(err){
    if (err)  return next(err);

    res.redirect('/');
  });
})

router.get('/update/:task', function(req, res, next){
    var task = req.task;

    res.render('update', {task: task});
});

router.post('/update/:task', function(req, res, next){
    var task = req.task;
    task.update({text: req.body.text}, function(err){
      if (err) {return next(err)};
      res.redirect('/');
    })

});








module.exports = router;
