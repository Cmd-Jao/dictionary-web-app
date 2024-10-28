// Get the search button element from the DOM
const search_button = document.getElementById("search-word");

// Get the input field element from the DOM
const input_field = document.getElementById("input-word");

// Get the result display area from the DOM
const result = document.getElementById("word");

// Define an asynchronous function to fetch word data
async function fetchWord() {
    // Trim any whitespace from the input and assign it to 'word'
    const word = input_field.value.trim();

    // Define the API endpoint using the entered word
    const API = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    try {
        // Fetch data from the API
        const response = await fetch(API);
        
        // Parse the response data as JSON
        const data = await response.json();

        // Check if the response is not OK or if there's no data returned
        if (!response.ok || !data.length) {
            // Display an error message if the word is not found
            result.innerHTML = `<section class="error">
                                <img src="error-404.png" alt="Error Image">
                                <h1 class="error__message">Error: The word you entered was not found. Please check your spelling or try a different term.</h1>
                            </section>`;
        } else {
            // Destructure the fetched word, phonetic spelling, and meanings from the data
            const { word: fetchedWord, phonetic, meanings } = data[0];

            // Create HTML for the meanings by mapping over the meanings array
            const meaningsHTML = meanings.map(meaning => `
            <strong>${meaning.partOfSpeech}:</strong><br>
            ${meaning.definitions.map((def, index) => `${index + 1}. ${def.definition}<br>`).join('')}
            `).join('');

            // Update the result display area with the fetched word details
            result.innerHTML = `
                <h1 class="word">${fetchedWord}</h1>
                <h3 class="phonetic">${phonetic || 'No phonetic available'}</h3>
                <h4>Meanings:</h4>
                <p>${meaningsHTML}</p>
            `;
        }
    } catch (error) {
        // Log any errors that occur during the fetch process
        console.error("Error fetching data!", error);
    }
}

// Add a click event listener to the search button to trigger the fetchWord function
search_button.addEventListener('click', fetchWord);

// Add a keydown event listener to the input field to trigger the fetchWord function when the Enter key is pressed
input_field.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        fetchWord();
    }
});
