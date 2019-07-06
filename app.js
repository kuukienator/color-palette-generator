const workers = [];
const palettes = document.querySelector('.palettes');
const imageUploadInput = document.getElementById('imageUpload');
const randomImageButton = document.getElementById('randomImage');
const loadingAnimation = document.querySelector('.loadingAnimation');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const appendPalettes = (clusters, palettes) => {
    const colors = document.createElement('div');
    colors.classList.add('palette');

    clusters.forEach(cluster => {
        const color = cluster.color;
        const hslColor = window.COLOR.rgbToHsl(color);
        const hexColor = window.COLOR.rgbToHex(color);

        const cd = document.createElement('div');
        cd.style.backgroundColor = window.COLOR.createRGBString(color);
        cd.style.color = window.COLOR.getTextColorFromLuminance(hslColor[2]);
        // cd.style.height = cluster.percentage + '%';

        cd.setAttribute('data-rgb', window.COLOR.createRGBString(color));
        cd.setAttribute('data-hex', window.COLOR.createHEXString(hexColor));
        cd.setAttribute('data-hsl', window.COLOR.createHSLString(hslColor));

        cd.innerText = window.COLOR.createHEXString(hexColor);
        colors.appendChild(cd);
    });

    palettes.appendChild(colors);
};

const imageLoadCallback = (image, canvas, ctx) => {
    const width = image.naturalWidth;
    const height = image.naturalHeight;
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0);

    const imageData = ctx.getImageData(0, 0, width, height);
    const worker = new Worker('worker.js');
    workers.push(worker);
    worker.addEventListener(
        'message',
        e => {
            switch (e.data.type) {
                case 'GENERATE_COLORS_ARRAY':
                    const pixels = e.data.pixels;
                    for (let i = 0; i < 1; i++) {
                        worker.postMessage({
                            type: 'GENERATE_CLUSTERS',
                            pixels,
                            k: 5
                        });
                    }
                    break;
                case 'GENERATE_CLUSTERS':
                    const clusters = e.data.clusters;
                    loadingAnimation.classList.add('is-hidden');
                    palettes.classList.remove('is-hidden');
                    appendPalettes(clusters, palettes);
                    break;
            }
        },
        false
    );

    worker.postMessage({
        type: 'GENERATE_COLORS_ARRAY',
        imageData,
        width
    });

};

const loadImage = source => {
    palettes.innerHTML = '';
    workers.forEach(w => w.terminate());

    const image = new Image();
    image.crossOrigin = 'Anonymous';
    image.src = source;

    image.onload = imageLoadCallback.bind(null, image, canvas, ctx);
    image.classList.add('backgroundImage');

    const bi = document.querySelector('.backgroundImage');
    document.body.replaceChild(image, bi);
    loadingAnimation.classList.remove('is-hidden');
    palettes.classList.add('is-hidden');
};

randomImageButton.addEventListener('click', () =>
    loadImage(`https://source.unsplash.com/featured/?nature,travel&_t=${Date.now()}`)
);

imageUploadInput.addEventListener("change", (e) => {
    const fileList = e.target.files;
    if (fileList.length > 0) {
        const reader = new FileReader();
        reader.onload = e => loadImage(e.target.result);
        reader.readAsDataURL(fileList[0]);
    }
}, false);