import { getSvg } from '../../functions/getSvg.js';
import { handleBackButtons } from '../../functions/backButtons.js';

export function headerFooter() { 
    var app = document.getElementById('app');
    
    var header = `
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

    var footer = `
        <footer class="footer">
            <div class="footer__row">
                <div class="footer__row__el footer__row__el--1">
                    <div class="footer__row__el__content">
                        <p><span>SYSTEM CREATED BY DAWID JEDYNAK</span></p>
                        <p><span>AS A PORTFOLIO</span></p>
                    </div>
                    <div class="footer__row__el__btns">
                        <div class="btn btn--primary btnBack__modules">Back to modules</div>
                        <div class="btn btn--primary btnBack__projects">Back to projects</div>
                    </div>
                </div>
                <div class="footer__row__el footer__row__el--2">
                    <p><span>If you want to offer me cooperation write to </span><a href="mailto:kontakt@voidnetrun.it" class="link link--red">kontakt@voidnetrun.it</a></p>
                    <a href="/" target="_blank">${getSvg('linkedin')}</a>
                    <a href="https://github.com/gaiusAmogus" target="_blank">${getSvg('github')}</a>
                </div>
            </div>
        </footer>
    `;

    app.insertAdjacentHTML('beforeend', header);
    app.insertAdjacentHTML('beforeend', footer);

    var headerHeight = document.querySelector('.header').offsetHeight;
    var footerHeight = document.querySelector('.footer').offsetHeight;
    var headerFooterSpace = headerHeight + footerHeight + 80;
    
    var contentContainer = `
        <section class="contentContainer" data-about="0" style="max-height: calc(100% - ${headerFooterSpace}px)">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div id="content"></div>
                    </div>
                </div>
            </div>
        </section>
    `;
    app.insertAdjacentHTML('beforeend', contentContainer);

    updateUserInfo();
    handleBackButtons();
}

async function updateUserInfo() {
    // Informacje o systemie i przeglądarce
    let browserInfo = getBrowserInfo();
    document.querySelector('#userSystem span').textContent = browserInfo.system + ' ' + browserInfo.systemVersion || 'NO DATA';
    document.querySelector('#userBrowser span').textContent = (browserInfo.browser + ' ' + browserInfo.version) || 'NO DATA';

    // Adres IP i lokalizacja
    let ipAndLocation = await getIPAndLocation();

    if (ipAndLocation) {

        const city = ipAndLocation.city || '';
        const country = ipAndLocation.country || '';
        
        let displayText;
        
        if (city && country) {
            displayText = `${city}, ${country}`;
        } else if (city || country) {
            displayText = city || country;
        } else {
            displayText = 'NO DATA';
        }
        
        document.querySelector('#userLocation span').textContent = displayText;
        document.querySelector('#userIP span').textContent = ipAndLocation.ip || 'NO DATA';
        
    } else {
        document.querySelector('#userIP span').textContent = 'NO DATA';
        document.querySelector('#userLocation span').textContent = 'NO DATA';
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
        browserName = "Chrome";
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
    let ip = null;
    let city = null;
    let country = null;

    try {
        // Fetch the IP address
        let ipResponse = await fetch('https://api.ipify.org?format=json');
        if (!ipResponse.ok) throw new Error('Failed to fetch IP');
        let ipData = await ipResponse.json();
        ip = ipData.ip;

        // Fetch the location data based on the IP address
        let locationResponse = await fetch(`https://ipinfo.io/${ip}/json`);
        if (!locationResponse.ok) throw new Error('Failed to fetch location');
        let locationData = await locationResponse.json();
        
        city = locationData.city;
        country = locationData.country;

    } catch (error) {
        console.error('Error fetching IP and location:', error);
    }

    return {
        ip: ip,
        city: city,
        country: country
    };
}

function updateCurrentTime() {
    let now = new Date();
    document.querySelector('#userTime span').textContent = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
}

async function updateBatteryStatus() {
    if ('getBattery' in navigator) {
        let battery = await navigator.getBattery();
        let batteryLevel = Math.round(battery.level * 100);
        document.querySelector('#userBat span').textContent = (batteryLevel + '%' || 'NO DATA') + (battery.charging ? ' (charging)' : '');
    } else {
        document.querySelector('#userBat span').textContent = 'NO DATA';
    }
}
