document.addEventListener('DOMContentLoaded', () => {
    const terminal = document.getElementById('terminal');
    let commandCount = 0;
    const commands = [
        { text: 'Stein@Gertrude ~ % ?Question Mark', link: 'page2.html' },
        { text: 'Stein@Gertrude ~ % !Exclamation Marks/"Quotation Marks"', link: 'page3.html' },
        { text: 'Stein@Gertrude ~ % .Period', link: 'page4.html' },
        { text: 'Stein@Gertrude ~ % :Colons/‘Apostrophe', link: 'page5.html' },
        { text: 'Stein@Gertrude ~ % ,Commas', link: 'page6.html' },
    ];


    const cursor = document.createElement('span');
    cursor.classList.add('cursor');
    terminal.appendChild(cursor);


    terminal.addEventListener('click', () => {
        if (window.matchMedia("(max-width: 768px)").matches) {
            executeCommand();
        }
    });


    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !window.matchMedia("(max-width: 768px)").matches) {
            executeCommand();
            e.preventDefault();
        }
    });

    function executeCommand() {
        if (commandCount < commands.length) {
            const command = commands[commandCount++];
            const newLine = document.createElement('div');
            newLine.textContent = command.text;
            newLine.className = 'hover-effect';
            newLine.onclick = function () { window.location.href = command.link; };
            terminal.appendChild(newLine);
            terminal.appendChild(cursor);
        }
    }

    // 拖拽
    const container = document.querySelector('.container');
    let active = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    const dragStart = (e) => {
        if (e.target.closest('.top')) {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
            active = true;
        }
    };

    const dragEnd = () => {
        initialX = currentX;
        initialY = currentY;
        active = false;
    };

    const drag = (e) => {
        if (active) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
            xOffset = currentX;
            yOffset = currentY;
            setTranslate(currentX, currentY, container);
        }
    };

    const setTranslate = (xPos, yPos, el) => {
        el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    };

    document.addEventListener('mousedown', dragStart, false);
    document.addEventListener('mouseup', dragEnd, false);
    document.addEventListener('mousemove', drag, false);
});



// function createPunctuation() {
//     const symbols = ['?', ',', '.', '!', ':', ';', '"', "'"];
//     const punctuation = document.createElement('div');
//     punctuation.classList.add('punctuation');
//     punctuation.textContent = symbols[Math.floor(Math.random() * symbols.length)];
//     punctuation.style.left = Math.random() * window.innerWidth + 'px';
//     punctuation.style.top = '-50px';
//     punctuation.style.animationDuration = Math.random() * 3 + 2 + 's'; 
//     document.body.appendChild(punctuation);

//     setTimeout(() => {
//         punctuation.remove();
//     }, 5000);
// }

// setInterval(createPunctuation, 100);



