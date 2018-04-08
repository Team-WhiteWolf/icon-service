var azure = require('azure');

var path = 'Endpoint=sb://servicequeues.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=AUNiefT6dHz3ivqbYvpteI+LlwvOWE2M0OleRycSXzs=';
var serviceBusService = azure.createServiceBusService(path);


var message = {
  body: 'Test message',
  customProperties: {
    testproperty: 'TestValue'
  }
};

serviceBusService.sendQueueMessage('icon-recieve', message, function (error) {
  if (!error) {

    database();

  }
});

function database() {

  const mysql = require('mysql2');

  var config =
    {
      host: 'icon-db.mysql.database.azure.com',
      user: 'wolf@icon-db',
      password: 'EJ6chESAmK',
      port: 3306,
      ssl: true
    };

  const conn = new mysql.createConnection(config);

  conn.connect(
    function (err) {
      if (err) {
        console.log("!!! Cannot connect !!! Error:");
        throw err;
      }
      else {
        console.log("Connection established.");
        //------------------------------------Create Database---------------------------------------
        /*
         var sql = "";
 
         conn.query(sql, function (err, results, fields) {
           if (err) throw err;
           //console.log('error');
         })
 */
        var sql = [
          "create Database iconDb;",
          "USE iconDb CREATE TABLE `Icon` (`id` varchar(50) NOT NULL, `filename` varchar(50) NOT NULL, `file` TEXT NOT NULL, PRIMARY KEY (`id`));",

          "create Database issueDb;",
          "USE issueDb CREATE TABLE `Issue` (`id` varchar(50) NOT NULL,`creatorID` varchar(50) NOT NULL,`issueGroupID` varchar(50) NOT NULL UNIQUE,`projectId` varchar(50) NOT NULL,`issueHead` TEXT NOT NULL UNIQUE,`issueText` TEXT NOT NULL,`open` bool NOT NULL,`reopen` bool NOT NULL,`date` DATE NOT NULL, PRIMARY KEY (`id`));",
          "USE issueDb CREATE TABLE `Group` (`id` varchar(50) NOT NULL,`groupName` varchar(50) NOT NULL UNIQUE,PRIMARY KEY (`id`));",
          "USE issueDb CREATE TABLE `Tag` (`id` varchar(50) NOT NULL,`tagLabel` varchar(50) NOT NULL UNIQUE,PRIMARY KEY (`id`));",
          "USE issueDb CREATE TABLE `Comments` (`id` varchar(50) NOT NULL,`issueID` varchar(50) NOT NULL,`userID` varchar(50) NOT NULL,`Comment` TEXT NOT NULL,PRIMARY KEY (`id`));",
          "USE issueDb CREATE TABLE `Lifecycle` (`id` varchar(50) NOT NULL,`IssueId` varchar(50) NOT NULL,`createTimestemp` TIMESTAMP NOT NULL,`type` varchar(50) NOT NULL,PRIMARY KEY (`id`));",
          "USE issueDb CREATE TABLE `TagIssue` (`tagId` varchar(50) NOT NULL,`issueId` varchar(50) NOT NULL,PRIMARY KEY (`tagId`,`issueId`));",
          "ALTER TABLE `Issue` ADD CONSTRAINT `Issue_fk0` FOREIGN KEY (`creatorID`) REFERENCES ``(``);",
          "ALTER TABLE `Issue` ADD CONSTRAINT `Issue_fk1` FOREIGN KEY (`issueGroupID`) REFERENCES `Group`(`id`);",
          "ALTER TABLE `Comments` ADD CONSTRAINT `Comments_fk0` FOREIGN KEY (`issueID`) REFERENCES `Issue`(`id`);",
          "ALTER TABLE `Lifecycle` ADD CONSTRAINT `Lifecycle_fk0` FOREIGN KEY (`IssueId`) REFERENCES `Issue`(`id`);",
          "ALTER TABLE `TagIssue` ADD CONSTRAINT `TagIssue_fk0` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`);",
          "ALTER TABLE `TagIssue` ADD CONSTRAINT `TagIssue_fk1` FOREIGN KEY (`issueId`) REFERENCES `Issue`(`id`);",

          "CREATE Database calendarDb;",
          "USE calendarDb CREATE TABLE `Calendar` (`id` varchar(50) NOT NULL AUTO_INCREMENT,`name` TEXT NOT NULL, `description` TEXT NOT NULL,PRIMARY KEY (`id`));",
          "USE calendarDb CREATE TABLE `Notification` (`id` varchar NOT NULL,`appointmentId` varchar(50) NOT NULL UNIQUE,`notification` TEXT NOT NULL UNIQUE,`time` TIMESTAMP NOT NULL,PRIMARY KEY (`id`,`appointmentId`));",
          "USE calendarDb CREATE TABLE `Appointment` (`id` varchar(50) NOT NULL,`calendarID` varchar(50) NOT NULL,`creatorId` varchar(50) NOT NULL,`Name` TEXT NOT NULL,`description` TEXT NOT NULL,`location` TEXT NOT NULL,`startDate` DATE NOT NULL,`endDate` DATE NOT NULL,PRIMARY KEY (`id`));",
          "USE calendarDb CREATE TABLE `UserAppointment` (`userId` varchar(50) NOT NULL,`appointmentId` varchar(50) NOT NULL,`state` varchar(50) NOT NULL,PRIMARY KEY (`userId`,`appointmentId`));",
          "ALTER TABLE `Notification` ADD CONSTRAINT `Notification_fk0` FOREIGN KEY (`appointmentId`) REFERENCES `Appointment`(`id`);",
          "ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_fk0` FOREIGN KEY (`calendarID`) REFERENCES `Calendar`(`id`);",
          "ALTER TABLE `UserAppointment` ADD CONSTRAINT `UserAppointment_fk0` FOREIGN KEY (`appointmentId`) REFERENCES `Appointment`(`id`);",

          "CREATE Database projectDb;",
          "USE projectDb CREATE TABLE `Project` (`id` varchar(50) NOT NULL,`creatorId` varchar(50) NOT NULL,`iconId` varchar(50) NOT NULL`name` varchar(50) NOT NULL`description` TEXT NOT NULL,`creationDate` DATE NOT NULL,PRIMARY KEY (`id`));",
          "USE projectDb CREATE TABLE `Milestone` (`id` varchar(50) NOT NULL,`projectiId` varchar(50) NOT NULL,PRIMARY KEY (`id`));",
          "USE projectDb CREATE TABLE `IssueMilestone` (`issueId` varchar(50) NOT NULL,`milestoneId` varchar(50) NOT NULL,PRIMARY KEY (`issueId`,`milestoneId`));",
          "ALTER TABLE `Milestone` ADD CONSTRAINT `Milestone_fk0` FOREIGN KEY (`projectiId`) REFERENCES `Project`(`id`);",
          "ALTER TABLE `IssueMilestone` ADD CONSTRAINT `IssueMilestone_fk0` FOREIGN KEY (`milestoneId`) REFERENCES `Milestone`(`id`);",

          "CREATE Database groupPermissionDb;",
          "USE groupPermissionDb CREATE TABLE `GroupPermission` (`groupId` varchar(50) NOT NULL,`permissionId` varchar(50) NOT NULL,PRIMARY KEY (`groupId`,`permissionId`));",
          "USE groupPermissionDb CREATE TABLE `UserPermission` (`userId` varchar(50) NOT NULL,`permissionId` varchar(50) NOT NULL,PRIMARY KEY (`userId`,`permissionId`));",
          "USE groupPermissionDb CREATE TABLE `Permission` (`id` varchar(50) NOT NULL,`permission` varchar(50) NOT NULL,PRIMARY KEY (`id`));",
          "ALTER TABLE `GroupPermission` ADD CONSTRAINT `GroupPermission_fk0` FOREIGN KEY (`permissionId`) REFERENCES `Permission`(`id`);",
          "ALTER TABLE `UserPermission` ADD CONSTRAINT `UserPermission_fk0` FOREIGN KEY (`permissionId`) REFERENCES `Permission`(`id`);",
          "CREATE TABLE `User` (`id` varchar(255) NOT NULL,`name` TEXT NOT NULL UNIQUE,`password` varchar(255) NOT NULL,`hashAlgo` varchar(255) NOT NULL,`address` TEXT NOT NULL,`eMail` TEXT NOT NULL UNIQUE,`phoneNumber` DECIMAL NOT NULL,PRIMARY KEY (`id`));",
          "CREATE TABLE `Group` (`id` varchar(255) NOT NULL,`super` varchar(255),`head` varchar(255) NOT NULL,`description` TEXT NOT NULL,PRIMARY KEY (`id`));",
          "CREATE TABLE `UserGroup` (`userId` varchar(255), NOT NULL,`groupId` varchar(255) NOT NULL,PRIMARY KEY (`userId`,`groupId`));",
          "CREATE TABLE `PhoneNumber` (`id` varchar(255) NOT NULL,`number` varchar(255) NOT NULL UNIQUE,PRIMARY KEY (`id`));",
          "CREATE TABLE `UserPhoneNumber` (`userId` varchar(255) NOT NULL,`phoneNumberId` varchar(255) NOT NULL AUTO_INCREMENT,`type` varchar(255) NOT NULL,PRIMARY KEY (`userId`,`phoneNumberId`));",
          "ALTER TABLE `Group` ADD CONSTRAINT `Group_fk0` FOREIGN KEY (`super`) REFERENCES `Group`(`id`);",
          "ALTER TABLE `UserGroup` ADD CONSTRAINT `UserGroup_fk0` FOREIGN KEY (`userId`) REFERENCES `User`(`id`);",
          "ALTER TABLE `UserGroup` ADD CONSTRAINT `UserGroup_fk1` FOREIGN KEY (`groupId`) REFERENCES `Group`(`id`);",
          "ALTER TABLE `UserPhoneNumber` ADD CONSTRAINT `UserPhoneNumber_fk0` FOREIGN KEY (`userId`) REFERENCES `User`(`id`);",
          "ALTER TABLE `UserPhoneNumber` ADD CONSTRAINT `UserPhoneNumber_fk1` FOREIGN KEY (`phoneNumberId`) REFERENCES `PhoneNumber`(`id`);"
        ];

        for (var i in sql) {
          conn.query(i, function (err, results, fields) {
            if (err) throw err;
            //console.log('error');
          })
        }

      }
    });
}

