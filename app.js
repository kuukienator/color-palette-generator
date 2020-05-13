const workers = [];
const palettes = document.querySelector('.palettes');
const imageUploadInput = document.getElementById('imageUpload');
const randomImageButton = document.getElementById('randomImage');
const urlImageButton = document.getElementById('urlImage');
const urlImageCancelButton = document.getElementById('urlImageCancel');
const urlImageGoButton = document.getElementById('urlImageGo');
const urlImageForm = document.getElementById('urlImageForm');
const vibrantModeCheckbox = document.getElementById('vibrantMode');
const urlImageInput = document.getElementById('imageUrlInput');
const loadingAnimation = document.querySelector('.loadingAnimation');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const UNSPLASH_COLLECTIONS = [
    '17098',
];

const MAX_WIDTH = 1200;

const UNSPLASH_EXAMPLE_IMAGES = [
    'https://images.unsplash.com/photo-1563736204193-eae6c811441b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1468476396571-4d6f2a427ee7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1476044591369-74ee6ac6899c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1510488264500-32d00a540613?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1511585042631-f2aecc0390d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1523951541182-f85facd2f936?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1563335013-355bbd3dd3a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1557599572-c26016532d48?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1528029952370-e5f8eda89ee5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1534958105004-ba5f8694b247?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1500440993422-db2f2895d146?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1436076863939-06870fe779c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1498575207492-cfbed56146c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1497534446932-c925b458314e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1525183995014-bd94c0750cd5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1501426026826-31c667bdf23d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1491378630646-3440efa57c3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1445234196024-e129b999a317?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1494815654139-edc8163816f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1495448715410-80ec866d8375?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1471745518196-ed32997e769c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1477505982272-ead89926a577?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1503507026622-bd90164039ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1557684288-7d12c79129bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1557155787-028a432e5fd5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1561182254-1161ef9ac5f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1562516685-488706077e1c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1544383180-0849a549953a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1489203501925-afd02ae2d8d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1529304344766-6b537de190f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1486262322291-6f4dbcd69e10?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1488462237308-ecaa28b729d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
];

/**
 *
 * @param {string} imageUrl
 * @returns {string}
 */
const buildOptimalImageUrl = imageUrl => imageUrl.replace(/w=\d+/, `w=${Math.min(MAX_WIDTH, window.devicePixelRatio * window.innerWidth)}`);

/**
 *
 * @param {Number} min
 * @param {Number} max
 * @returns {Number}
 */
const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const createClusterFromHexColors = (hexColors) => hexColors.map(h => ({color: window.COLOR.hexToRgb(h)}));

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

const startWorker = (imageUrl, imageData, width, filterOptions) => {
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
                            k: 5,
                            filterOptions
                        });
                    }
                    break;
                case 'GENERATE_CLUSTERS':
                    const clusters = e.data.clusters;
                    loadingAnimation.classList.add('is-hidden');
                    palettes.classList.remove('is-hidden');
                    appendPalettes(clusters, palettes);
                    addToHistory(clusters.map(cl => window.COLOR.rgbToHex(cl.color).join('')), imageUrl);
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

const imageLoadCallback = (image, canvas, ctx) => {
    const width = image.naturalWidth;
    const height = image.naturalHeight;
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0);

    const isVibrantMode = vibrantModeCheckbox.checked;

    const imageData = ctx.getImageData(0, 0, width, height);
    const filterOptions = isVibrantMode ? {saturation: 0.25, lightness: 0.2} : {saturation: 0.15, lightness: 0.2};
    // startWorker(imageData, width, {saturation: 0.1, lightness: 0.15});
    startWorker(image.src, imageData, width, filterOptions);
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

const loadViewMode = (source, colors) => {
    palettes.innerHTML = '';
    workers.forEach(w => w.terminate());

    const image = new Image();
    image.crossOrigin = 'Anonymous';
    image.src = source;

    image.classList.add('backgroundImage');
    appendPalettes(createClusterFromHexColors(colors), palettes);

    const bi = document.querySelector('.backgroundImage');
    document.body.replaceChild(image, bi);
    loadingAnimation.classList.add('is-hidden');
    palettes.classList.remove('is-hidden');
}

const loadColorsMode = (colors) => {
    palettes.innerHTML = '';
    workers.forEach(w => w.terminate());
    const bi = document.querySelector('.backgroundImage');
    bi.classList.add('is-hidden');
    appendPalettes(createClusterFromHexColors(colors), palettes);
    loadingAnimation.classList.add('is-hidden');
    palettes.classList.remove('is-hidden');
}

const createUrlQueryString = (colors, imageUrl) => {
    const queries = [];
    if (colors) {
        queries.push(`colors=${colors.join('-')}`);
    }

    if(imageUrl) {
        queries.push(`imageUrl=${encodeURIComponent(imageUrl)}`);
    }

    return `?${queries.join('&')}`;
};

const addToHistory = (colors, imageUrl) => {
    const state = {};
    if (colors) {
        state.colors = colors;
    }

    if(imageUrl) {
        state.imageUrl = imageUrl;
    }
    window.history.pushState(state, '', createUrlQueryString(colors, imageUrl));
}

const updateHistory = (colors, imageUrl) => {
    const state = {};
    if (colors) {
        state.colors = colors;
    }

    if(imageUrl) {
        state.imageUrl = imageUrl;
    }
    window.history.replaceState(state, '', createUrlQueryString(colors, imageUrl));
}

const getUrlParameters = () => {
    const searchList = window.location.search.substr(1).split('&');
    return searchList.reduce((acc, cv) => {
        const splitEntry = cv.split('=');
        const e = {};
        e[splitEntry[0]] = splitEntry[1];
        return Object.assign({}, acc, e);
    }, {});
}

const initFromUrl = () => {
    const parameters = getUrlParameters();
    if(parameters.colors && parameters.imageUrl) {
        const colors = parameters.colors.split('-');
        const imageUrl = decodeURIComponent(parameters.imageUrl);
        loadViewMode(imageUrl, colors);
        updateHistory(colors, imageUrl);
    } else if (parameters.colors) {
        const colors = parameters.colors.split('-');
        loadColorsMode(colors);
        updateHistory(colors);
    }
}

randomImageButton.addEventListener('click', () =>
    // loadImage(`https://source.unsplash.com/collection/${getRandomIntInclusive(0, UNSPLASH_COLLECTIONS.length - 1)}?_t=${Date.now()}`)
    loadImage(buildOptimalImageUrl(UNSPLASH_EXAMPLE_IMAGES[getRandomIntInclusive(0, UNSPLASH_EXAMPLE_IMAGES.length - 1)]))
);

urlImageButton.addEventListener('click', () => {
    setTimeout(() => urlImageInput.focus(), 100);
    document.body.classList.toggle('showUrlInput');
});

urlImageCancelButton.addEventListener('click', () => {
    document.body.classList.toggle('showUrlInput');
    urlImageInput.value = '';
});

urlImageForm.addEventListener('submit', e => {
    e.preventDefault();
    e.stopPropagation();
    document.body.classList.toggle('showUrlInput');
    const url = urlImageInput.value.trim();
    if (url.length > 0) {
        loadImage(url);
    }
    urlImageInput.value = '';
});

imageUploadInput.addEventListener("change", (e) => {
    const fileList = e.target.files;
    if (fileList.length > 0) {
        const reader = new FileReader();
        reader.onload = e => loadImage(e.target.result);
        reader.readAsDataURL(fileList[0]);
    }
}, false);

window.onpopstate = (event) => {
    if (event.state && event.state.colors && event.state.imageUrl) {
        loadViewMode(event.state.imageUrl, event.state.colors);
    } else if (event.state.colors) {
        loadColorsMode(event.state.colors);
    }
};

initFromUrl();
