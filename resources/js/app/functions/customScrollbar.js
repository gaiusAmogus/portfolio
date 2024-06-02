import OverlayScrollbars from '/assets/vendor/OverlayScrollbars/OverlayScrollbars.min.js';

export function customScrollbar() {
    document.querySelectorAll('.scrollbar').forEach(element => {
        OverlayScrollbars(element, {
            className: "os-theme-dark",
            resize: "none",
            sizeAutoCapable: true,
            paddingAbsolute: true,
            scrollbars: {
                clickScrolling: true
            }
        });
    });
}