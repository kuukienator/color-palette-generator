const OverlayManager = (overlaySelector) => {
    const closeOverlays = () => {
        overlays.forEach((o) => {
            document.body.classList.remove(o.activeClass);
        });
    };

    const overlayContainer = document.querySelector(overlaySelector);
    const overlays = [];
    overlayContainer.addEventListener('click', () => closeOverlays());

    /**
     *
     * @param {{ showSelector:string, hideSelector:string, activeClass:String }} overlay
     */
    const registerOverlay = (overlay) => {
        overlays.push(overlay);
        document
            .querySelector(overlay.showSelector)
            .addEventListener('click', () => {
                event.stopPropagation();
                document.body.classList.add(overlay.activeClass);
            });
        document
            .querySelector(overlay.hideSelector)
            .addEventListener('click', () => {
                event.stopPropagation();
                document.body.classList.remove(overlay.activeClass);
            });
    };

    return {
        registerOverlay: registerOverlay,
        closeOverlays: closeOverlays,
    };
};

export default OverlayManager;
