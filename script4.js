document.addEventListener('DOMContentLoaded', () => {
    const terminal = document.getElementById('terminal');
    const cursor = document.getElementById('cursor');
    const originalText = `Beside I had always like the look of periods and I liked what they did. Stopping sometime did not really keep one from going on, it was nothing that interfered, it was only something that happened, and as it happened as a perfectly natural happening, I did not believe in periods and I used them. I really never stopped using them. Beside that periods might later come to have a life of their own to commence breaking up things in arbitrary ways, that has happened lately with me in a poem I have written called Winning His Way, later I will read you a little of it. By the time I had written this poem about three years ago periods had come to have for me completely a life of their own. They could begin to act as they thought best and one might interrupt one’s writing with them that is not really interrupt one’s writing with them but one could come to stop arbitrarily stop at times in one’s writing and so they could be used and you could use them Periods could come to exist in this way and they could come in this way to have a life of their own. They did not serve you in any servile way as commas and colons and semi-colons do. Yes you do feel what I mean. Periods have a life of their own a necessity of their own a feeling of their own a time of their own. And that feeling that life that necessity that time can express itself in an infinite variety that is the reason that I have always remained true to periods so much so that as I say recently I have felt that one could need them more than one had ever needed them. `;
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

    // 初始化事件监听器
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
    nextToPage.addEventListener('click', () => window.location.href = 'page5.html');
    }
});