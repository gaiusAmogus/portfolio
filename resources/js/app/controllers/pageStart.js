import { headerFooter } from '../components/headerFooter.js';
import { loadingBar } from '../components/loadingBar.js';

export function pageStart(){
    loadingBar();
    headerFooter();
}