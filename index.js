const $start = document.querySelector('#start')
const $game = document.querySelector('#game')
let $time = document.querySelector('#time') 
let $result = document.querySelector('#result') 
let score = 0
let isGameStarted = false
let $timeHeader = document.querySelector('#time-header')
let $resultHeader = document.querySelector('#result-header')
let $gameTime = document.querySelector('#game-time')


$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener('input', setGameTime)

function show($el) {
    $el.classList.remove('hide')
}

function hide($el) {
    $el.classList.add('hide')
}

function startGame(){
    score = 0
    setGameTime()
    $gameTime.setAttribute('disabled', 'true')
    isGameStarted = true
    hide($start)
    $game.style.backgroundColor = '#fff'

    const interval = setInterval(function(){
        let time = parseFloat($time.textContent) 
        console.log('inter', $time.textContent);

        if ( time <=0 ){
            clearInterval(interval)
            endGame()
        } else {
            $time.textContent = (time - 0.1).toFixed(1)
        }
    }, 100)

    renderBox()
}

function setGameScore() {
    $result.textContent = score.toString()
}

function setGameTime() {
    let time = + $gameTime.value
    $time.textContent = time.toFixed(1)
    show($timeHeader)
    hide($resultHeader)
}

function endGame() {
    isGameStarted = false
    setGameScore()
    $gameTime.removeAttribute('disabled')
    show($start)
    $game.style.backgroundColor = '#ccc'
    $game.innerHTML = ''
    hide($timeHeader)
    show($resultHeader)
}

function handleBoxClick(event) {
    if (!isGameStarted) {
        return
    }

    if ( event.target.dataset.box ) {
        score++
        renderBox()
    }
}

function renderBox() {
    $game.innerHTML = ''
    const box = document.createElement('div')
    const boxSize = getRandom(30, 100)
    const boxPosition = getRandom(0, 300)
    const randomColor = Math.floor(Math.random()*16777215).toString(16)

    box.style.height = box.style.width = boxSize + 'px'
    box.style.position = 'absolute'
    box.style.backgroundColor = '#' + randomColor
    box.style.top = Math.abs(boxPosition - boxSize) + 'px'
    box.style.left = Math.abs(boxPosition - boxSize) +  'px'
    box.style.cursor = 'pointer'
    box.setAttribute('data-box', 'true')

    $game.insertAdjacentElement('afterbegin', box)
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max-min) + min)
}