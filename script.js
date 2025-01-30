// Hent alle knappene og legg til eventlistener
//https://stackoverflow.com/questions/48247532/create-an-array-of-buttons-from-javascript-array
const buttons = Array.from(document.querySelectorAll(".category-btn"));

// Legg til eventlistener på hver knapp for kategorinavigasjon
//https://stackoverflow.com/questions/70856440/addeventlistener-to-all-buttons-using-foreach
buttons.forEach((button, index) => {
    button.addEventListener("click", function () {
        const category = button.dataset.category;

        // Fjern "active"-klassen fra alle knapper
        buttons.map((btn) => btn.classList.remove("active"));

        // Legg til "active"-klassen på den klikkede knappen
        button.classList.add("active");

        // Oppdater innholdet
        updateCategoryContent(category);
    });
});

// Sett den første knappen som aktiv og oppdater innholdet
buttons.filter((button, index) => index === 0).map((button) => {
    button.classList.add("active");
    updateCategoryContent(button.dataset.category);
});
//buttons[0].classList.add("active");
//updateCategoryContent(buttons[0].dataset.category);

// Funksjon for å oppdatere innhold når en kategori blir klikket
//https://stackoverflow.com/questions/16948498/wordpress-update-category-function
function updateCategoryContent(category) {
    const selectedResource = resources.filter((resource) => resource.category === category);

    if (selectedResource.length > 0) {
        const resource = selectedResource[0];
        const sourcesHTML = resource.sources
            .map(
                (source) =>
                    `<li><a href="${source.url}" target="_blank">${source.title}</a></li>`
            )
            .join("");

        document.getElementById("content").innerHTML = `
            <article>
                <h2>${resource.category}</h2>
                <p>${resource.text}</p>
                <ul>${sourcesHTML}</ul>
            </article>
        `;
    } else {
        console.error(`Category not found: ${category}`);
    }
}