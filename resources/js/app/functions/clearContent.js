import { stopGlitchModule } from '/resources/js/app/components/pageStart/dataModules.js';

export function clearContent(){
    //stop current animations
    stopGlitchModule();

    const contentElement = document.querySelector('#content');
    const elementToAnimate = contentElement.children[0];

    if (elementToAnimate){



        const keyframes = [
            { transform: 'translate(0)', opacity: 1 },
            { transform: 'translate(0, 50px)', opacity: 0 }
        ];
    
        const options = {
            duration: 300,
            easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
            fill: 'forwards',
        };
    
        // Uruchomienie animacji
        elementToAnimate.animate(keyframes, options);
        


        setTimeout(() => {
            contentElement.innerHTML = '';
        }, options.duration);
    }

}