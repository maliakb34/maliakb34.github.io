document.addEventListener("DOMContentLoaded", () => {
  const dropdown = document.querySelector(".header__dropdown");
  const buttonLang = document.querySelector(".header__button-lang");
  const dropdownList = dropdown
    ? dropdown.querySelector(".header__dropdown-list")
    : null;
  const navItems = document.querySelectorAll(".header__item-link");
  const buttonNav = document.querySelector(".header__nav-btn");
  const headerNav = document.querySelector(".header__nav");

  const cardsContainer = document.querySelector(".services__cards");
  const cards = document.querySelectorAll(".services__card");
  const portfolioBlock = document.querySelector(".portfolio__block");

  const toggleDropdown = () => {
    if (dropdown) {
      dropdown.classList.toggle("active");
    }
  };

  if (buttonLang) {
    buttonLang.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleDropdown();
    });
  }

  document.addEventListener("click", (event) => {
    if (
      dropdown &&
      !dropdown.contains(event.target) &&
      event.target !== buttonLang
    ) {
      dropdown.classList.remove("active");
    }
    if (headerNav && !headerNav.contains(event.target) && !buttonNav.contains(event.target)) {
      headerNav.classList.remove("active");
    }
  });


  if (dropdownList) {
    const listItems = dropdownList.querySelectorAll("a");
    listItems.forEach((item) => {
      item.addEventListener("click", (event) => {
        event.preventDefault();
        const selectedLang = item.dataset.lang || item.textContent.trim();
        buttonLang.textContent = selectedLang.toUpperCase();
        dropdown.classList.remove("active");
      });
    });
  }

  if (buttonNav && headerNav) {
    buttonNav.addEventListener("click", () => {
      headerNav.classList.toggle("active");
    });
  }

  navItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();

      const targetId = item.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      if (headerNav) {
        headerNav.classList.remove("active");
      }
    });
  });

  window.onload = function () {

    const privacyPaths = [
      '/privacy-policy/',
      '/pl/polityka-prywatnosci/',
      '/uk/politika-konfidentsiynosti/',
      '/ru/politika-konfidentsialnosti/'
    ];

    if (privacyPaths.includes(window.location.pathname)) {
      const header = document.querySelector('.header');
      if (header) {
        console.log("Header found! Hiding it...");
        header.style.visibility = 'hidden';       
      } else {
        console.log("Header not found!"); 
      }
    }

    const textBlock = document.querySelector(".main__text-block");
    if (textBlock) {
      textBlock.classList.add("loaded");
    }
  };

  if (cardsContainer && cards.length > 0) {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            cardsContainer.classList.add("loaded");
            cards.forEach((card, index) => {
              card.classList.add("loaded");
            });
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.5,
      }
    );
    observer.observe(cardsContainer);
  }

  if (portfolioBlock) {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            portfolioBlock.classList.add("loaded");
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(portfolioBlock);
  }
});



