'use strict';
const projectBtn = document.querySelector('.btn-hero');
const aboutBtn = document.querySelector('.btn-about');
const hamburgerMenu = document.querySelector('.ham-menu');
const navUl = document.querySelector('.navbar-links');
const navA = document.querySelectorAll('.navbar-link');
const sectionProjects = document.querySelector('#projects');
const sectionContact = document.querySelector('#contact');
const header = document.querySelector('.header');
const navbar = document.querySelector('.navbar');
const navHeight = navbar.getBoundingClientRect().height;
const sectionHeader = document.querySelectorAll('.section-header'); 
const fullName = document.getElementById('name');
const email = document.getElementById('email');
const form = document.querySelector('.form');

// smooth scrolling 
function smoothScroll(e) {
    e.preventDefault();
    if(e.target.classList.contains('navbar-link')) {
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({behavior: 'smooth'});
    }
}
navUl.addEventListener('click', smoothScroll);
projectBtn.addEventListener('click', function() {
    sectionProjects.scrollIntoView({behavior:"smooth"});
})
aboutBtn.addEventListener('click', function() {
    sectionContact.scrollIntoView({behavior: 'smooth'});
})

// Menu Toggle
hamburgerMenu.addEventListener('click', toggle);
function toggle() {
    navUl.classList.toggle('active');
    hamburgerMenu.classList.toggle('active');
}
navA.forEach(a => a.addEventListener('click', closeHamMenu));
function closeHamMenu() {
    navUl.classList.remove('active');
    hamburgerMenu.classList.remove('active');
}
// Sticky Nav
const stickyNav = function(entries) {
    const [entry] = entries;
    if(!entry.isIntersecting) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
}
let options = {
    root: null,
    threshold: 0,
    rootMargin: `${navHeight}px`,
}
const navObserver = new IntersectionObserver(stickyNav, options);
navObserver.observe(header);

//form
form.addEventListener('submit', formValidation);
function formValidation(e) {
    e.preventDefault();
    const fullNameValue = fullName.value;
    const emailValue = email.value;
    if(fullNameValue === '') {
        setError(fullName, 'name cannot be blank');
    } else {
        setSuccess(fullName);
    }
    
    if(emailValue === '') {
        setError(email, 'email cannot be blank');
    } else {
        setSuccess(email);
    }
};

function setError(input, message) {
    const formGroup = input.parentElement;
    const small = formGroup.querySelector('small');
    small.innerText = message;
    formGroup.className = 'form-group error';
}
function setSuccess(input) {
    const formGroup = input.parentElement;
    formGroup.className = 'form-group success';
}
