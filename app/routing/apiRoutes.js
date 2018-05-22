var friendData = require("../data/friends.js");

function determineMatch(user) {
    var minDifference = Number.MAX_SAFE_INTEGER;
    var name = "";
    

    function calcDifference(scoreArray) {
        var total = 0;
        scoreArray.forEach( function(s, index) {
            total += Math.abs(+s - +user.scores[index]);
        })
        return total;
    }

    friendData.forEach( function(f) {
        var difference = calcDifference(f.scores);
        if(difference < minDifference) {
            minDifference = difference;
            name = f.name;
        }
       
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