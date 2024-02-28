document.addEventListener('DOMContentLoaded', () => {
    const terminal = document.getElementById('terminal');
    const cursor = document.getElementById('cursor');
    const originalText = `There are some punctuations that are interesting and there are some punctuations that are not. Let us begin with the punctuations that are not. Of these the one but the first and the most the completely most uninteresting is the question mark. The question mark is alright when it is all alone when it is used as a brand on cattle or when it could be used in decoration but connected with writing it is completely entirely com- pletely uninteresting. It is evident that is you ask a question you ask a question but anybody who can read at all knows when a question is a question as it is written in writing. Therefore I ask you therefore wherefore should one use the question mark. Beside it does not in its form go with ordinary printing and so it pleases neither the eye nor the ear and it is therefore like a noun, just an unnecessary name of some- thing. A question is a question, anybody can know that a question is a question and so why add to it the question mark when it is already there when the question is already there in the writing. Therefore I never could bring myself to use a question mark, I always found it pos- itively revolting, and now very few do use it. About question marks well really naturally I never could bring myself to use them, they are a little abrupt for me, but I do like to ask questions and so I ask them but I do not use question marks, it does not make any difference, the question is there, why indicate it.`;
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
    nextToPage.addEventListener('click', () => window.location.href = 'page3.html');
    }
});