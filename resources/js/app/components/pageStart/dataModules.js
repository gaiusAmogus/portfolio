import { getSvg } from '../../functions/getSvg.js';
import { customScrollbar } from '../../functions/customScrollbar.js';
import { TextScramble, textType } from '../../functions/textScramble.js';
import { animFrom } from '../../functions/animTransform.js';
import { acronymEl } from '../../functions/acronymEl.js';


function dataModulesContent() {
    const content = `
        <section class="dataModules">
            <h2 class="title title--1 textShadow--white">${textType('Available data modules')}</h2>
            <div class="modules">
                <div class="dataModule dataModule--0 col-12 col-xl-4">
                    <div class="dataModule__inner corners">
                        <div class="dataModule__inner__bg">
                            <div class="dataModule__inner__bg__cut"></div>
                        </div>
                        <div class="dataModule__inner__leftbar"></div>
                        <div class="dataModule__inner__content">
                            ${getSvg('modulesIcon_1')}
                            <h3 class="title title--3">Project data</h3>
                        </div>
                    </div>
                </div>
                <div class="dataModule dataModule--1 col-12 col-xl-4">
                    <div class="dataModule__inner corners">
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

export function dataModulesRun() {
    const contentContainer = $('#content');
    contentContainer.empty();
    const content = $(dataModulesContent());
    content.appendTo(contentContainer);

    // Run the text scramble animation after appending to the DOM
    const titleElement = document.querySelector('.dataModules .title--1');
    if (titleElement) {
        const fx = new TextScramble(titleElement);
        fx.setText('Available data modules');
    }
    animFrom('.dataModule--0 .dataModule__inner', 'down');
    animFrom('.dataModule--1 .dataModule__inner', 'down');
    animFrom('.dataModule--2 .dataModule__inner', 'down');

    var gl1 = Object.create(glitch_exec);
    gl1.start(document.getElementById("glitchModule"));

    acronymEl('dataModule__acr', '#glitchModule', 18);    

    // Optional: Initialize custom scrollbars
    if (window.innerWidth < 1200){
        setTimeout(function() {
            customScrollbar();
        }, 100);
    }
}