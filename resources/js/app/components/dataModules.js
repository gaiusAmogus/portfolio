import { clearContent } from '../functions/clearContent.js';
import { getSvg } from '../functions/getSvg.js';
import { customScrollbar } from '../functions/customScrollbar.js';
import { TextScramble, textType } from '../functions/textScramble.js';
import { animFrom } from '../functions/animTransform.js';
import { acronymEl } from '../functions/acronymEl.js';
import { closeBackButton } from '../functions/backButtons.js';

import { runArchive } from '../components/archiveData.js';
import { runAbout } from './about.js';



function dataModulesContent() {
    const content = `
        <section class="dataModules">
            <h2 class="title title--1 textShadow--white" data-text="Available data modules">${textType('Available data modules')}</h2>
            <div class="modules">
                <div class="dataModule dataModule--0 col-12 col-xl-4">
                    <div class="dataModule__inner corners corners--hover">
                        <div class="dataModule__inner__bg">
                            <div class="dataModule__inner__bg__cut"></div>
                        </div>
                        <div class="dataModule__inner__leftbar"></div>
                        <div class="dataModule__inner__content">
                            ${getSvg('modulesIcon_1')}
                            <h3 class="title title--3">Projects data</h3>
                        </div>
                    </div>
                </div>
                <div class="dataModule dataModule--1 col-12 col-xl-4">
                    <div class="dataModule__inner corners corners--hover">
                        <div class="dataModule__inner__bg">
                            <div class="dataModule__inner__bg__cut"></div>
                        </div>
                        <div class="dataModule__inner__leftbar"></div>
                        <div class="dataModule__inner__content">
                            ${getSvg('modulesIcon_2')}
                            <h3 class="title title--3">Scan object</h3>
                        </div>
                    </div>
                </div>
                <div class="dataModule dataModule--2 col-12 col-xl-4" id="glitchModule">
                    <div class="dataModule__inner corners">
                        <div class="dataModule__inner__bg">
                            <div class="dataModule__inner__bg__cut"></div>
                        </div>
                        <div class="dataModule__inner__leftbar"></div>
                        <div class="dataModule__inner__content">
                            ${getSvg('modulesIcon_3')}
                            <h3 class="title title--3 color--red">ERROR!!!<br>No data found</h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
    return content;
}

function dataModulesBtns(){

    closeBackButton('.btnBack__projects');
    closeBackButton('.btnBack__modules');

    var module_0 = document.querySelector('.dataModule--0');
    var module_1 = document.querySelector('.dataModule--1');

    module_0.addEventListener('click', function() {
        runArchive();
    });

    module_1.addEventListener('click', function() {
        runAbout();
    });

}

export function dataModulesRun() {
    clearContent();
    setTimeout(() => {
        const contentContainer = document.querySelector('#content');
        contentContainer.innerHTML = dataModulesContent();
        
        // Run the text scramble animation after appending to the DOM
        const titleElement = document.querySelector('.dataModules .title--1');
        const fx = new TextScramble(titleElement);
        fx.setText(titleElement.getAttribute('data-text'));        

        animFrom('.dataModules .title--1', 'right');
        animFrom('.dataModule--0 .dataModule__inner', 'down');
        animFrom('.dataModule--1 .dataModule__inner', 'down');
        animFrom('.dataModule--2 .dataModule__inner', 'down');
    
        startGlitchModule();
    
        acronymEl('dataModule__acr', '#glitchModule', 18);    
    
        // Optional: Initialize custom scrollbars
        setTimeout(function() {
            if (window.innerWidth < 1200){
                customScrollbar('.contentContainer');
            }
            dataModulesBtns();
        }, 100);

    }, 350);
}

var gl1;

function startGlitchModule() {
    gl1 = Object.create(glitch_exec);
    gl1.start(document.getElementById("glitchModule"));
}

export function stopGlitchModule() {
    if (gl1) {
        gl1.stop();
    }
}
