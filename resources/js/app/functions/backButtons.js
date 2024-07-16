import { dataModulesRun } from '../components/dataModules.js';
import { runArchive } from '../components/archiveData.js';

export function showBackButton(el) {
    const element = document.querySelector(el);
    const className = el.replace('.', '') + '--active';
    if (!element.classList.contains(className)) {
        element.classList.add(className);
    }
}

export function closeBackButton(el) {
    const element = document.querySelector(el);
    const className = el.replace('.', '') + '--active';
    if (element.classList.contains(className)) {
        element.classList.remove(className);
    }
}


export function handleBackButtons() {
    document.querySelector('.btnBack__modules').addEventListener('click', () => {
        dataModulesRun();
    });

    document.querySelector('.btnBack__projects').addEventListener('click', () => {
        runArchive();
    });
}
