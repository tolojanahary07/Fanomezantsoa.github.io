document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(
    "section, .scale-up, .slide-in-left, .slide-in-right, .slide-in-bottom, .fade-in"
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target); // déclenche une seule fois
      }
    });
  }, {
    threshold: 0.1
  });

  elements.forEach((el) => observer.observe(el));
});

// Alerte SweetAlert
function afficherAlerte() {
  Swal.fire({
    title: '🎉 Bienvenue !',
    html: `
      <p>Merci de visiter mon <strong>portfolio</strong> 💻</p>
      <p>Explorez mes projets et n'hésitez pas à me contacter ! 🚀</p>
    `,
    imageUrl: 'https://media.giphy.com/media/26BRv0ThflsHCqDrG/giphy.gif',
    imageWidth: 200,
    imageHeight: 200,
    imageAlt: 'Fête',
    background: '#f0f8ff',
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    },
    confirmButtonText: 'C\'est parti !',
    confirmButtonColor: '#4a90e2',
    timer: 6000,
    timerProgressBar: true
  });
}
