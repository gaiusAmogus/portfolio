export function randomGlitch(chance, count, el) {
    const randomNumber = Math.floor(Math.random() * chance); //calc chances of run
    if (randomNumber === 0) {
        var gl = Object.create(glitch_exec);
        gl.GLITCH_RENDER_COUNT = count; //number of repeats
        gl.start(document.querySelector(el));
    }
}
