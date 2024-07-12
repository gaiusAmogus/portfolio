export function animFrom(elementSelector, from) {
    const elementToAnimate = document.querySelector(elementSelector);
    let tVal;

    if (from === 'up') {
        tVal = 'translate(0, -30px)';
    } 
    else if (from === 'down') {
        tVal = 'translate(0, 30px)';
    } 
    else if (from === 'left') {
        tVal = 'translate(-30px, 0)';
    } 
    else if (from === 'right') {
        tVal = 'translate(30px, 0)';
    }

    const keyframes = [
        { transform: `${tVal}`, opacity: 0 },
        { transform: 'translate(0)', opacity: 1 }
    ];

    const options = {
        duration: 300,
        easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
        fill: 'forwards',
    };

    // Ustawienie początkowego stylu przed animacją
    elementToAnimate.style.opacity = 0;

    // Uruchomienie animacji
    elementToAnimate.animate(keyframes, options);
}
export function animTo(elementSelector, from) {
    const elementToAnimate = document.querySelector(elementSelector);
    let tVal;

    if (from === 'up') {
        tVal = 'translate(0, -30px)';
    } 
    else if (from === 'down') {
        tVal = 'translate(0, 30px)';
    } 
    else if (from === 'left') {
        tVal = 'translate(-30px, 0)';
    } 
    else if (from === 'right') {
        tVal = 'translate(30px, 0)';
    }

    const keyframes = [
        { transform: 'translate(0)', opacity: 0 },
        { transform: `${tVal}`, opacity: 1 }
    ];

    const options = {
        duration: 300,
        easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
        fill: 'forwards',
    };

    // Ustawienie początkowego stylu przed animacją
    elementToAnimate.style.opacity = 0;

    // Uruchomienie animacji
    elementToAnimate.animate(keyframes, options);
}