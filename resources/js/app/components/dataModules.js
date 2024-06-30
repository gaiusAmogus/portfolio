import { getSvg } from '../functions/getSvg.js';
import { customScrollbar } from '../functions/customScrollbar.js';


function dataModulesContent(){
    const content = 
    `
    <section class="s_dataModules">
        <h2 class="title title--1 textShadow--white">Available data modules</h2>
        <div class="dataModules">
            <div class="dataModule col-12 col-lg-4">
                <div class="dataModule__inner corners">
                    <div class="dataModule__inner__cut"></div>
                    <div class="dataModule__inner__leftbar"></div>
                    <div class="dataModule__inner__content">
                        ${getSvg('modulesIcon_1')}
                        <h3 class="title title--3">Project data</h3>
                    </div>
                </div>
            </div>
            <div class="dataModule col-12 col-lg-4">
                <div class="dataModule__inner corners">
                    <div class="dataModule__inner__cut"></div>
                    <div class="dataModule__inner__leftbar"></div>
                    <div class="dataModule__inner__content">
                        ${getSvg('modulesIcon_1')}
                        <h3 class="title title--3">Project data</h3>
                    </div>
                </div>
            </div>
            <div class="dataModule col-12 col-lg-4">
                <div class="dataModule__inner corners">
                    <div class="dataModule__inner__cut"></div>
                    <div class="dataModule__inner__leftbar"></div>
                    <div class="dataModule__inner__content">
                        ${getSvg('modulesIcon_1')}
                        <h3 class="title title--3">Project data</h3>
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
    $(dataModulesContent()).appendTo(contentContainer);
    // setTimeout(function() {
    //     customScrollbar();
    // },100);
}
export function dataModulesBreak(){
    
}