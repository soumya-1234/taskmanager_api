const taskRoutes=require('express').Router();
const taskData=require('../tasks.json');
const validator=require('../helpers/validate');
const bodyParser=require('body-parser');
const path=require('path');
const fs=require('fs');

taskRoutes.use(bodyParser.urlencoded({extended: false}));
taskRoutes.use(bodyParser.json());

taskRoutes.get('/', (req, res) => {
    res.status(200);
    res.send(taskData);
});

taskRoutes.get('/:taskId', (req, res) => {
    let tasks = taskData.tasks;
    let taskidpassed = req.params.taskId;
    let result = tasks.filter(val => val.tid == taskidpassed);
  
    res.status(200);
    res.send(result);
})

taskRoutes.post('/', (req, res) => {
    const taskDetails = req.body;
    let writePath = path.join(__dirname, '..', 'tasks.json');
    if(validator.validateTaskInfo(taskDetails, taskData).status) {
      let taskDataModified = JSON.parse(JSON.stringify(taskData));
      taskDataModified.tasks.push(taskDetails);
      fs.writeFileSync(writePath, JSON.stringify(taskDataModified), {encoding:'utf8', flag:'w'});
      console.log(taskDataModified);
      res.status(200);
      res.json(validator.validateTaskInfo(taskDetails, taskData));
    } else {
      res.status(400);
      res.json(validator.validateTaskInfo(taskDetails, taskData))
    }
});

taskRoutes.put('/:taskid', (req,res)=>{
    let tasks=taskData.tasks;
    let taskidpassed = req.params.taskId;
    let result = tasks.filter(val => val.tid == taskidpassed);
    if (!result) {
        return res.status(404).json({ error: 'Task not found' });
    }
    const { title, description, status } = req.body;
    if (!title || !description || status === undefined) {
        return res.status(400).json({ error: 'Invalid request body' });
    }
    let task={};
    task.title = title;
    task.tid=result.tid;
    task.description = description;
    task.status = status;
    res.json(task);
})

taskRoutes.delete('/:taskid', (req, res) => {
    let tasks=taskData.tasks;
    let writePath = path.join(__dirname, '..', 'tasks.json');
    const index = tasks.findIndex(t => t.tid == req.params.taskid);
    if (index === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }
    tasks.splice(index, 1);
    fs.writeFileSync(writePath, JSON.stringify(tasks), {encoding:'utf8', flag:'w'});
    res.sendStatus(204);
});

module.exports= taskRoutes;