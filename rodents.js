let round = 0
let sentences = []
let scoreChamber = [false, false, false, false, false, false, false, false]
let scores = [0, 0, 0, 0, 0, 0, 0, 0]

let noOfPlayers = 0
const defaultColor = "ivory"
let dex = {}

const cards =  {
    "card0": "What",
    "card4": "?",
    "card13":[
        "is cute",
        "plays a game",
        "is seen as evil",
        "can do whatever it wants",
        "solves mysteries",
        "is mocked",
        "can be useful, given he right circumstances",
        "drinks from a cup",
        "is on the planet Jupiter",
        "speaks in a loud voice",
        "is dumb",
        "is annoying"
    ],
    "card2":[
        "and",
        "because it",
        "but never",
        "or always",
        "yet sometimes",
        "and so"
    ]
}

const updateScores = noOfPlayers => {
    for(let i = 0; i < noOfPlayers; i++){ 
        scorePoints(i)
    }
}

const scorePoints = scorePl => {
    if(scoreChamber[scorePl] === true){
        scores[scorePl]++
        document.querySelector("#score" + scorePl).innerText = "Score: " + scores[scorePl]
    }
}

const clearButton = scorePl => {
    let buttonId = "#button" + scorePl
    document.querySelector(buttonId).style.backgroundColor = defaultColor
    document.querySelector(buttonId).innerText = 'No score'
 
}

const resetButtons = noOfPlayers => {
    scoreChamber = [false, false, false, false, false, false, false, false]
    for(let i = 0; i < noOfPlayers; i++){ 
        clearButton(i)
    }
}


const chamberScore = (ev, scorePl) => {
    
    if(checkTrues(scoreChamber) >= 3 && scoreChamber[scorePl] === false) { return 0 }
    if(round === 0) { return 0 }
    scoreChamber[scorePl] = !scoreChamber[scorePl]
    let buttonId = "#button" + scorePl
    document.querySelector(buttonId).style.backgroundColor = scoreChamber[scorePl] ? "gold" : defaultColor
    document.querySelector(buttonId).innerText = scoreChamber[scorePl] ? 'Give point' : 'No score'
}

const checkTrues = scores => {
    let count = 0
    scores.forEach(i => {if(i === true) { count++ }})
    return count
}







//import { cards } from './data.js'






function shuffle(arr){
    let ret = []
    while(arr.length > 0){
        let spot = Math.floor(Math.random() * arr.length)
        ret.push(arr.splice(spot,1))
        
      }
      return ret
    }

function initDecks(){ 
    return {
        "words": shuffle(cards.card13),
        "prepositions": shuffle(cards.card2)
    }
}

function makeSentence(){

    let word1 = dex.words.pop()
    let word2 = dex.prepositions.pop()
    let word3 = dex.words.pop()

    return (cards.card0 + " " + word1 + " " + word2 + " " + word3 + cards.card4)

}

function initView(){

    noOfPlayers = parseInt(document.querySelector("#playerNo").value)

    if(isNaN(noOfPlayers)) { return false }

    if(noOfPlayers > 8) { return false }

    document.querySelector("#nextButton").innerText = "Accept points and Start Next Round"

    for(let i of document.querySelectorAll(".preGame")){
        i.style.display = "none"
    }


    for(let i = 0; i < noOfPlayers; i++){
        let width = 80 / noOfPlayers
        document.querySelector("#div" + i).style.display = "inline-block"
        document.querySelector("#div" + i).style.width = width + "vw"  
        document.querySelector("#score" + i).innerText = "Scoxre: 0"
    }

    return true
}

function initSentences(dex){
    let sentences = []
    while(dex.prepositions.length > 1){ 
        sentences.push(makeSentence())
    }
    return sentences
}

function toNextRound(){

    if(round === 0) {
        if (!initView()) { return 0 }
    }

    if(sentences.length === 0 && round === 0){
        dex = initDecks()
        sentences = initSentences(dex)
    }

    if(sentences.length === 0){
        document.querySelector("#nextButton").style.display = "none"
    }


    document.querySelector('#sentenceText').innerText = sentences.splice(0,1)
    updateScores(noOfPlayers)
    resetButtons(noOfPlayers)
    round++


}

