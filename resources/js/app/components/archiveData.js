import { clearContent } from '../functions/clearContent.js';
import { getSvg } from '../functions/getSvg.js';
import { customScrollbar, scrollTop } from '../functions/customScrollbar.js';
import { TextScramble, textType } from '../functions/textScramble.js';
import { animFrom } from '../functions/animTransform.js';
import { showBackButton, closeBackButton } from '../functions/backButtons.js';
import { randomGlitch } from '../functions/randomGlitch.js';

import { runProjectData } from '../components/projectData.js';


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
            <h2 class="title title--1 textShadow--white" data-text="Projects data" style="opacity: 0">${textType('Projects data')}</h2>
            <div class="archiveScreen" style="opacity: 0">
                <div class="archiveScreen__inner corners">
                    <div class="archiveScreen__inner__el archiveScreen__inner__el--0 projectsList col-12 col-lg-4 col-xxl-3 offset-xxl-1">
                        <div class="projectsList__inner scrollbar">
                            <div class="projectsList__inner__list">
                                ${projectsListItems}
                            </div>
                        </div>
                    </div>
                    <div class="archiveScreen__inner__el archiveScreen__inner__el--1 archiveProjectContainer col-12 col-lg-8">
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
        <div class="archiveProject" style="opacity: 0">
            <div class="archiveProject__inner">
                <div class="archiveProject__inner__img">
                    <img src="${window.location.href}/${project.thumb}" alt="${project.name}">
                </div>
                <div class="archiveProject__inner__content">
                    <div class="archiveProject__inner__content__title">
                        <h3 class="color--red">${project.title}</h3>
                    </div>
                    <div class="archiveProject__inner__content__desc">
                        <p class="color--red">${project.excerpt}</p>
                        <div class="archiveProject__inner__content__desc__btns">
                            <div class="btn btn--primary runProjectData" data-id="${project.id}">View data</div>
                            ${project.link ? `<a class="btn btn--primary" href="${project.link}" target="_blank">Visit website</a>` : ''}
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

            randomGlitch(15, 2, '.archiveData');
            
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
                        if(window.innerWidth > 991){
                            customScrollbar('.archiveProject');
                        }
                        animFrom('.archiveProject', 'down');
                        
                        if(window.innerWidth < 992){
                            scrollTop();
                        }

                        document.querySelector('.runProjectData').addEventListener('click', function() {
                            const dataId = this.getAttribute('data-id');
                            runProjectData(dataId);
                        });

                    } else {
                        console.error('Element .archiveProjectContainer not found');
                    }

                })
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

            var titleElement = document.querySelector('.archiveData .title--1');
            if(window.innerWidth > 991){
                var archiveTitleHeight = titleElement.clientHeight + parseFloat(getComputedStyle(titleElement).marginBottom);
                var archiveScreenHeight = document.querySelector('.contentContainer').clientHeight - archiveTitleHeight - 5;
                document.querySelector('.archiveData .archiveScreen__inner').style.height = archiveScreenHeight + 'px';
            }

            // Optional: Initialize custom scrollbars
            setTimeout(function() {
                customScrollbar('.projectsList__inner');

                // Run the text scramble animation after appending to the DOM
                const fx = new TextScramble(titleElement);
                fx.setText(titleElement.getAttribute('data-text'));        

                animFrom('.archiveData .title--1', 'right');
                animFrom('.archiveScreen', 'down');
    
            }, 100);
        }).then(() => {
            const archiveProjectContainer = document.querySelector('.archiveProjectContainer');

            archiveContentSelected().then(project => {
                // Sprawdzenie czy archiveProjectContainer został znaleziony
                if (archiveProjectContainer) {
                    archiveProjectContainer.innerHTML = project;

                    // Optional: Initialize custom scrollbars
                    setTimeout(function() {
                        if(window.innerWidth > 991){
                            customScrollbar('.archiveProject');
                        }
                        archiveContentBtns();
                        document.querySelector('.runProjectData').addEventListener('click', function() {
                            const dataId = this.getAttribute('data-id');
                            runProjectData(dataId);
                        });
                        animFrom('.archiveProject', 'down');
                    }, 100);
                } else {
                    console.error('Element .archiveProjectContainer not found');
                }
            });
        });

    }, 350);
}
