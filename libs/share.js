import { createNotification } from './notifications.js';

const downloadJsonLink = document.querySelector('.downloadJson');
const downloadCssLink = document.querySelector('.downloadCss');
const downloadImageLink = document.querySelector('.downloadImage');
const copyLinkButton = document.querySelector('.copyButton');

const updateJsonDownload = (name, data) => {
    const file = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json',
    });
    downloadJsonLink.href = URL.createObjectURL(file);
    downloadJsonLink.download = `${name}.json`;
};

const updateCssDownload = (name, data) => {
    const file = new Blob([data], {
        type: 'text/css',
    });
    downloadCssLink.href = URL.createObjectURL(file);
    downloadCssLink.download = `${name}.css`;
};

const updateImageDownload = (name, data) => {
    downloadImageLink.href = data;
    downloadImageLink.download = `${name}.png`;
};

const updateCopyLink = (href) => {
    copyLinkButton.dataset.link = href;
};
/**
 *
 * @param {Array<{rgb,hsl,hex,rgbString,hexString,hslString,textColor}>} clusters
 */
const formatJson = (clusters) => {
    return {
        hex: clusters.map((c) => c.hexString),
        hsl: clusters.map((c) => c.hslString),
        rgb: clusters.map((c) => c.rgbString),
    };
};

/**
 *
 * @param {Array<{rgb,hsl,hex,rgbString,hexString,hslString,textColor}>} clusters
 */
const formatCss = (clusters) => {
    return `:root {
    /* Hex */
    ${clusters
        .map((c, i) => `--color-hex-${i + 1}:${c.hexString};`)
        .join('\n\t')}
    
    /* RGB */
    ${clusters
        .map((c, i) => `--color-rgb-${i + 1}:${c.rgbString};`)
        .join('\n\t')}
    
    /* HSL */
    ${clusters
        .map((c, i) => `--color-hsl-${i + 1}:${c.hslString};`)
        .join('\n\t')}
}`;
};

/**
 *
 * @param {Array<{rgb,hsl,hex,rgbString,hexString,hslString,textColor}>} clusters
 */
const formatImage = (clusters) => {
    const w = 400;
    const h = 600;
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;

    const context = canvas.getContext('2d');

    const rowHeight = h / clusters.length;

    clusters.forEach((c, i) => {
        context.fillStyle = c.hexString;
        context.fillRect(0, i * rowHeight, w, rowHeight);
        context.fillStyle = c.textColor;
        context.textAlign = 'center';
        context.font = '35px sans-serif';
        context.fillText(
            c.hexString.toUpperCase(),
            w / 2,
            i * rowHeight + rowHeight / 2
        );
    });

    return canvas.toDataURL('image/png');
};

const copyTextToClipboard = (text) => {
    if (!navigator.clipboard) {
        createNotification('¯_(ツ)_/¯ No fallback copy yet');
        return Promise.resolve();
    } else {
        return navigator.clipboard.writeText(text);
    }
};

const initSharing = (closeHandler) => {
    [
        downloadJsonLink,
        downloadCssLink,
        downloadImageLink,
        copyLinkButton,
    ].forEach((e) => e.addEventListener('click', closeHandler));

    copyLinkButton.addEventListener('click', () => {
        const href = copyLinkButton.dataset.link;
        copyTextToClipboard(href)
            .then(() => createNotification('Copied url to clipboard'))
            .catch(() => createNotification('Failed to copy url'));
    });
};

const updateShareOverlay = (href, { clusters, name }) => {
    updateJsonDownload(name, formatJson(clusters));
    updateCssDownload(name, formatCss(clusters));
    updateImageDownload(name, formatImage(clusters));
    updateCopyLink(href);
};

export { updateShareOverlay, initSharing };
