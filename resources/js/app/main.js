import { headerFooter } from '../app/components/common/headerFooter.js';
import { loadingBar } from '../app/components/common/loadingBar.js';

// Uruchom funkcje po załadowaniu DOM
document.addEventListener('DOMContentLoaded', function() {
    loadingBar();
    headerFooter();
});
