import { customScrollbar } from '../functions/customScrollbar.js';

export function runAfterContentLoad(){
    setTimeout(function() {
        customScrollbar();
    },100);
}
