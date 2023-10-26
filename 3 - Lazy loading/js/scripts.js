const imgs = document.querySelectorAll(".img-container img")

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        
        const image = entry.target;

        image.src = image.src.replace("&w=10&", "&10=1000&");

        observer.unobserve(image);
    });
});

imgs.forEach((image) => {
    observer.observe(image);
});