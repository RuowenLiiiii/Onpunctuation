document.addEventListener('DOMContentLoaded', () => {
    const terminal = document.getElementById('terminal');
    const cursor = document.getElementById('cursor');
    const originalText = `Then there is the exclamation mark. In the first place practically there is no one who ever wants to exclaim and if they exclaim they really do not need an exclamation mark and besides again an exclamation mark does not in any way harmonize with any writing or printing and so what is the use of it. If you do not exclaim all the time and if you do exclaim the exclamation is there without an exclamation mark. I never could bring myself to use an exclamation mark, I always found it positively revolting.
    And now about quotation marks. Quotation marks have a certain use when you make a long quotation but long quotations are unnecessary if you are not writing a scientific treatise and if you are writing a scientific treatise there is no use in making long quotations. Therefore, in writing, there is no use for quotation marks. However, since people have used them, I have used them but I do not like their use. They are ugly, they spoil the line of the writing or printing and they are distracting. If you are using a direct quotation you can say so in the text and if you are not using a direct quotation you need not say so in the text and as I say long quotations are unnecessary and quotation marks are ugly and spoiling and unnecessary.`;
    let sentences = originalText.split(/(?<=[.,?!])\s/).map(sentence => sentence.trim());

    let currentSentence = 0;


    function updatePromptText() {
        const loginDiv = document.getElementById('login');
        if (window.innerWidth < 768) {
            loginDiv.innerHTML = loginDiv.innerHTML.replace('>Press the Enter key', '>Tap the screen');
        } else {
            loginDiv.innerHTML = loginDiv.innerHTML.replace('>Tap the screen', '>Press the Enter key');
        }
    }


    updatePromptText();


    window.addEventListener('resize', function() {
        updatePromptText();
        initEventListeners(); 
    });

    let clickEventListener = null;
    let keydownEventListener = null;

    function initEventListeners() {

        if (clickEventListener) {
            document.removeEventListener('click', clickEventListener);
            clickEventListener = null;
        }
        if (keydownEventListener) {
            document.removeEventListener('keydown', keydownEventListener);
            keydownEventListener = null;
        }

        if (window.innerWidth < 768) {
            // 点击
            clickEventListener = displayNextSentence;
            document.addEventListener('click', clickEventListener);
        } else {
            // 键盘
            keydownEventListener = (e) => {
                if (e.key === 'Enter') {
                    displayNextSentence();
                }
            };
            document.addEventListener('keydown', keydownEventListener);
        }
    }

    initEventListeners();




    function displayNextSentence() {
        if (currentSentence < sentences.length) {
            const line = document.createElement('div');
            line.textContent = sentences[currentSentence++];
            line.style.color = 'lime';
            line.style.marginBottom = "10px";
            terminal.appendChild(line);
    
            const cursorPlaceholder = document.createElement('div');
            terminal.appendChild(cursorPlaceholder);
            cursorPlaceholder.appendChild(cursor);
        } else if (currentSentence === sentences.length) {
            displayQuestion();
        }
    }

    function displayQuestion() {
        const question = document.createElement('div');
        question.innerHTML = '> Whether to remove punctuation?<br>> <span class="hover-effect">Yes</span>';
        question.className = 'hover-effect';
        question.style.color = 'lime';
        terminal.appendChild(question);
        terminal.appendChild(cursor);
    
        question.addEventListener('click', () => {
            terminal.innerHTML = '';
            displayNewTextWithPrefixAndMessages(originalText.replace(/[.,?!]/g, ''));
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            displayNextSentence();
        }
    });

    function displayNewTextWithPrefixAndMessages(text) {
        const specialMessage = "(1080934.0182811 b1k update request: I/0 error, dev sda, sector 126293208 op OXO:(READ) flags 0x0 phys_seg1 prio class o ] [1080934.021689] sd0:0:0:0: [sda] tag#0 access beyond end of device [1080934.021799] sd 0:0:0:0: [sda] tag#0 access beyond end of device ] [1080934.032885] sd 0:0:0:0: [da] tag#0 access beyond end of device ] [1080934.033011] sd 0:0:0:0: [sda] tag#0 access beyond end of device";
        const words = text.split(/\s+/);
        let wordCount = 0;
        let lineCount = 0;
    
        function displayLine() {
            if (wordCount < words.length) {
                const lineElement = document.createElement('div');
                let lineText = `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[${new Date().toISOString().slice(11, 19)}] ` + words.slice(wordCount, wordCount + 15).join(' ');
                lineElement.innerHTML = lineText;
                lineElement.style.color = 'lime';
                terminal.appendChild(lineElement);
                
                wordCount += 15;
                lineCount++;
    
                if (lineCount % 3 === 0) {
                    for (let i = 0; i < 3; i++) {
                        const messageElement = document.createElement('div');
                        messageElement.textContent = specialMessage;
                        messageElement.classList.add('special-message');
                        terminal.appendChild(messageElement);
                    }
                }
    
                terminal.appendChild(cursor);
    
                if (wordCount < words.length) {
                    setTimeout(displayLine, 300);
                } else {
                    addBackToHomePageOption();
                }
            }
        }
    
        displayLine();
    }

    function addBackToHomePageOption() {
        const backToHome = document.createElement('div');
        backToHome.innerHTML = '> <span class="hover-effect">Return</span>';
        backToHome.style.color = 'lime';
        backToHome.style.cursor = 'pointer';
        terminal.appendChild(backToHome);
        backToHome.addEventListener('click', () => window.location.href = 'index.html');

        const nextToPage = document.createElement('div');
    nextToPage.innerHTML = '> <span class="hover-effect">Next</span>'; 
    nextToPage.style.color = 'lime';
    nextToPage.style.cursor = 'pointer';
    terminal.appendChild(nextToPage);
    nextToPage.addEventListener('click', () => window.location.href = 'page4.html');
    }
});