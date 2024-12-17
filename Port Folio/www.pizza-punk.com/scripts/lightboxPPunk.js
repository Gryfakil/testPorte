// console.log('lightbox');
const thumbnails = [...document.querySelectorAll(".thumbnail")];
  const lightBox = document.querySelector(".lightbox");
  const lightBoxImg = document.querySelector("#lightbox-img");
  const lightBoxClose = document.querySelector("#lightbox-close-btn");
  const lightboxAlt = document.querySelector("#lightbox-alt");

  thumbnails.map((thumbnail) => {
    thumbnail.addEventListener("click", function (e) {
      const imageUrl = thumbnail.dataset.src;
      const imageAlt = thumbnail.alt;
      lightBoxImg.src = imageUrl;
      lightBoxImg.alt = imageAlt;
      lightboxAlt.textContent = imageAlt;
      lightBox.classList.remove("none");
      lightBox.classList.add("active");
    });
  });
  lightBoxClose.addEventListener("click", function (e) {
    lightBox.classList.remove("active");
    lightBox.classList.add("none");
    lightboxAlt.textContent = "";
    
  });
  lightBox.addEventListener("click", function (e) {
    if (e.target === lightBox) {
      // Vérifie que le clic est en dehors de l'image
      lightBox.classList.remove("active"); // Cache la lightbox
      lightBox.classList.add("none");
      lightboxAlt.textContent = "";
    }
  });