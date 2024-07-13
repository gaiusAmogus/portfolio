import { clearContent } from '../../functions/clearContent.js';
import { getSvg } from '../../functions/getSvg.js';
import { customScrollbar } from '../../functions/customScrollbar.js';
import { TextScramble, textType } from '../../functions/textScramble.js';
import { animFrom } from '../../functions/animTransform.js';
import { showBackButton, closeBackButton } from '../../functions/backButtons.js';

import { runProjectData } from '../../components/pageArchiveSingle/projectData.js';


async function archiveContentList() {
    // Zaciąganie danych z pliku JSON
    const response = await fetch(window.location.href+'/resources/js/app/archiveData/projects.json?v=' + new Date().getTime());
    const projectsData = await response.json();

    let projectsListItems = '';

    projectsData.projects.forEach((project, index) => {
        projectsListItems += `
            <div class="projectsList__inner__list__el ${index === 0 ? 'projectsList__inner__list__el--active' : ''}" data-id="${project.id}">
                ${getSvg('dataDisc')}
                <p>${project.name}</p>
            </div>
        `;
    });

    // Generowanie całej zawartości HTML
    const content = `
        <section class="archiveData">
            <h2 class="title title--1 textShadow--white">${textType('Project data of the object')}</h2>
            <div class="archiveScreen">
                <div class="archiveScreen__inner corners">
                    <div class="archiveScreen__inner__el archiveScreen__inner__el--0 projectsList col-12 col-xl-3 offset-xl-1">
                        <div class="projectsList__inner scrollbar">
                            <div class="projectsList__inner__list">
                                ${projectsListItems}
                            </div>
                        </div>
                    </div>
                    <div class="archiveScreen__inner__el archiveScreen__inner__el--1 archiveProjectContainer col-12 col-xl-7">
                        <!-- Place for additional content -->
                    </div>
                </div>
            </div>
        </section>
    `;

    return content;
}
async function archiveContentSelected() {
    const activeElement = document.querySelector('.projectsList__inner__list__el--active');
    const activeElementId = activeElement ? activeElement.getAttribute('data-id') : null;

    if (!activeElementId) {
        return 'No active element selected';
    }

    // Zaciąganie danych z pliku JSON
    const response = await fetch(window.location.href + '/resources/js/app/archiveData/projects.json?v=' + new Date().getTime());
    const projectsData = await response.json();

    // Znalezienie projektu o odpowiednim ID
    const project = projectsData.projects.find(proj => proj.id == activeElementId);

    if (!project) {
        return 'Project not found';
    }

    // Generowanie całej zawartości HTML
    const content = `
        <div class="archiveProject">
            <div class="archiveProject__inner">
                <div class="archiveProject__inner__img">
                    <img src="${project.thumb}" alt="${project.name}">
                </div>
                <div class="archiveProject__inner__content">
                    <div class="archiveProject__inner__content__title">
                        <h3 class="color--red">${project.title}</h3>
                    </div>
                    <div class="archiveProject__inner__content__desc">
                        <p class="color--red">${project.desc}</p>
                        <div class="archiveProject__inner__content__desc__btns">
                            <a class="btn btn--primary" href="${project.link}" target="_blank">Visit  website</a>
                            <div class="btn btn--primary" data-id="${project.id}">View data</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    return content;
}

function archiveContentBtns(){

    closeBackButton('.btnBack__projects');
    showBackButton('.btnBack__modules');

    const projectItems = document.querySelectorAll('.projectsList__inner__list__el');

    projectItems.forEach(item => {
        item.addEventListener('click', function() {
            const currentActive = document.querySelector('.projectsList__inner__list__el--active');
            if (currentActive) {
                currentActive.classList.remove('projectsList__inner__list__el--active');
            }
            this.classList.add('projectsList__inner__list__el--active');
            setTimeout(function() {
                const archiveProjectContainer = document.querySelector('.archiveProjectContainer');
                
                archiveContentSelected().then(project => {

                    // Sprawdzenie czy archiveProjectContainer został znaleziony
                    if (archiveProjectContainer) {
                        archiveProjectContainer.innerHTML = project;
                        animFrom('.archiveProject', 'down');


                    } else {
                        console.error('Element .archiveProjectContainer not found');
                    }
                }).then(() => {
                    customScrollbar('.archiveProject');
                });
            }, 100);
        });
    });

}

export async function runArchive() {
    clearContent();
    setTimeout(() => {
        const contentContainer = document.getElementById('content');

        archiveContentList().then(list => {
            contentContainer.innerHTML = list;

            var archiveTitleElement = document.querySelector('.archiveData .title--1');
            var archiveTitleHeight = archiveTitleElement.clientHeight + parseFloat(getComputedStyle(archiveTitleElement).marginBottom);
            var archiveScreenHeight = document.querySelector('.contentContainer').clientHeight - archiveTitleHeight - 5;
            document.querySelector('.archiveData .archiveScreen__inner').style.height = archiveScreenHeight + 'px';

            // Run the text scramble animation after appending to the DOM
            const titleElement = document.querySelector('.archiveData .title--1');
            if (titleElement) {
                const fx = new TextScramble(titleElement);
                fx.setText('Project data of the object');
            }
            animFrom('.archiveData .title--1', 'right');
            animFrom('.archiveScreen', 'down');

            // Optional: Initialize custom scrollbars
            setTimeout(function() {
                customScrollbar('.projectsList__inner');
            }, 100);
        }).then(() => {
            const archiveProjectContainer = document.querySelector('.archiveProjectContainer');

            archiveContentSelected().then(project => {
                // Sprawdzenie czy archiveProjectContainer został znaleziony
                if (archiveProjectContainer) {
                    archiveProjectContainer.innerHTML = project;
                    animFrom('.archiveProject', 'down');

                    // Optional: Initialize custom scrollbars
                    setTimeout(function() {
                        customScrollbar('.archiveProject');
                        archiveContentBtns();
                    }, 100);
                } else {
                    console.error('Element .archiveProjectContainer not found');
                }
            });
        });

    }, 350);
}
