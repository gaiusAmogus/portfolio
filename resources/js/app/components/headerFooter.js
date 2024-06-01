import { getSvg } from '../functions/getSvg.js';

export function headerFooter(){
    var app = $('#app');
    
    var header = 
    `
        <header class="header">
            <div class="header__row">
                <div class="header__row__el header__row__el--1">
                    <p id="userSystem">User System: <span>windows</span></p>
                    <p id="userBrowser">Browser: <span>Google chrome</span></p>
                    <p id="userIP">IP Address: <span>162.182.1.0</span></p>
                </div>
                <div class="header__row__el header__row__el--2">
                    <p id="userTime">user time: <span>05.12.2024 19:05</span></p>
                    <p id="userLocation">localistion: <span>Kraków, Europe</span></p>
                    <p id="userBat">user battery status: <span>53%</span></p>
                </div>
            </div>
        </header>
    `;

    var footer = 
    `
        <footer class="footer">
            <div class="footer__row">
                <div class="footer__row__el footer__row__el--1">
                    <p>SYSTEM CREATED BY DAWID JEDYNAK</p>
                    <p>AS A PORTFOLIO</p>
                    <p>CHECK github.com/gaiusAmogus</p>
                </div>
                <div class="footer__row__el footer__row__el--2">
                    <p>If you want to offer me cooperation write to piratecodehq@gmail.com</p>
                    <a href="/">${getSvg('linkedin')}</a>
                    <a href="/">${getSvg('github')}</a>
                </div>
            </div>
        </footer>
    `;
    
    $(header).appendTo(app);
    $(footer).appendTo(app);
}