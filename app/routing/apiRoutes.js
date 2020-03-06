var friendsData = require("../data/friends");

module.exports = function (app) {


  app.get("/api/friends", function (req, res) {
    res.json(friendsData);
  });




  app.post("/api/friends", function (req, res) {
    var currentUserData = req.body
    var userScore = currentUserData.scores

        var totalDifference;
        var bestMatch = {
            name: "",
            picture: "",
            difference: 100
        };
        for (var i = 0; i < friendsData.length; i++) {
            totalDifference = 0;
            for (var j = 0; j < friendsData[i].scores.length; j++) {
                totalDifference += Math.abs(friendsData[i].scores[j] - userScore[j]);
                // console.log(totalDifference)
                if (totalDifference <= bestMatch.difference) {
                    bestMatch.name = friendsData[i].name,
                        bestMatch.picture = friendsData[i].photo,
                        bestMatch.difference = totalDifference
                        console.log("-------")
                        console.log(bestMatch)
                        console.log("-------")
                }
            }
        };
        friendsData.push(currentUserData);
        res.json(bestMatch);

  });



  app.post("/api/clear", function (req, res) {
    friendsData.length = 0;
    res.json({ ok: true });
  });
};