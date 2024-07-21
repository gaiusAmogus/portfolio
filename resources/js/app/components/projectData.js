import { clearContent } from '../functions/clearContent.js';
import { getSvg } from '../functions/getSvg.js';
import { customScrollbar, scrollTop } from '../functions/customScrollbar.js';
import { TextScramble, textType } from '../functions/textScramble.js';
import { animFrom } from '../functions/animTransform.js';
import { showBackButton, closeBackButton } from '../functions/backButtons.js';
import { randomGlitch } from '../functions/randomGlitch.js';


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
        <section class="projectData row" style="opacity: 0">
            <div class="col-12 projectData__title">
                <h2 class="title title--1" data-text="${project.name}">${textType(project.name)}</h2>
                ${project.link ? `<a class="btn btn--primary" href="${project.link}" target="_blank">Visit website</a>` : ''}
            </div>
            <div class="col-12 col-lg-5 projectData__contentCol">
                <div class="projectData__content">
                    <div class="projectData__content__inner">
                        <p class="text text--1">${project.desc}</p>
                    </div>
                </div> 
            </div>
            <div class="col-12 col-lg-7 projectData__galleryCol">
                <div class="projectData__gallery corners">
                    <div class="projectData__gallery__inner">
                        ${project.images.map(image => `<img class="projectData__gallery__inner__img" src="${window.location.href}/${image}" alt="Image">`).join('')}
                    </div>
                </div>
            </div>
        </section>
    `;

    return content;

}

function projectDataBtns(){
    closeBackButton('.btnBack__modules');
    showBackButton('.btnBack__projects');
}

export async function runProjectData(dataId) {
    clearContent();
    setTimeout(async () => {
        try {
            const contentContainer = document.querySelector('#content');
            const content = await projectDataContent(dataId);
            contentContainer.innerHTML = content;

            if (window.innerWidth > 991) {
                var projectTitleElement = document.querySelector('.projectData .projectData__title');
                var projectTitleHeight = projectTitleElement.clientHeight + parseFloat(getComputedStyle(projectTitleElement).marginBottom);
                var projectScreenHeight = document.querySelector('.contentContainer').clientHeight - projectTitleHeight - 5;
                document.querySelector('.projectData .projectData__content').style.height = projectScreenHeight + 'px';
                document.querySelector('.projectData .projectData__gallery').style.height = projectScreenHeight + 'px';
            }
            // Opcjonalnie: Inicjalizacja niestandardowych pasków przewijania
            setTimeout(() => {
                if (window.innerWidth > 991) {
                    customScrollbar('.projectData__content');
                }
                customScrollbar('.projectData__gallery');
                projectDataBtns();

                // Run the text scramble animation after appending to the DOM
                const titleElement = document.querySelector('.projectData .title--1');
                const fx = new TextScramble(titleElement);
                fx.setText(titleElement.getAttribute('data-text'));        
                animFrom('.projectData .title--1', 'right');
                animFrom('.projectData', 'down');

            }, 100);
        } catch (error) {
            console.error('Error running project data:', error);
        }
    }, 350);
}

