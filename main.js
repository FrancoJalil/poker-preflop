document.addEventListener("DOMContentLoaded", () => {
    const imageConditions = {
        "UTG-Open Raise": "images/UTG/Open Raise.png",
        "UTG-VS 3BET IP": "images/UTG/vs 3bet ip.png",
        "UTG-VS 3BET OOP": "images/UTG/vs 3bet oop.png",

        "MP-Open Raise": "images/MP/Open Raise.png",
        "MP-VS 3BET IP": "images/MP/vs 3bet ip.png",
        "MP-VS 3BET OOP": "images/MP/vs 3bet oop.png",
        "MP-3BET-UTG": "images/MP/vs utg.png",
        "MP-VS 4BET-UTG": "images/MP/vs 4bet utg.png",

        "CO-Open Raise": "images/CO/Open Raise.png",
        "CO-VS 3BET IP": "images/CO/vs 3bet ip.png",
        "CO-VS 3BET OOP": "images/CO/vs 3bet oop.png",
        "CO-3BET-UTG": "images/CO/vs utg.png",
        "CO-3BET-MP": "images/CO/vs mp.png",
        "CO-VS 4BET-UTG": "images/CO/vs 4bet utg.png",
        "CO-VS 4BET-MP": "images/CO/vs 4bet mp.png",

        "BTN-Open Raise": "images/BTN/Open Raise.png",
        "BTN-VS 3BET IP": "images/BTN/vs 3bet ip.png",
        "BTN-VS 3BET OOP": "images/BTN/vs 3bet oop.png",
        "BTN-3BET-UTG": "images/BTN/vs utg.png",
        "BTN-3BET-MP": "images/BTN/vs mp.png",
        "BTN-3BET-CO": "images/BTN/vs co.png",
        "BTN-VS 4BET-UTG": "images/BTN/vs 4bet utg.png",
        "BTN-VS 4BET-MP": "images/BTN/vs 4bet mp.png",
        "BTN-VS 4BET-CO": "images/BTN/vs 4bet co.png",

        "SB-Open Raise": "images/SB/Open Raise.png",
        "SB-3BET-UTG": "images/SB/vs utg.png",
        "SB-3BET-MP": "images/SB/vs mp.png",
        "SB-3BET-CO": "images/SB/vs co.png",
        "SB-3BET-BTN": "images/SB/vs btn.png",
        "SB-VS 4BET-UTG": "images/SB/vs 4bet utg.png",
        "SB-VS 4BET-MP": "images/SB/vs 4bet mp.png",
        "SB-VS 4BET-CO": "images/SB/vs 4bet co.png",
        "SB-VS 4BET-BTN": "images/SB/vs 4bet btn.png",

        "BB-Open Raise": "images/BB/Open Raise.png",
        "BB-3BET-UTG": "images/BB/vs utg.png",
        "BB-3BET-MP": "images/BB/vs mp.png",
        "BB-3BET-CO": "images/BB/vs co.png",
        "BB-3BET-BTN": "images/BB/vs btn.png",
        "BB-3BET-SB": "images/BB/vs sb.png",
        "BB-VS 4BET-UTG": "images/BB/vs 4bet utg.png",
        "BB-VS 4BET-MP": "images/BB/vs 4bet mp.png",
        "BB-VS 4BET-CO": "images/BB/vs 4bet co.png",
        "BB-VS 4BET-BTN": "images/BB/vs 4bet btn.png",
        "BB-VS 4BET-SB": "images/BB/vs 4bet sb.png",

    };

    const positions = document.querySelectorAll(".positions");
    const imageContainer = document.querySelector("#image-container");

    const resetLevel = (level) => {
        const levels = ["second", "third"];
        const levelIndex = levels.indexOf(level);

        for (let i = levelIndex; i < levels.length; i++) {
            const container = document.querySelector(`.${levels[i]}`);
            container.style.display = "none";

            const buttons = container.querySelectorAll("button, div");
            buttons.forEach(button => (button.style.display = "block"));
        }

        if (imageContainer) {
            imageContainer.src = "";
        }
    };

    const removeEventListeners = (elements) => {
        const clone = Array.from(elements).map(el => el.cloneNode(true));
        clone.forEach((newEl, index) => {
            elements[index].replaceWith(newEl);
        });
        return clone;
    };

    positions.forEach(position => {
        position.addEventListener("click", () => {
            // Quitar la clase `selected` de los demás botones
            positions.forEach(pos => pos.classList.remove("selected"));
            const selectedImage = document.querySelector("#selected-image");
            selectedImage.src = "";
            
            // Añadir la clase `selected` al botón actual
            position.classList.add("selected");
    
            const positionName = position.innerText;
            console.log("Nivel 1 seleccionado:", positionName);
    
            resetLevel("second");
            const secondButtonsContainer = document.querySelector(".second");
            secondButtonsContainer.style.display = "flex";
    
            // Configurar las opciones disponibles para la posición seleccionada
            const options = document.querySelectorAll(".options");
            const conditions = {
                UTG: ["3BET", "VS 4BET"],
                CO: ["VS 3BET OOP"],
                BTN: ["VS 3BET OOP"],
                SB: ["VS 3BET OOP", "VS 3BET IP"],
                BB: ["VS 3BET OOP", "VS 3BET IP", "Open Raise"],
            };
    
            const optionsToHide = conditions[positionName] || [];
            options.forEach(option => {
                option.style.display = optionsToHide.includes(option.innerText) ? "none" : "block";
                option.classList.remove("selected"); // Resetear estado seleccionado
            });
    
            options.forEach(option => {
                option.addEventListener("click", () => {
                    options.forEach(opt => opt.classList.remove("selected")); // Limpiar selección
                    option.classList.add("selected"); // Seleccionar actual
                    
                    const selectedImage = document.querySelector("#selected-image");
                    selectedImage.src = "";

                    const optionName = option.innerText;
                    console.log("Nivel 2 seleccionado:", optionName);
    
                    resetLevel("third");
    
                    const skipThirdLevelOptions = ["Open Raise", "VS 3BET IP", "VS 3BET OOP"];
                    if (skipThirdLevelOptions.includes(optionName)) {
                        const selectedCombination = `${positionName}-${optionName}`;
                        console.log("Combinación seleccionada:", selectedCombination);
    
                        const imageSrc = imageConditions[selectedCombination];
                        const selectedImage = document.querySelector("#selected-image");
    
                        if (imageSrc) {
                            selectedImage.src = imageSrc;
                        } else {
                            selectedImage.src = "";
                            console.error("No se encontró imagen para la combinación:", selectedCombination);
                        }
    
                        return;
                    }
    
                    const thirdButtonsContainer = document.querySelector(".third");
                    thirdButtonsContainer.style.display = "flex";
    
                    const thirdConditions = {
                        MP: ["UTG"],
                        CO: ["UTG", "MP"],
                        BTN: ["UTG", "MP", "CO"],
                        SB: ["UTG", "MP", "CO", "BTN"],
                        BB: ["UTG", "MP", "CO", "BTN", "SB"],
                    };
    
                    const allowedPositions = thirdConditions[positionName] || [];
                    let thirdOptions = document.querySelectorAll(".third-options");
    
                    thirdOptions = removeEventListeners(thirdOptions);
    
                    thirdOptions.forEach(thirdOption => {
                        thirdOption.style.display = allowedPositions.includes(thirdOption.innerText) ? "block" : "none";
                        thirdOption.classList.remove("selected"); // Resetear estado seleccionado
    
                        thirdOption.addEventListener("click", () => {
                            thirdOptions.forEach(opt => opt.classList.remove("selected")); // Limpiar selección
                            thirdOption.classList.add("selected"); // Seleccionar actual
    
                            const thirdOptionName = thirdOption.innerText;
                            console.log("Nivel 3 seleccionado:", thirdOptionName);
    
                            const selectedCombination = `${positionName}-${optionName}-${thirdOptionName}`;
                            console.log("Combinación seleccionada:", selectedCombination);
    
                            const imageSrc = imageConditions[selectedCombination];
                            const selectedImage = document.querySelector("#selected-image");
    
                            if (imageSrc) {
                                selectedImage.src = imageSrc;
                            } else {
                                selectedImage.src = "";
                                console.error("No se encontró imagen para la combinación:", selectedCombination);
                            }
                        });
                    });
                });
            });
        });
    });
    
});
