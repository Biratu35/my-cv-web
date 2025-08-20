"use strict";

document.addEventListener("DOMContentLoaded", function() {

  /* ---------- Sidebar Toggle ---------- */
  const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }
  const sidebar = document.querySelector("[data-sidebar]");
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");
  sidebarBtn.addEventListener("click", function() { elementToggleFunc(sidebar); });

  /* ---------- Testimonials Modal ---------- */
  const testimonialsItem = document.querySelectorAll('[data-testimonials-item]');
  const modalContainer = document.querySelector('[data-modal-container]');
  const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
  const overlay = document.querySelector('[data-overlay]');
  const modalImg = document.querySelector('[data-modal-img]');
  const modalTitle = document.querySelector('[data-modal-title]');
  const modalText = document.querySelector('[data-modal-text]');

  const testimonialsModalFunc = function () {
      modalContainer.classList.toggle('active');
      overlay.classList.toggle('active');
  }

  testimonialsItem.forEach(item => {
      item.addEventListener('click', function () {
          modalImg.src = this.querySelector('[data-testimonials-avatar]').src;
          modalImg.alt = this.querySelector('[data-testimonials-avatar]').alt;
          modalTitle.innerHTML = this.querySelector('[data-testimonials-title]').innerHTML;
          modalText.innerHTML = this.querySelector('[data-testimonials-text]').innerHTML;
          testimonialsModalFunc();
      });
  });

  modalCloseBtn.addEventListener('click', testimonialsModalFunc);
  overlay.addEventListener('click', testimonialsModalFunc);

  /* ---------- Filter Select & Buttons ---------- */
  const select = document.querySelector('[data-select]');
  const selectItems = document.querySelectorAll('[data-select-item]');
  const selectValue = document.querySelector('[data-select-value]');
  const filterBtn = document.querySelectorAll('[data-filter-btn]');
  const filterItems = document.querySelectorAll('[data-filter-item]');

  select.addEventListener('click', function () { elementToggleFunc(this); });

  selectItems.forEach(item => {
      item.addEventListener('click', function() {
          let selectedValue = this.innerText.toLowerCase();
          selectValue.innerText = this.innerText;
          elementToggleFunc(select);
          filterFunc(selectedValue);
      });
  });

  const filterFunc = function (selectedValue) {
      filterItems.forEach(item => {
          if(selectedValue === "all" || selectedValue === item.dataset.category) {
              item.classList.add('active');
          } else {
              item.classList.remove('active');
          }
      });
  }

  let lastClickedBtn = filterBtn[0];
  filterBtn.forEach(btn => {
      btn.addEventListener('click', function() {
          let selectedValue = this.innerText.toLowerCase();
          selectValue.innerText = this.innerText;
          filterFunc(selectedValue);
          lastClickedBtn.classList.remove('active');
          this.classList.add('active');
          lastClickedBtn = this;
      });
  });

  /* ---------- Contact Form ---------- */
  const form = document.querySelector('[data-form]');
  const formInputs = document.querySelectorAll('[data-form-input]');
  const formBtn = document.querySelector('[data-form-btn]');

  formInputs.forEach(input => {
      input.addEventListener('input', function () {
          if(form.checkValidity()) {
              formBtn.removeAttribute('disabled');
          } else { 
              formBtn.setAttribute('disabled', '');
          }
      });
  });

  /* ---------- Page Navigation ---------- */
  const navigationLinks = document.querySelectorAll('[data-nav-link]');
  const pages = document.querySelectorAll('[data-page]');

  navigationLinks.forEach((link, i) => {
      link.addEventListener('click', function() {
          pages.forEach((page, j) => {
              if(link.innerHTML.toLowerCase() === page.dataset.page) {
                  page.classList.add('active');
                  navigationLinks[j].classList.add('active');
                  window.scrollTo(0,0);
              } else {
                  page.classList.remove('active');
                  navigationLinks[j].classList.remove('active');
              }
          });
      });
  });

  /* ---------- Skills Progress Bars ---------- */
  document.querySelectorAll('.skills-progress-fill').forEach(bar => {
      const level = parseFloat(bar.getAttribute('data-level')); // e.g. 4.5 out of 5
      const max = 5;
      bar.style.width = (level / max * 100) + '%';
  });

  /* ---------- Blog Modal ---------- */
  const blogModal = document.getElementById("blogModal");
  const fullText = document.getElementById("fullText");
  const blogCloseBtn = blogModal.querySelector(".close");

  document.querySelectorAll(".blog-card .read-more").forEach(btn => {
      btn.addEventListener("click", () => {
          const card = btn.closest(".blog-card");
          fullText.textContent = card.getAttribute("data-full");
          blogModal.style.display = "block";
      });
  });

  blogCloseBtn.addEventListener("click", () => {
      blogModal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
      if (e.target === blogModal) {
          blogModal.style.display = "none";
      }
  });

});


