document.addEventListener("DOMContentLoaded", function () {

    try {        

        const languageSelectorTag = document.getElementsByClassName('language-selector')[0];
        
        //insert tag inside languageSelectorTag
        languageSelectorTag.innerHTML = `
        <div class="dropdown-selected" id="language" value={${LANGUAGES_KEY.EN}}>${LANGUAGES_KEY_TO_DESCRIPTION.en}</div>
          <div class="dropdown-options" id="dropdown-language">
          ${Object.values(LANGUAGES_KEY)
                .map((langKey) => {
                    return `<div class="dropdown-option" value="${langKey}">${LANGUAGES_KEY_TO_DESCRIPTION[langKey]}</div>`
                })
                .join('')}            
          </div>`;



        const dropdown = document.getElementsByClassName('language-selector')[0];
        const selected = dropdown.querySelector('.dropdown-selected');
        const optionsContainer = dropdown.querySelector('.dropdown-options');
        const optionsList = dropdown.querySelectorAll('.dropdown-option');

        // First option by default
        if (optionsList.length > 0) {
            selected.textContent = optionsList[0].textContent;
        }

        // Alternate options container visibility
        selected.addEventListener('click', () => {
            optionsContainer.style.display = optionsContainer.style.display === 'block' ? 'none' : 'block';
        });

        // Choose option and close dropdown
        optionsList.forEach(option => {
            option.addEventListener('click', () => {
                selected.textContent = option.textContent;
                selected.setAttribute('value', option.getAttribute('value'));

                const languageSelected = option.getAttribute('value')

                const iframe = document.getElementById('gd-iframe');
                if (iframe && iframe.contentWindow) {
                    //set up postMessage to send the selected language to iframe
                    iframe.contentWindow.postMessage({ type: 'changeLanguage', language: languageSelected }, '*');
                }

                optionsContainer.style.display = 'none';

                changeLanguage();

            });

        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (event) => {
            if (!dropdown.contains(event.target)) {
                optionsContainer.style.display = 'none';
            }
        });
    } catch (error) {

        console.error('script', error)
    }
});