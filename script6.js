document.addEventListener('DOMContentLoaded', () => {
    const terminal = document.getElementById('terminal');
    const cursor = document.getElementById('cursor');
    const originalText = `What had colons and commas to do with it, what had periods to do with it what had small letters and capitals to do with it to do with writing going on which was at that time the most profound need I had in connection with writing. What had colons and semi-colons to do with it what had commas to do with it what had periods to do with it.
    They did not serve you in any servile way as commas and colons and semi-colons do.
    I have refused them so often and left them out so much and did without them so continually that I have come finally to be indifferent to them. I do not now care whether you put them in or not but for a long time I felt very definitely about them and would have nothing to do with them.
    As I say commas are servile and they have no life of their own, and their use is not a use, it is a way of replacing one’s own interest and I do decidedly like to like my own interest my own interest in what I am doing. A comma by helping you along holding your coat for you and putting on your shoes keeps you from living your life as actively as you should lead it and to me for many years and I still do feel that way about it only now I do not pay as much attention to them, the use of them was positively degrading.`;
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

    }
});