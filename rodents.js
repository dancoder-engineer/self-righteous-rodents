let round = 0
let sentences = []
let scoreChamber = [false, false, false, false, false, false, false, false]
let scores = [0, 0, 0, 0, 0, 0, 0, 0]
let postGame = false
let debug = false

let noOfPlayers = 0
const defaultColor = "ivory"
let dex = {}


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






function shuffle(deck){
    let ret = []
    let arr = [...deck]
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

    if(noOfPlayers < 3 || noOfPlayers > 8 ) { return false }

    document.querySelector("#nextButton").innerText = "Accept points and Start Next Round"
    document.querySelector("#playerHolder").style.display = "block"
    document.querySelector("#preGameDiv").style.display = "none"


    for(let i = 0; i < noOfPlayers; i++){
        let width = 80 / noOfPlayers
        document.querySelector("#div" + i).style.display = "inline-block"
        document.querySelector("#div" + i).style.width = width + "vw"  
        document.querySelector("#score" + i).innerText = "Score: 0"
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
    

    if(postGame){
        resetVars()
        resetView()
        postGame = false
    }

    if(debug && round === 2) { //this is 1 in order to test the post ganme screen
        updateScores(noOfPlayers)
        doPostGame()
        return 0
    }

    if(round === 0) {
        dex = initDecks()
        sentences = initSentences(dex)
        if (!initView()) { return 0 }
    }

    if(sentences.length === 0 && round === 0){
        
    }

    if(sentences.length === 0){
        updateScores(noOfPlayers)
        doPostGame()
        return 0
    }


    document.querySelector('#sentenceText').innerText = sentences.splice(0,1)
    updateScores(noOfPlayers)
    resetButtons(noOfPlayers)
    round++
}


const resetVars = () => {
    round = 0
    scores = [0, 0, 0, 0, 0, 0, 0, 0]
    scoreChamber = [false, false, false, false, false, false, false, false]
}

const resetView = () => { 
    dex = initDecks()
    sentences = initSentences(dex)
    for(let i = 0; i < 8; i++){
        document.querySelector("#div" + i).style.display = "none"
    }

    document.querySelector("#postGame").style.display = "none"
    document.querySelector("#preGameDiv").style.display = "block"
    
}