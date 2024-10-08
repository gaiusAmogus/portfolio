import { clearContent } from '../functions/clearContent.js';
import { getSvg } from '../functions/getSvg.js';
import { customScrollbar } from '../functions/customScrollbar.js';
import { TextScramble, textType } from '../functions/textScramble.js';
import { animFrom } from '../functions/animTransform.js';
import { showBackButton, closeBackButton } from '../functions/backButtons.js';

function aboutContent() {

    const skills = [
        { title: 'Javascript', lvl: 3 },
        { title: 'HTML/CSS/SASS', lvl: 5 },
        { title: 'React', lvl: 1 },
        { title: 'UI', lvl: 1 },
        { title: 'PHP', lvl: 3 },
        { title: 'WooCommerce', lvl: 3 },
        { title: 'WordPress', lvl: 3 }
    ];
    
    let allSkills = '';
    skills.forEach((skill, index) => {
        allSkills += getSkill(skill.title, skill.lvl, index);
    });

    const descriptions = [
        { label: 'Object:', value: 'Dawid Jedynak' },
        { label: 'Age:', value: 'no data' },
        { label: 'Location:', value: 'Somehere in poland' },
        { label: 'Expierence:', value: '5 years' },
    ];

    let listEl = '';
    descriptions.forEach((desc, index) => {
        listEl += `
            <div class="text text--1 aboutData__desc__list__el aboutData__desc__list__el--${index}">
                ${desc.label} <p class="aboutData__desc__list__el__val" data-text="${desc.value}">${textType(desc.value)}</p>
            </div>
        `;
    });
    

    const content = `
        <section class="aboutData" style="opacity: 0">
            <div class="row">
                <div class="col-12 col-lg-4">
                    <div class="aboutData__prof">
                        <img src="${window.location.href}/assets/img/prof.jpg" alt="profilPicture">
                    </div>
                </div>
                <div class="col-12 col-lg-5">
                    <div class="aboutData__desc">
                        <div class="aboutData__desc__list">${listEl}</div>
                        <div class="aboutData__desc__desc">
                            <p class="text text--2">
                                Frontend developer with years of experience.
                                Expert in making templates for Wordpress, and WooCoomerce. 
                                Eager and quick to learn new technologies and techniques. 
                                A busy man with many passions. 
                                Hobbies include playing guitar, fencing, video game development and horseback riding.
                                </br>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-lg-3 d-none d-lg-block">
                    <div class="aboutData__human">
                        <div class="aboutData__human__inner">${getSvg('human')}</div>
                    </div>
                </div>
                <div class="col-12 aboutData__brainCol">
                    <div class="aboutData__brain">
                        <div class="aboutData__brain__analyse corners">
                            <p>ANALYSIS IN PROGRESS...</p>
                        </div>
                        <div class="aboutData__brain__inner">${getSvg('brain')}</div>
                        ${allSkills}
                    </div>
                </div>
                <div class="col-12">
                    <div class="aboutData__cv">
                        <div class="aboutData__cv__part">
                            <h3 class="aboutData__cv__part__title">Experience</h3>
                            <div class="aboutData__cv__part__content">
                                <div class="aboutData__cv__part__content__el">
                                    <p class="text text--1">
                                        [08.2022 - 08.2024]<br>
                                        Frontend developer at DotLineCode
                                    </p> 
                                    <p class="text text--2"> 
                                        Coding templates and creating plugins for WordPress and stores based on WooCommerce.
                                        Using ACF, REST API, design and implementation systems dedicated to the client. 
                                        Creating animations using three.js and GSAP, servicing, operation and optimization of websites.
                                    </p>
                                </div>
                                <div class="aboutData__cv__part__content__el">
                                    <p class="text text--1">
                                        [02.2021 - 07.2022]<br>
                                        Frontend developer at Funktional
                                    </p> 
                                    <p class="text text--2"> 
                                        Coding templates for WordPress using ACF.
                                        Creation of stores based on WooCommerce. 
                                        Website servicing, operation and optimization.
                                    </p>
                                </div>
                                <div class="aboutData__cv__part__content__el">
                                    <p class="text text--1">
                                        [09.2020 - 01.2021]<br>
                                        Junior Frontend developer at Millenium Studio
                                    </p> 
                                    <p class="text text--2"> 
                                        Modification of existing WordPress templates for the client using ACF.
                                        Simple stores based on WooCommerce and PrestaShop.
                                        Servicing, operation and website optimization.
                                    </p>
                                </div>
                                <div class="aboutData__cv__part__content__el">
                                    <p class="text text--1">
                                        [09.2019 – 07.2020]<br>
                                        Junior Frontend developer at CODESTICK
                                    </p> 
                                    <p class="text text--2"> 
                                        Coding simple landing pages.
                                        Simple online stores based on WooCommerce.
                                        Website maintenance.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="aboutData__cv__part">
                            <h3 class="aboutData__cv__part__title">Education</h3>
                            <div class="aboutData__cv__part__content">
                                <div class="aboutData__cv__part__content__el">
                                    <p class="text text--1">
                                        [Computer Science Engineer]<br>
                                    </p> 
                                    <p class="text text--2">College of Business - National Louis University located in Nowy Sącz [02/2023 – Present]</p>
                                </div>
                            </div>
                        </div>

                        <div class="aboutData__cv__part">
                            <h3 class="aboutData__cv__part__title">Courses and qualifications</h3>
                            <div class="aboutData__cv__part__content">
                                <div class="aboutData__cv__part__content__el">
                                    <p class="text text--1">98-364:MTA Database Fundamentals</p> 
                                    <p class="text text--1">98-367:MTA Security Fundamentals</p> 
                                    <p class="text text--1">98-361:MTA Software Development Fundamentals</p> 
                                    <p class="text text--1">98-383:MTA Introduction to Programming using HTML and CSS</p> 
                                    <p class="text text--1">Qualification E.12. Assembly and operation of personal computers and peripheral devices</p> 
                                    <p class="text text--1">Qualification E.13. Designing local computer networks and network administration</p> 
                                </div>
                            </div>
                        </div>

                        <div class="aboutData__cv__part">
                            <h3 class="aboutData__cv__part__title">Passions and interests</h3>
                            <div class="aboutData__cv__part__content">
                                <div class="aboutData__cv__part__content__el">
                                    <p class="text text--1">Historical European Martial Arts</p> 
                                    <p class="text text--1">Horse Riding</p> 
                                    <p class="text text--1">Singing and playing guitar</p> 
                                    <p class="text text--1">Video games</p> 
                                    <p class="text text--1">History</p> 
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </section>
    `;
    return content;
}

function aboutBtns(){
    showBackButton('.btnBack__modules');
    closeBackButton('.btnBack__projects');
}

export function runAbout(){
    clearContent();
    setTimeout(async () => {
        try {
            const contentContainer = document.querySelector('#content');
            contentContainer.innerHTML = aboutContent();

            setTimeout(() => {
                if(window.innerWidth > 1199){
                    var aboutScreenHeight = document.querySelector('.contentContainer').clientHeight - 5;
                    document.querySelector('.aboutData').style.height = aboutScreenHeight + 'px';
                    customScrollbar('.aboutData');
                }
                aboutBtns();
                animFrom('.aboutData', 'down');

                const selectors = [
                    '.aboutData__desc__list__el--0 .aboutData__desc__list__el__val',
                    '.aboutData__desc__list__el--1 .aboutData__desc__list__el__val',
                    '.aboutData__desc__list__el--2 .aboutData__desc__list__el__val',
                    '.aboutData__desc__list__el--3 .aboutData__desc__list__el__val'
                ];
                
                for (let i = 0; i < selectors.length; i++) {
                    const selector = selectors[i];
                    const delay = i * 500; // Oblicz opóźnienie na podstawie indeksu
                
                    setTimeout(() => {
                        const element = document.querySelector(selector);
                        if (element) {
                            const fx = new TextScramble(element);
                            fx.setText(element.getAttribute('data-text'));
                        }
                    }, delay);
                }
                
                scanBrain();

            }, 100);
        } catch (error) {
            console.error('Error running aboutData:', error);
        }
    }, 350);
} 

function getSkill(title, lvl, index) {
    const levels = {
        1: 'JUNIOR',
        2: 'JUNIOR/MID',
        3: 'MID',
        4: 'MID/SENIOR',
        5: 'SENIOR'
    };
    const pointers = {
        0: `<svg xmlns="http://www.w3.org/2000/svg" width="189" height="33" viewBox="0 0 189 33" fill="none">
                <path d="M188 32L140.5 0.999997L2.83364e-07 0.999994" stroke="#F7E018" stroke-width="2"/>
            </svg>`,
        1: `<svg xmlns="http://www.w3.org/2000/svg" width="189" height="81" viewBox="0 0 189 81" fill="none">
                <path d="M187.5 1L59.5 80L0.499999 80" stroke="#F16529" stroke-width="2"/>
            </svg>`,
        2: `<svg xmlns="http://www.w3.org/2000/svg" width="247" height="45" viewBox="0 0 247 45" fill="none">
                <path d="M245.5 1.5L186 44L2.41587e-06 44" stroke="#61DAFB" stroke-width="2"/>
            </svg>`,
        3: `<svg xmlns="http://www.w3.org/2000/svg" width="151" height="35" viewBox="0 0 151 35" fill="none">
                <path d="M150.5 1.5L49.5006 33.5L0.390292 33.5" stroke="#13ED0F" stroke-width="2"/>
            </svg>`,
        4: `<svg xmlns="http://www.w3.org/2000/svg" width="177" height="71" viewBox="0 0 177 71" fill="none">
                <path d="M176 69.5L49.1106 1.54899L0.000290606 1.54898" stroke="#4F5B93" stroke-width="2"/>
            </svg>`,
        5: `<svg xmlns="http://www.w3.org/2000/svg" width="75" height="91" viewBox="0 0 75 91" fill="none">
                <path d="M73.4996 0.499927L47.4995 89.5L2.29268e-06 89.5" stroke="#9D6193" stroke-width="2"/>
            </svg>`,
        6: `<svg xmlns="http://www.w3.org/2000/svg" width="79" height="79" viewBox="0 0 79 79" fill="none">
                <path d="M77.5001 78L32.1104 6.54907L0.499999 0.999999" stroke="#32373C" stroke-width="2"/>
            </svg>`,
    };

    const levelText = levels[lvl];
    const pointer = pointers[index];
    
    return `
        <div class="aboutData__brain__skillBar aboutData__brain__skillBar--${index}">
            <div class="aboutData__brain__skillBar__inner">
                <div class="aboutData__brain__skillBar__inner__bg">${getSvg('skillBar')}</div>
                <div class="aboutData__brain__skillBar__inner__title">${title}</div>`+
                // <div class="aboutData__brain__skillBar__inner__lines aboutData__brain__skillBar__inner__lines--${lvl}">${getSvg('lines')}</div>
                `<div class="aboutData__brain__skillBar__inner__lvl">LEVEL: ${levelText}</div>
            </div>
            <div class="aboutData__brain__skillBar__pointer">${pointer}</div>
        </div>
    `;
}
function scanBrain(){
    const checkStatus = document.querySelector('.contentContainer').dataset.about;
    const brain = document.querySelector('.aboutData__brain');
    const analyse = document.querySelector('.aboutData__brain__analyse');
    if( checkStatus == 0){

        document.querySelector('.contentContainer').dataset.about = 1;

        setTimeout(() => {
            var gl = Object.create(glitch_exec);
            gl.GLITCH_RENDER_COUNT = 2;
            gl.start(document.querySelector('.aboutData'));
        }, 1500);
        setTimeout(() => {
            analyse.children[0].textContent = 'SUCCESS';
            analyse.classList.add('aboutData__brain__analyse--anim');

        }, 4000);
        setTimeout(() => {
            analyse.remove();
            brain.classList.add('aboutData__brain--active');
        }, 5000);
    }
    else{
        analyse.remove();
        brain.classList.add('aboutData__brain--active');
    }
}