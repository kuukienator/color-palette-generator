importScripts('libs/clustering.js');
let pixels = null;

self.addEventListener('message', e => {
    switch (e.data.type) {
        case 'GENERATE_COLORS_ARRAY':
            pixels = calculateColorsArray(e.data.imageData.data, e.data.width);
            this.self.postMessage({
                type: 'GENERATE_COLORS_ARRAY',
                // pixels
            });
            break;
        case 'GENERATE_CLUSTERS':
            const clusters = calculateKMeansClustering(e.data.pixels || pixels, e.data.k);
            this.self.postMessage({
                type: 'GENERATE_CLUSTERS',
                clusters
            });
            break;
    }
}, false);