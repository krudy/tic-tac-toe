const fieldsElements = document.querySelectorAll('.board__item');
const panel = document.querySelector('.panel');

const fields = ['', '', '', '', '', '', '', '', ''];

let activePlayer = 'X';
let gameActive = true;

const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2]
]

const displayWinMessage = () => {
    panel.innerText = `${activePlayer} wins!`;
}

const validateGame = (winningConditions,fields,activePlayer) => {

    for(let i = 0; i < winningConditions.length ;i++){
        const [posA, posB, posC] = winningConditions[i];
       if (fields[posA] === activePlayer && fields[posB] === activePlayer && fields[posC] === activePlayer) {
        gameActive = false;
       }
    }
}

fieldsElements.forEach(field => {
    field.addEventListener('click', (event) => {

        const {position} = event.target.dataset;
        
        if(gameActive && fields[position] === ''){
            fields[position] = activePlayer;
            event.target.classList.add(`board__item--filled-${activePlayer}`);
            validateGame(winningConditions,fields,activePlayer);
            activePlayer = activePlayer === 'X' ? 'O' : 'X';
        }

    })
})

