// Storage

const SAVED_PALETTES_KEY = 'SAVED_COLOR_PALETTES';

const getSavedColorPalettes = () => {
    const savedColorPalettes = window.localStorage.getItem(SAVED_PALETTES_KEY);
    if (!savedColorPalettes) {
        return [];
    }

    try {
        return JSON.parse(savedColorPalettes);
    } catch (e) {
        return [];
    }
};

/**
 *
 * @param {Array<string>} c1
 * @param {Array<string>} c2
 */
const areColorsIdentical = (c1, c2) =>
    c1.sort().join('-') === c2.sort().join('-');

const isColorPaletteAlreadySaved = (colors, savedColorPalettes) => {
    if (!colors) {
        return false;
    }

    return !!savedColorPalettes.find((cp) =>
        areColorsIdentical(cp.colors, colors)
    );
};

const saveColorPalette = (state, createNotification) => {
    const savedColorPalettes = getSavedColorPalettes();
    if (!isColorPaletteAlreadySaved(state.colors, savedColorPalettes)) {
        savedColorPalettes.push(state);
        window.localStorage.setItem(
            SAVED_PALETTES_KEY,
            JSON.stringify(savedColorPalettes)
        );
        createNotification('Color palette saved', 1500);
    }
};

export { getSavedColorPalettes, saveColorPalette, isColorPaletteAlreadySaved };
