import OverlayScrollbars from '/assets/vendor/OverlayScrollbars/OverlayScrollbars.min.js';

export function customScrollbar(el) {
    var element = document.querySelectorAll(el);
    OverlayScrollbars(element, {
        className: "os-theme-dark",
        resize: "none",
        sizeAutoCapable: true,
        paddingAbsolute: true,
        scrollbars: {
            clickScrolling: true
        }
    });
}