document.addEventListener("DOMContentLoaded", () => {
    let boxes = document.querySelectorAll('.box');
    let resetBtn = document.querySelector('#reset-btn'); 
    let newGameBtn = document.querySelector('#new-Btn'); // Ensure ID matches HTML
    let msgContainer = document.querySelector('.msg-container');
    let msg = document.querySelector('#msg');

    let turn0 = true;
    let count = 0;

    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    const resetGame = () => {
        turn0 = true;
        count = 0;
        enableBoxes();
        msgContainer.classList.add('hide');
    };

    boxes.forEach((box, index) => {
        box.addEventListener('click', () => {
            if (turn0) { 
                box.innerText = 'O';
                turn0 = false;
            } else {
                box.innerText = 'X';
                turn0 = true;
            }
            box.disabled = true;
            count++;

            let isWinner = checkWinner();
            if (count === 9 && !isWinner) {
                gameDraw();
            }
        });
    });

    const gameDraw = () => {
        msg.innerText = 'Game Draw';
        msgContainer.classList.remove('hide');
        disableBoxes();
    };

    const disableBoxes = () => {
        for (let box of boxes) {
            box.disabled = true;
        }
    };

    const enableBoxes = () => {
        for (let box of boxes) {
            box.disabled = false;
            box.innerText = ''; 
        }
    };

    const showWinner = (winner) => {
        msg.innerText = `Congratulations, Winner is ${winner}`;
        msgContainer.classList.remove('hide');
        disableBoxes();
    };

    const checkWinner = () => {
        for (let pattern of winPatterns) {
            let pos1val = boxes[pattern[0]].innerText;
            let pos2val = boxes[pattern[1]].innerText;
            let pos3val = boxes[pattern[2]].innerText;

            if (pos1val !== '' && pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val);
                return true;
            } 
        }
        return false;
    };

    newGameBtn.addEventListener("click", resetGame);
    resetBtn.addEventListener("click", resetGame);
});
