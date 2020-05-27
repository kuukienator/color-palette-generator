const COLOR = (() => {
    const getTextColorFromLuminance = (luminance) =>
        luminance > 0.5 ? '#000' : '#fff';
    const intToPaddedHex = (n) => {
        const hex = n.toString(16);
        return hex.length == 1 ? '0' + hex : hex;
    };

    const createHEXString = (color) => `#${color.join('')}`;
    const createRGBString = (color) => `rgb(${color.join(', ')})`;
    const createHSLString = ([hue, saturation, luminance]) =>
        `hsl(${Math.round(hue)}, ${Math.round(saturation * 100)}%, ${Math.round(
            luminance * 100
        )}%)`;

    const hexToRgb = (color) =>
        [color.substr(0, 2), color.substr(2, 2), color.substr(4, 2)].map((e) =>
            parseInt(e, 16)
        );

    const rgbToHex = (color) => color.map((c) => intToPaddedHex(c));

    const calculateHue = (colorRatios, indexOfMax, max, min) => {
        let hue = 0;

        if (indexOfMax === 0) {
            hue = (colorRatios[1] - colorRatios[2]) / (max - min);
        } else if (indexOfMax === 1) {
            hue = 2.0 + (colorRatios[2] - colorRatios[0]) / (max - min);
        } else if (indexOfMax === 2) {
            hue = 4.0 + (colorRatios[0] - colorRatios[1]) / (max - min);
        }
        hue *= 60;

        hue = hue < 1 ? hue + 360 : hue;

        return hue;
    };

    /**
     *
     * @param color
     * @returns {[number, number, number]}
     */
    const rgbToHsl = (color) => {
        const colorRatios = color.map((c) => c / 255);
        const min = Math.min(...colorRatios);
        const max = Math.max(...colorRatios);

        const luminance = (min + max) / 2;
        const saturation =
            min === max
                ? 0
                : luminance < 0.5
                ? (max - min) / (max + min)
                : (max - min) / (2.0 - max - min);

        const hue = calculateHue(
            colorRatios,
            colorRatios.indexOf(max),
            max,
            min
        );

        return [hue, saturation, luminance];
    };

    const COLOR = {
        getTextColorFromLuminance,
        intToPaddedHex,
        createHEXString,
        createRGBString,
        createHSLString,
        rgbToHex,
        calculateHue,
        rgbToHsl,
        hexToRgb,
    };

    if (typeof window !== 'undefined') {
        window.COLOR = COLOR;
    }

    return COLOR;
})();
