class Game {
    fields;
    activePlayer;
    gameActive;

    winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 4, 2]
    ]

    
    constructor() { 
        this.board = new Board(this.handleItemClick,this.handleResetButtonClick);
        this.setDefaults();
    }

    validateGame = () => {

        let gameWon = false;

        for (let i = 0; i < this.winningConditions.length; i++) {
            const [posA, posB, posC] = this.winningConditions[i];
    
            if (this.fields[posA] === this.activePlayer && this.fields[posB] === this.activePlayer && this.fields[posC] === this.activePlayer) {
                gameWon = true;
                break
            }
        }
    
        if (gameWon) {
            this.gameActive = false;
            this.board.displayWinMessage(this.activePlayer);
        } else if (this.isBoardFull()) {
            this.gameActive = false;
            this.board.displayTieMessage();
        }
    
    }
    
   isBoardFull = () => {
        return this.fields.find(field => field === '') === undefined;
    }
    
    
    handleResetButtonClick = () => {
        this.setDefaults();
    }
    
    handleItemClick = (event) => {
        console.log('test2');
        const { position } = event.target.dataset;
    
        if (this.gameActive && this.fields[position] === '') {
            this.fields[position] = this.activePlayer;
            event.target.classList.add(`board__item--filled-${this.activePlayer}`);
            this.validateGame();
            this.activePlayer = this.activePlayer === 'X' ? 'O' : 'X';
        }
    
    }

    setDefaults = () => {

        this.fields = ['', '', '', '', '', '', '', '', ''];
        this.activePlayer = 'X';
        this.gameActive = true;
    }
}

class Board {
    fieldsElements = document.querySelectorAll('.board__item');
    panel = document.querySelector('.panel');
    btnReset = document.querySelector('.reset-button');

    constructor(onItemClick, onButtonClick) {
        this.onButtonClick = onButtonClick;
        this.btnReset.addEventListener('click', this.handleResetButtonClick);

        this.fieldsElements.forEach(field => {
            field.addEventListener('click', onItemClick)
        })
    }

    handleResetButtonClick = () => {
        this.clearPanelMessage();
        this.resetBoardClasses();
        this.onButtonClick();
    }

    resetBoardClasses = () => {

        this.fieldsElements.forEach(field => {
            field.classList.remove('board__item--filled-X', 'board__item--filled-O');
        })
    };

    displayWinMessage = (activePlayer) => {
        this.panel.innerText = `${activePlayer} wins!`;
    };

    displayTieMessage = () => {
        this.panel.innerText = 'no winner emerged.';
    };

    clearPanelMessage = () => {
        this.panel.innerText = '';
    };
}

const game = new Game();