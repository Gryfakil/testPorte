
    const lazyImages = document.querySelectorAll(".lazy-image"); 
  
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.getAttribute("data-lazy"); 
            img.removeAttribute("data-lazy"); // Retire data-lazy après le chargement pour ne pas la rechanger
            observer.unobserve(img); // Arrête d'observer cette image
          }
        });
      });
  
      lazyImages.forEach((img) => {
        observer.observe(img); // Observe chaque image
      });
    } else {
      // Fallback pour les anciens navigateurs sans IntersectionObserver
      lazyImages.forEach((img) => {
        img.src = img.getAttribute("data-lazy");
        img.removeAttribute("data-lazy");
      });
    }
  
  