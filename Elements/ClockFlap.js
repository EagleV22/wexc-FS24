class ClockFlap {
    constructor(parentElement, initialChar) {
        this.parentElement = parentElement;
        this.alphabet = '0123456789';
        this.createFlaps(initialChar);
    }

    createFlaps(initialChar) {
        console.log('Creating flaps for character:', initialChar);
        const flapContainer = document.createElement('div');
        flapContainer.className = 'split-flap';
        flapContainer.innerHTML = `
            <div class="flap shadow"><span class="letter">${initialChar}</span></div>
            <div class="flap top"><span class="letter">${initialChar}</span></div>
            <div class="flap bottom"><span class="letter">${initialChar}</span></div>
        `;
        console.log('Appending flapContainer to parentElement');
        this.parentElement.appendChild(flapContainer);

        this.topFlap = flapContainer.querySelector('.top');
        this.bottomFlap = flapContainer.querySelector('.bottom');
        this.shadowFlap = flapContainer.querySelector('.shadow');
    }

    flipToCharacter(targetChar) {
        const flipInterval = setInterval(() => {
            const currentChar = this.topFlap.querySelector('.letter').textContent.trim();
            if (currentChar === targetChar || (targetChar === ' ' && currentChar === '')) {
                clearInterval(flipInterval);
            } else {
                this.flipLetter();
            }
        }, 700);
    }

    flipLetter() {
        const currentChar = this.topFlap.querySelector('.letter').textContent.trim();
        const newChar = this.getNextCharBottom(currentChar);

        this.shadowFlap.querySelector('.letter').textContent = this.getNextCharBottom(newChar);

        this.topFlap.style.transform = 'rotateX(-90deg)';
        this.topFlap.style.zIndex = 2;
        this.shadowFlap.querySelector('.letter').textContent = newChar;

        setTimeout(() => {
            this.shadowFlap.querySelector('.letter').textContent = currentChar;

            this.topFlap.classList.add('notransition');
            this.topFlap.style.transform = 'rotateX(0deg)';
            this.topFlap.offsetHeight;
            this.topFlap.classList.remove('notransition');
            this.topFlap.querySelector('.letter').textContent = newChar;

            this.bottomFlap.classList.add('notransition');
            this.bottomFlap.style.transform = 'rotateX(90deg)';
            this.bottomFlap.offsetHeight;
            this.bottomFlap.classList.remove('notransition');
            this.bottomFlap.querySelector('.letter').textContent = newChar;
        }, 200);

        setTimeout(() => {
            this.bottomFlap.style.transform = 'rotateX(0deg)';
            this.topFlap.style.zIndex = 1;
        }, 400);

    }

    getNextCharBottom(currentChar) {
        const currentIndex = this.alphabet.indexOf(currentChar);
        return this.alphabet[(currentIndex + 1) % this.alphabet.length];
    }
}