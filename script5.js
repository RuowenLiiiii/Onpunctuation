document.addEventListener('DOMContentLoaded', () => {
    const terminal = document.getElementById('terminal');
    const cursor = document.getElementById('cursor');
    const originalText = `One other little punctuation mark one can have feelings about and that is the apostrophe for possession. Well feel as you like about that, I can see and I do see that for many that for some the possessive case apostrophe has a gentle tender insinuation that makes it very difficult to definitely decide to do without it. One does do without it, I do, I mostly always do, but I cannot deny that from time to time I feel myself having regrets and from time to time I put it in to make the possessive case. I absolutely do not like it and leaving it out I feel no regret, there it is unnecessary and not ornamental but inside a word and its s well perhaps, perhaps it does appeal by its weakness to your weakness. At least at any rate from time to time I do find myself letting it alone if it has come in and sometimes it has come in. I cannot positively deny but that I do from time to time let it come in.
    I have had a long and complicated life with all these. Let us begin with these I use the least first and these are colons and semi-colons, one might add to these commas.
    When I first began writing, I felt that writing should go on, I still do feel that it should go on but when I first began writing I was completely possessed by the necessity that writing should go on and on and if writing should go on what had colons and commas to do with it, what had periods to do with it what had small letters and capitals to do with it to do with writing going on which was at that time the most profound need I had in connection with writing. What had colons and semi-colons to do with it what had commas to do with it what had periods to do with it.`;
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
    nextToPage.addEventListener('click', () => window.location.href = 'page6.html');
    }
});