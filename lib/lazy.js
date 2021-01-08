export default class Lazzzy {
    constructor(progressiveImageInput) {
        this.imageInput = progressiveImageInput;
    }

    progressiveImageLoading() {
        const imagePlaceholder = this.imageInput;
        const placholderSpacer = this.imageInput.querySelector('.spacer');

        // 1: load small image and show it
        if (!imagePlaceholder.classList.contains('image--loaded')) {
            this.loadImage('small').then((smallImage) => {
                imagePlaceholder.appendChild(smallImage);

                this.loadImage('large').then((placeholderImage) => {
                    imagePlaceholder.appendChild(placeholderImage);
                }).then(() => {
                    imagePlaceholder.removeChild(placholderSpacer);
                    imagePlaceholder.removeChild(imagePlaceholder.querySelector('.small-loaded'));
                    imagePlaceholder.classList.add('image--loaded');
                });
            });
        }
    }

    loadImage(typeImage) {
        const { dataset: { small: smallImg, large: largeImg, classes } } = this.imageInput;

        return new Promise((resolve, reject) => {
            const img = new Image();
            console.log('this.imageInput: ', this.imageInput)
            // image.classList.add(class)
            img.src = typeImage === 'small' ? smallImg : largeImg;

            img.onload = () => {
                img.classList.add(typeImage === 'small' ? 'small-loaded' : 'large-loaded');
                resolve(img);
            };

            img.onerror = () => {
                console.error('Image could not be loaded: ', img);
                reject(img);
            };
        });
    }
}

export function lazyloadImages() {
    const intersectionObserverOptions = {
        root: document.querySelector('body'),
        rootMargin: '0px',
        threshold: 0.5,
    };

    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.intersectionRatio > 0) {
                const lazyImage = new Lazzzy(entry.target);
                lazyImage.progressiveImageLoading();
                io.unobserve(entry.target);
            }
        });
    }, intersectionObserverOptions);

    [...document.querySelectorAll('[data-lazy="true"]')].forEach((progressiveImage) => {
        console.log('lazy: ', progressiveImage)
        io.observe(progressiveImage);
    });
}