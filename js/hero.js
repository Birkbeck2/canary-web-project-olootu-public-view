
// This code dynamically inject image to the hero area of each page where this function is called 
export const insertHeroImage = function(el, imgSource, alt){
    const src = document.querySelector(el);
    const image = document.createElement("img");
    image.src = `../images/${imgSource}.jpg`;
    image.alt = alt;
    src.appendChild(image);
}