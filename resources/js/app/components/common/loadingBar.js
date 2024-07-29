import { getSvg } from '../../functions/getSvg.js';
import { acronymEl } from '../../functions/acronymEl.js';
import { dataModulesRun } from '../../components/dataModules.js';

export function loadingBar() {
    const app = document.getElementById('app');

    // Create site lines HTML
    const siteLines = `
        <div class="siteLine siteLine--1">${getSvg('siteLine_1')}</div>
        <div class="siteLine siteLine--2">${getSvg('siteLine_2')}</div>
    `;

    // Create loading bar HTML
    const bar = `
        <div class="loadingBar">
            <div class="loadingBar__box corners">
                <p>Loading...</p>
            </div>
            <div class="loadingBar__percent"></div>
            <div class="loadingBar__load"></div>
            <div class="loadingBar__line loadingBar__line--1">
                <div class="loadingBar__line__el"></div>
            </div>
            <div class="loadingBar__line loadingBar__line--2">
                <div class="loadingBar__line__el"></div>
            </div>
            <div class="loadingBar__cascates"></div>
            <div class="loadingBar__warning">WARNING!! Do not turn off</div>
        </div>
    `;

    // Append bar and siteLines to app
    app.insertAdjacentHTML('beforeend', bar);
    app.insertAdjacentHTML('beforeend', siteLines);

    acronymEl('siteLineAcr__1', '.siteLine--1', 40);
    acronymEl('siteLineAcr__2', '.siteLine--2', 5);

    let startTime = null;
    const duration = 2500; // Total time in ms

    // Define keyframe steps
    const keyframes = [
        { percent: 0, time: 0 },
        { percent: 21, time: 50 },
        { percent: 22, time: 600 },
        { percent: 37, time: 700 },
        { percent: 38, time: 1200 },
        { percent: 60, time: 1750 },
        { percent: 76, time: 1800 },
        { percent: 77, time: 2400 },
        { percent: 100, time: 2500 },
    ];

    function updateLoadingBar(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;

        // Find the current keyframe interval
        let frameIndex = keyframes.findIndex((frame) => frame.time > elapsed);
        if (frameIndex === -1) frameIndex = keyframes.length - 1;

        const startFrame = keyframes[frameIndex - 1] || keyframes[0];
        const endFrame = keyframes[frameIndex];

        // Calculate the progress between the keyframes
        const frameProgress = (elapsed - startFrame.time) / (endFrame.time - startFrame.time);
        const percent = startFrame.percent + frameProgress * (endFrame.percent - startFrame.percent);

        // Update percent text and load width
        document.querySelector('.loadingBar__percent').textContent = Math.floor(percent) + '%';
        document.querySelector('.loadingBar__load').style.width = 'calc(' + percent + '% - 60px)';

        if (elapsed < duration) {
            requestAnimationFrame(updateLoadingBar);
        } else {
            // Final state
            document.querySelector('.loadingBar__percent').textContent = '100%';
            document.querySelector('.loadingBar__load').style.width = 'calc(100% - 60px)';
            document.querySelector('.loadingBar__box p').textContent = 'ENTER';
            document.querySelector('.loadingBar').classList.add('loadingBar--anim');
            document.querySelector('.header').classList.add('header--show');
            document.querySelector('.footer').classList.add('footer--show');

            setTimeout(() => {
                const pageTitle = document.createElement('h1');
                pageTitle.id = 'pageTitle';
                pageTitle.textContent = 'void netRun()';
                app.appendChild(pageTitle);
            }, 1000);

            setTimeout(() => {
                dataModulesRun();
            }, 3000);
        }
    }

    requestAnimationFrame(updateLoadingBar);
}
