class validator {
    static validateTaskInfo(taskInfo, taskData) {
      if(taskInfo.hasOwnProperty("title") &&
        taskInfo.hasOwnProperty("tid") &&
        taskInfo.hasOwnProperty("description") &&
        taskInfo.hasOwnProperty("status") && this.validateUniqueTaskId(taskInfo, taskData)) {
          return {
            "status": true,
            "message": "Course has been added"
          };
        }
        if(!this.validateUniqueTaskId(taskInfo, taskData)){
          return {
            "status": false,
            "message": "Course id has to be unique"
          };
        }
        return {
          "status": false,
          "message": "Course Info is malformed please provide all the properties"
        }
    }
  
    static validateUniqueTaskId(taskInfo, taskData) {
      let valueFound = taskData.tasks.some(el => el.tid === taskInfo.tid);
      if(valueFound) return false;
      return true;
    }

  }
  
  module.exports = validator;