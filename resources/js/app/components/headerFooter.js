import { getSvg } from '../functions/getSvg.js';
import { runAfterContentLoad } from '../functions/runAfterContentLoad.js';

export function headerFooter() {
    var app = $('#app');
    
    var header = 
    `
        <header class="header">
            <div class="header__row">
                <div class="header__row__el header__row__el--1">
                    <p id="userSystem">User System: <span></span></p>
                    <p id="userBrowser">Browser: <span></span></p>
                    <p id="userIP">IP Address: <span></span></p>
                </div>
                <div class="header__row__el header__row__el--2">
                    <p id="userTime">User time: <span></span></p>
                    <p id="userLocation">Location: <span></span></p>
                    <p id="userBat">User battery status: <span></span></p>
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
                    <p>CHECK <a href="/" class="color--red link">github.com/gaiusAmogus</a></p>
                </div>
                <div class="footer__row__el footer__row__el--2">
                    <p>If you want to offer me cooperation write to <a href="mailto:piratecodehq@gmail.com" class="color--red link">piratecodehq@gmail.com</a></p>
                    <a href="/">${getSvg('linkedin')}</a>
                    <a href="/">${getSvg('github')}</a>
                </div>
            </div>
        </footer>
    `;
    $(header).appendTo(app);
    $(footer).appendTo(app);

    var headerFooterSpace = $('.header').innerHeight() + $('.footer').innerHeight() + 120;
    var test = 
    `
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    `;
    var contentContainer = 
    `
        <section class="contentContainer" style="max-height: calc(100vh - ${headerFooterSpace}px)">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div id="content" class="scrollbar">${test}</div>
                    </div>
                </div>
            </div>
        </section>
    `;
    $(contentContainer).appendTo(app);

    updateUserInfo();
    runAfterContentLoad();
}

async function updateUserInfo() {
    // Informacje o systemie i przeglądarce
    let browserInfo = getBrowserInfo();
    $('#userSystem span').text(browserInfo.system + ' ' + browserInfo.systemVersion || 'NO DATA');
    $('#userBrowser span').text((browserInfo.browser + ' ' + browserInfo.version) || 'NO DATA');

    // Adres IP i lokalizacja
    let ipAndLocation = await getIPAndLocation();
    if (ipAndLocation) {
        $('#userIP span').text(ipAndLocation.ip || 'NO DATA');
        $('#userLocation span').text((ipAndLocation.city || 'NO DATA') + ', ' + (ipAndLocation.country || 'NO DATA'));
    } else {
        $('#userIP span').text('NO DATA');
        $('#userLocation span').text('NO DATA');
    }

    // Aktualizacja czasu użytkownika
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000); // Aktualizacja co sekundę

    // Poziom naładowania baterii
    updateBatteryStatus();
    setInterval(updateBatteryStatus, 60000); // Aktualizacja co minutę
}

function getBrowserInfo() {
    let userAgent = navigator.userAgent;
    let browserName = "Unknown Browser";
    let fullVersion = "Unknown Version";
    let platform = "Unknown Platform";
    let systemVersion = "Unknown Version";
    let versionOffset;

    if ((versionOffset = userAgent.indexOf("Firefox")) !== -1) {
        browserName = "Mozilla Firefox";
        fullVersion = userAgent.substring(versionOffset + 8);
    } else if ((versionOffset = userAgent.indexOf("SamsungBrowser")) !== -1) {
        browserName = "Samsung Internet";
        fullVersion = userAgent.substring(versionOffset + 15);
    } else if ((versionOffset = userAgent.indexOf("Opera")) !== -1) {
        browserName = "Opera";
        fullVersion = userAgent.substring(versionOffset + 6);
    } else if ((versionOffset = userAgent.indexOf("OPR")) !== -1) {
        browserName = "Opera";
        fullVersion = userAgent.substring(versionOffset + 4);
    } else if ((versionOffset = userAgent.indexOf("Trident")) !== -1) {
        browserName = "Microsoft Internet Explorer";
        fullVersion = userAgent.substring(userAgent.indexOf("rv:") + 3);
    } else if ((versionOffset = userAgent.indexOf("Edge")) !== -1) {
        browserName = "Microsoft Edge";
        fullVersion = userAgent.substring(versionOffset + 5);
    } else if ((versionOffset = userAgent.indexOf("Chrome")) !== -1) {
        browserName = "Google Chrome";
        fullVersion = userAgent.substring(versionOffset + 7);
    } else if ((versionOffset = userAgent.indexOf("Safari")) !== -1) {
        browserName = "Apple Safari";
        fullVersion = userAgent.substring(versionOffset + 7);
        if ((versionOffset = userAgent.indexOf("Version")) !== -1) {
            fullVersion = userAgent.substring(versionOffset + 8);
        }
    }

    if (userAgent.indexOf("Win") !== -1) {
        platform = "Windows";
        if (userAgent.indexOf("Windows NT 10.0") !== -1) systemVersion = "10";
        else if (userAgent.indexOf("Windows NT 6.3") !== -1) systemVersion = "8.1";
        else if (userAgent.indexOf("Windows NT 6.2") !== -1) systemVersion = "8";
        else if (userAgent.indexOf("Windows NT 6.1") !== -1) systemVersion = "7";
        else if (userAgent.indexOf("Windows NT 6.0") !== -1) systemVersion = "Vista";
        else if (userAgent.indexOf("Windows NT 5.1") !== -1) systemVersion = "XP";
        else if (userAgent.indexOf("Windows NT 5.0") !== -1) systemVersion = "2000";
    } else if (userAgent.indexOf("Mac") !== -1) {
        platform = "Macintosh";
        systemVersion = /Mac OS X (\d+[\.\_\d]+)/.exec(userAgent)[1].replace('_', '.');
    } else if (userAgent.indexOf("Linux") !== -1) {
        platform = "Linux";
    } else if (userAgent.indexOf("Android") !== -1) {
        platform = "Android";
        systemVersion = /Android (\d+[\.\_\d]+)/.exec(userAgent)[1];
    } else if (userAgent.indexOf("like Mac") !== -1) {
        platform = "iOS";
        systemVersion = /CPU (?:iPhone )?OS (\d+[\_\d]+)/.exec(userAgent)[1].replace('_', '.');
    }

    return {
        browser: browserName,
        version: fullVersion.split(' ')[0], // Usuwanie dodatkowych informacji po wersji
        system: platform,
        systemVersion: systemVersion
    };
}

async function getIPAndLocation() {
    try {
        let response = await fetch('https://ipapi.co/json'); // `ipapi.co` nie wymaga tokena do podstawowych zapytań
        let data = await response.json();
        return {
            ip: data.ip,
            city: data.city,
            country: data.country_name
        };
    } catch (error) {
        console.error('Error fetching IP and location:', error);
        return null;
    }
}

function updateCurrentTime() {
    let now = new Date();
    $('#userTime span').text(now.toLocaleDateString() + ' ' + now.toLocaleTimeString());
}

async function updateBatteryStatus() {
    if ('getBattery' in navigator) {
        let battery = await navigator.getBattery();
        $('#userBat span').text((battery.level * 100 + '%' || 'NO DATA') + (battery.charging ? ' (charging)' : ''));
    } else {
        $('#userBat span').text('NO DATA');
    }
}