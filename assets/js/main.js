document.querySelectorAll('button.scroller').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        document.querySelector(this.getAttribute('data-pointer')).scrollIntoView({
            behavior: 'smooth'
        });
    });
})

