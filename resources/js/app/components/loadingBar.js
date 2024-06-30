import { getSvg } from '../functions/getSvg.js';
import { dataModulesRun } from '../components/dataModules.js';

export function loadingBar(){
    var siteLines = 
    `
        <div class="siteLine siteLine--1">${getSvg('siteLine_1')}</div>
        <div class="siteLine siteLine--2">${getSvg('siteLine_2')}</div>
    `;
    var bar = 
    `
        <div class="loadingBar">
            <div class="loadingBar__box corners">
                <p>Loading...</p>
            </div>
            <div class="loadingBar__percent"></div>
            <div class="loadingBar__load"></div>
            <div class="loadingBar__line loadingBar__line--1">${getSvg('loadingBar_1')}</div>
            <div class="loadingBar__line loadingBar__line--2">${getSvg('loadingBar_2')}</div>
        </div>
    `
    $(bar).appendTo(app);
    $(siteLines).appendTo(app);

    var percent = 0;
    var width = 0;
    var interval = setInterval(function() {
        percent++;
        width += 1;
        $('.loadingBar__percent').text(percent + '%');
        $('.loadingBar__load').css('width', 'calc(' + width + '% - 60px)');
        if (percent >= 100) {
            clearInterval(interval);
            $('.loadingBar__box p').text('ENTER');
            $('.loadingBar').addClass('loadingBar--anim');
            $('.header').addClass('header--show');
            $('.footer').addClass('footer--show');
            setTimeout(() => {
                dataModulesRun();
            }, 3000);
        }
    }, 15);
}
