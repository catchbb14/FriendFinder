var friendData = require("../data/friends.js");

function determineMatch(user) {
    var minDifference = Number.MAX_SAFE_INTEGER;
    var name = "";
    

    function calcDifference(total, num, index) {
        return total + (Math.abs(user.scores[index] - num));
    }

    friendData.forEach( function(f) {
        var difference = f.scores.reduce(calcDifference);
        if(difference < minDifference) {
            minDifference = difference;
            name = f.name;
        }
        console.log("Name " + f.name + " Difference: " + difference );
    })

    return friendData.find(f => f.name === name);

}

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friendData);
    });
    app.post("/api/friends", function(req, res) {
        var match = determineMatch(req.body)
        friendData.push(req.body);
        
        res.json(match);
    });
}