    function makeEndData(scores, noOfPlayers){
        let scoreDict = scores.map((score, idx) => ({"pNum": idx + 1, "pScore": score}))
        scoreDict.sort((a, b) => b.pScore-a.pScore)
        let scoreString = ""
        for(let i = 0; i < noOfPlayers; i++) {
            scoreString += `Player ${scoreDict[i].pNum}: ${scoreDict[i].pScore} points<br>`
        }
        return scoreString
    }

    function displayScores(scores, noOfPlayers){
        scoresP = document.querySelector("#finalScores")
        scoresP.innerHTML = makeEndData(scores, noOfPlayers)
    }

    const doPostGame = () => {
        postGame = true
        displayScores(scores, noOfPlayers)
     //   document.querySelector("#mainDiv").style.display = "none"
        document.querySelector("#playerHolder").style.display = "none"
        document.querySelector("#postGame").style.display = "inline-block"
        document.querySelector("#nextButton").innerText = "Reset Game"
        document.querySelector("#sentenceText").innerText = ""
        document.querySelector("#playerNo").value = ""
    }