/**
 *
 * @param {Array<string>} colors
 * @param {string} imageUrl
 */
const createUrlQueryString = (colors, imageUrl) => {
    const queries = [];
    if (colors) {
        queries.push(`colors=${colors.join('-')}`);
    }

    if (imageUrl) {
        queries.push(`imageUrl=${encodeURIComponent(imageUrl)}`);
    }

    return `?${queries.join('&')}`;
};

/**
 *
 * @param {Array<string>} colors
 * @param {string} imageUrl
 */
const addToHistory = (colors, imageUrl) => {
    const state = {};
    if (colors) {
        state.colors = colors;
    }

    if (imageUrl) {
        state.imageUrl = imageUrl;
    }
    window.history.pushState(state, '', createUrlQueryString(colors, imageUrl));
};

/**
 *
 * @param {Array<string>} colors
 * @param {string} imageUrl
 */
const updateHistory = (colors, imageUrl) => {
    const state = {};
    if (colors) {
        state.colors = colors;
    }

    if (imageUrl) {
        state.imageUrl = imageUrl;
    }
    window.history.replaceState(
        state,
        '',
        createUrlQueryString(colors, imageUrl)
    );
};

const getUrlParameters = () => {
    const searchList = window.location.search.substr(1).split('&');
    return searchList.reduce((acc, cv) => {
        const splitEntry = cv.split('=');
        const e = {};
        e[splitEntry[0]] = splitEntry[1];
        return Object.assign({}, acc, e);
    }, {});
};

/**
 *
 * @param {function} loadViewMode
 * @param {function} loadColorsMode
 */
const initFromUrl = (loadViewMode, loadColorsMode) => {
    const parameters = getUrlParameters();
    if (parameters.colors && parameters.imageUrl) {
        const colors = parameters.colors.split('-');
        const imageUrl = decodeURIComponent(parameters.imageUrl);
        updateHistory(colors, imageUrl);
        loadViewMode(imageUrl, colors);
    } else if (parameters.colors) {
        const colors = parameters.colors.split('-');
        updateHistory(colors);
        loadColorsMode(colors);
    }
};

export { initFromUrl, addToHistory, updateHistory };
