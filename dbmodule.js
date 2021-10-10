var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";




console.log("Connected");


exports.authenticateUser = function(username, roll, avg, response) {
//console.log("In Login");
//console.log(username);
//console.log(roll);
//console.log(avg);
db.emp.find({ "_id":username,"rollno": roll, "avg": avg },
function(err, users) {
//console.log(users);
//console.log(users.length);
if (err || !users) {
response.write("..Not authorized user" || err);
response.end();
            } else if (users.length == 0) {
response.write("Not authorized user");
response.end();
            } else {
response.write(username + " is Authorized user");
response.end();
            }

        });
}

exports.saveUser = function(username, roll, avg, response) {
console.log('Saving user to mongo');

db.emp.insert(  { "_id": username, "rollno": roll, "avg":avg },

function(err, saved) {
if(err)
console.log(err+"Error");
if (err || !saved)
{
    response.write(username + " is not Saved");
    console.log(err);

}
else{
response.write(username + " is Saved");
console.log("User saved"+saved);
}


            //dbo.close;
        }  );
}


exports.update = function(username, roll, avg1, response) {
    console.log('Update');
    console.log(username);
    console.log(roll);
    console.log(avg1);
    db.emp.updateOne({"_id": username}, {$set:{"rollno": roll, "avg": avg1} },
    function(err, users) {
                //console.log(users);
    if (err || !users) {
    response.write("..Not updated user" || err);
    response.end();
                } else if (users.length == 0) {
    response.write("Not updated user");
    response.end();
                } else {
    response.write(username + " record is updated");
    response.end();
                }
    
            });
    }

    exports.del = function(username, response) {
        console.log('delete');
       // console.log(username);
       // console.log(roll);
        //console.log(avg);
        db.emp.remove( { "_id": username },
        function(err, users) {
                    console.log(users);

        if (err) 
        {
            console.log("hi");
        response.write("..Not deleted user" || err);
        response.end();
         } 
        else if (users.length == 0) 
        {
        response.write("Not deleted user");
        response.end();
        }
         else {
            console.log("hi");
        response.write(username + " is deleted ");
        response.end();
        }
        
                });
        }