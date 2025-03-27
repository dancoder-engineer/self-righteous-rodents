let round = 0
let sentences = []
let scoreChamber = [false, false, false, false, false, false, false, false, false]

const defaultColor = "ivory"

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
        "is on the plane Jupiter",
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



const chamberScore = (ev, scorePl) => {
    
    scoreChamber[scorePl] = !scoreChamber[scorePl]
    buttonId = "#button" + scorePl
    document.querySelector(buttonId).style.backgroundColor = scoreChamber[scorePl] ? "gold" : defaultColor
    console.log(scoreChamber)
}









//import { cards } from './data.js'
let dex = {}





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

function initSentences(dex){
    let sentences = []
    while(dex.prepositions.length > 1){ 
        sentences.push(makeSentence())
    }
    return sentences
}

function toNextRound(){
    if(sentences.length === 0){
        document.querySelector("#nextButton").style.display = "none"
    }

    document.querySelector('#sentenceText').innerText = sentences.splice(0,1)
    if(round === 0) {
        document.querySelector("#nextButton").innerText = "Accept points and Start Next Round"
    }


   // console.log(sentences)
}

function main(){


    dex = initDecks()
    sentences = initSentences(dex)
   

    

   // let y = prompt("a")

    let ptDistribution = [1]

}


main()
