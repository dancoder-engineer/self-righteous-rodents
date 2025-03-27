import { cards } from './data.js'
let dex = {}





function shuffle(arr){
    let ret = []
    while(arr.length > 0){
        let spot = Math.floor(Math.random() * arr.length)
        ret.push(arr[spot])
        arr.splice(spot,1)
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

function main(){


    dex = initDecks()
    

    while(dex.prepositions.length > 1){ 
        console.log(makeSentence())
    }

    let y = prompt("a")

    let ptDistribution = [1]

}


main()
