export function acronymEl(id, selector, numAcronyms) {
    const parentElement = document.querySelector(selector);
    if (!parentElement) {
        console.error(`Parent element with selector '${selector}' not found.`);
        return;
    }

    function generateRandomAcronyms(count) {
        const base64Chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/';
        const codes = [];
    
        function getRandomBase4096Code() {
            let code = '';
            for (let i = 0; i < 3; i++) {
                code += base64Chars.charAt(Math.floor(Math.random() * base64Chars.length));
            }
            return code;
        }
    
        const adjustedCount = count * 10;
        for (let i = 0; i < adjustedCount; i++) {
            codes.push(getRandomBase4096Code());
        }
    
        return codes.join(' ');
    }
        

    // Tworzenie nowego elementu 'acr'
    const acr = document.createElement('span');
    acr.classList = 'acr';
    acr.id = id; // Nadanie id 'acr' elementowi

    // Generowanie początkowego tekstu akronimów
    const initialText = generateRandomAcronyms(numAcronyms);
    acr.textContent = initialText;

    // Dodanie elementu 'acr' do rodzica
    parentElement.appendChild(acr);

    // Funkcja do losowego przetasowywania tablicy
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Funkcja do aktualizacji akronimów
    const updateAcronyms = () => {
        const words = acr.textContent.split(' ');
        // Przetasowanie tablicy słów
        const shuffledWords = shuffleArray(words);

        // Utworzenie nowej zawartości
        const newContent = shuffledWords.slice(0, numAcronyms).join(' ');

        // Aktualizacja zawartości elementu 'acr'
        acr.textContent = newContent;
    }

    // Wywołanie początkowe funkcji aktualizującej akronimy
    updateAcronyms();

    // Ustawienie interwału do aktualizacji akronimów
    setInterval(updateAcronyms, 200);
}
