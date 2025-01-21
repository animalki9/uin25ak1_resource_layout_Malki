document.addEventListener("DOMContentLoaded", () => {
    const tabsMenu = document.getElementById("tabs-menu");
    const content = document.getElementById("content");

    // Funksjon for å vise en kategori
    const displayCategory = (category) => {
        const { text, sources } = resources.find((res) => res.category === category);

        // Oppdater innholdet
        content.innerHTML = `
            <h1>${category}</h1>
            <p>${text}</p>
            <ul>
                ${sources
                    .map(
                        (source) => `
                    <li>
                        <a href="${source.url}" target="_blank">${source.title}</a>
                    </li>
                `
                    )
                    .join("")}
            </ul>
        `;
    };

    // Bygg fanemenyen
    resources.forEach((resource, index) => {
        const tab = document.createElement("li");
        tab.innerHTML = `<button class="${index === 0 ? "active" : ""}" data-category="${resource.category}">
            ${resource.category}
        </button>`;
        tabsMenu.appendChild(tab);
    });

    // Legg til klikkhendelser for fanene
    tabsMenu.addEventListener("click", (event) => {
        if (event.target.tagName === "BUTTON") {
            // Fjern "active" fra alle knapper
            document.querySelectorAll(".tabs button").forEach((btn) => btn.classList.remove("active"));

            // Legg til "active" på den klikkede knappen
            event.target.classList.add("active");

            // Vis innhold for valgt kategori
            const category = event.target.getAttribute("data-category");
            displayCategory(category);
        }
    });

    // Vis den første kategorien som standard
    displayCategory(resources[0].category);
});