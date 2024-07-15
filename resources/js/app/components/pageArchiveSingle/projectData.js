import { clearContent } from '../../functions/clearContent.js';
import { getSvg } from '../../functions/getSvg.js';
import { customScrollbar, scrollTop } from '../../functions/customScrollbar.js';
import { TextScramble, textType } from '../../functions/textScramble.js';
import { animFrom } from '../../functions/animTransform.js';
import { showBackButton, closeBackButton } from '../../functions/backButtons.js';
import { randomGlitch } from '../../functions/randomGlitch.js';


async function projectDataContent(dataId) {
    // Zaciąganie danych z pliku JSON
    const response = await fetch(window.location.href + '/resources/js/app/archiveData/projects.json?v=' + new Date().getTime());
    const projectsData = await response.json();

    // Znajdź projekt o podanym id
    const project = projectsData.projects.find(proj => proj.id == dataId);
    if (!project) {
        throw new Error(`Project with id ${dataId} not found.`);
    }

    // Generowanie całej zawartości HTML
    const content = `
        <section class="projectData row">
            <div class="col-12 projectData__title">
                <h2 class="title title--1" data-text="${project.name}">${textType(project.name)}</h2>
                ${project.link ? `<a class="btn btn--primary" href="${project.link}" target="_blank">Visit website</a>` : ''}
            </div>
            <div class="col-12 col-lg-5 projectData__content">
                <div class="projectData__content__inner">
                    <p>${project.desc}</p>
                </div>
            </div>
            <div class="col-12 col-lg-7 projectData__gallery">
                <div class="projectData__gallery__inner">
                    ${project.images.map(image => `<img class="projectData__gallery__inner__img" src="${image}" alt="Image">`).join('')}
                </div>
            </div>
        </section>
    `;

    return content;

}

export async function runProjectData(dataId) {
    clearContent();
    setTimeout(async () => {
        try {
            const contentContainer = document.querySelector('#content');
            const content = await projectDataContent(dataId);
            contentContainer.innerHTML = content;

            // Run the text scramble animation after appending to the DOM
            const titleElement = document.querySelector('.projectData .title--1');
            const fx = new TextScramble(titleElement);
            fx.setText(titleElement.getAttribute('data-text'));        
            animFrom('.projectData .title--1', 'right');

            // Opcjonalnie: Inicjalizacja niestandardowych pasków przewijania
            setTimeout(() => {
                if (window.innerWidth < 1200) {
                    customScrollbar('.contentContainer');
                }
                projectDataBtns();
            }, 100);
        } catch (error) {
            console.error('Error running project data:', error);
        }
    }, 350);
}



function projectDataBtns(){

}