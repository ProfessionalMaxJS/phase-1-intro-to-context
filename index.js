// Your code here
function createEmployeeRecord(datapoints){
    let newEmployee = {firstName: datapoints[0], familyName: datapoints[1], title: datapoints[2], payPerHour: parseInt(datapoints[3], 10), timeInEvents: [], timeOutEvents: []};
    return newEmployee;
}

function createEmployeeRecords(dataSets){
    let newEmployees = [];
    for(let i=0; i<dataSets.length; i++){
        newEmployees.push(createEmployeeRecord(dataSets[i]))
    }
    return newEmployees;
}

function createTimeInEvent(employeeRecord, dateCode){
    let parsedDateCode = dateCode.split(" ");
    let newInEvent = {type: "TimeIn", hour: parseInt(parsedDateCode[1], 10), date: parsedDateCode[0]}
    employeeRecord.timeInEvents.push(newInEvent)
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateCode){
    let parsedDateCode = dateCode.split(" ");
    let newOutEvent = {type: "TimeOut", hour: parseInt(parsedDateCode[1], 10), date: parsedDateCode[0]}
    employeeRecord.timeOutEvents.push(newOutEvent)
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date){
    return (((employeeRecord.timeOutEvents.find(record => record.date === date).hour)-(employeeRecord.timeInEvents.find(record => record.date === date).hour))/100);
}

function wagesEarnedOnDate(employeeRecord, date){
    let payDay = 0
    payDay = hoursWorkedOnDate(employeeRecord, date)*employeeRecord.payPerHour;
    return payDay
}

function allWagesFor(employeeRecord){
    let allWages = 0
      employeeRecord.timeInEvents.reduce((wages=0, timeInEvent)=>{
          wages += wagesEarnedOnDate(employeeRecord, timeInEvent.date)
          allWages = wages
          return wages
      }, 0)
    return allWages;
  }

  function calculatePayroll(employeeRecords){
      let totalPayroll = 0
      for (let i=0; i<employeeRecords.length; i++){
        totalPayroll += allWagesFor(employeeRecords[i]);
      }
      return totalPayroll;
  }