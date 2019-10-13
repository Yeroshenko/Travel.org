window.addEventListener('DOMContentLoaded', function() {
  
  'use strict';

  let tab = document.querySelectorAll('.info-header-tab'),
      info = document.querySelector('.info-header'),
      tabContent = document.querySelectorAll('.info-tabcontent');

  function hideTabContent(a) {
    for (let i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove('show');
      tabContent[i].classList.add('hide');
    }
  }

  hideTabContent(1);

  function showTabContent(b) {
    if (tabContent[b].classList.contains('hide')) {
      tabContent[b].classList.remove('hide');
      tabContent[b].classList.add('show');
    }
  }

  info.addEventListener('click', function(event) {
    let target = event.target;
    if ( target && target.classList.contains('info-header-tab')){
      for ( let i = 0; i < tab.length; i++ ) {
        if (target == tab[i]){
          hideTabContent(0);
          showTabContent(i);
          break;
        }
      }
    }

  });

  // Timer

  let deadline = '2019-10-20';

  function getTimeRemaining(endTime) {
    let t = Date.parse(endTime) - Date.parse(new Date()),  //  t = time difference
        seconds = Math.floor((t/1000) % 60),
        minutes = Math.floor((t/1000/60) % 60),
        hours = Math.floor((t/1000/60/60));

    return {
      'total'   : t,
      'hours'   : hours,
      'minutes' : minutes,
      'seconds' : seconds
    }; 
  }

  function setClock(id, endTime) {
    let timer        = document.getElementById(id),
        hours        = timer.querySelector('.hours'),
        minutes      = timer.querySelector('.minutes'),
        seconds      = timer.querySelector('.seconds'),
        timeInterval = setInterval(updateClock, 1000);

    function updateClock() {
      let t = getTimeRemaining(endTime);
      
      hours.textContent   = ('0' + t.hours).slice(-2);
      minutes.textContent = ('0' + t.minutes).slice(-2);
      seconds.textContent = ('0' + t.seconds).slice(-2);

      if (t.total <= 0) {
        clearInterval(timeInterval);
        hours.textContent   = '00';
        minutes.textContent = '00';
        seconds.textContent = '00';
      }
    }
  }

  setClock('timer', deadline);

  //  Modal

  let more    = document.querySelector('.more'),
      overlay = document.querySelector('.overlay'), 
      close   = document.querySelector('.popup-close');

  more.addEventListener('click', function() {
    overlay.style.display = 'block';
    this.classList.add('.fade');

  });

  close.addEventListener('click', function() {
    overlay.style.display = 'none';
    this.classList.add('.fade');
  });

  // Forms

  let message = {
    loading: 'Загрузка...',
    success: 'Спасибо, мы с вами свяжемся !',
    failure: 'Error...'
  };

  let form          = document.querySelector('.main-form'),
      contactForm   = document.querySelector('#form'),
      contactInput  = contactForm.getElementsByTagName('input'),
      input         = form.getElementsByTagName('input'),
      statusMessage = document.createElement('div');
      statusMessage.classList.add('status');

  // Forms

  sendForm(form, input);
  sendForm(contactForm, contactInput);
  
  function sendForm(elem, inputs) {
    elem.addEventListener('submit', function(event) {
      event.preventDefault();
      form.appendChild(statusMessage);
  
      let request = new XMLHttpRequest();
  
      request.open('POST', 'server.php');
      request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  
      let formData = new FormData(elem); 
  
      let obj = {};
      formData.forEach(function(value, key){
        obj[key] = value;
      });
      let json = JSON.stringify(obj);
  
      request.send(json);
      
      request.addEventListener( 'readystatechange', function () {
        if (request.readyState < 4) {
          statusMessage.innerHTML = message.loading;
        } else if(request.readyState === 4 && request.status ==200) {
          statusMessage.innerHTML = message.success;
        } else {
          statusMessage.innerHTML = message.failure;
        }
      });
      clearInput(inputs);
    });
  }
  
  function clearInput(inputs){
    for (let i = 0; i < inputs.length; i++){
      inputs[i].value = '';
    }
  }

  // Slider

  let slideIndex = 1,
      slides   = document.querySelectorAll('.slider-item'),
      prev     = document.querySelector('.prev'),
      next     = document.querySelector('.next'),
      dotsWrap = document.querySelector('.slider-dots'),
      dots      = document.querySelectorAll('.dot');

  showSlides(slideIndex);

  function showSlides(n) {

    // loop 

    if(n > slides.length) {
      slideIndex = 1;
    }

    if(n < 1) {
      slideIndex = slides.length;
    }

    //show slide & dots

    slides.forEach((item) => item.style.display = 'none');

    dots.forEach((item) => item.classList.remove('dot-active'));

    slides[slideIndex - 1]. style.display = 'block';
    dots[slideIndex - 1]. classList.add('dot-active');
  }

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }
  // click on dots
  function currentSlide(n) {
    showSlides(slideIndex = n); 
  }

  prev.addEventListener('click', () => plusSlides(-1));
  next.addEventListener('click', () => plusSlides(+1));

  dotsWrap.addEventListener('click', function(e) {
    for (let i = 0; i < dots.length + 1; i++) {
      if (e.target.classList.contains('dot') && e.target == dots[i-1]) {
        currentSlide(i);
      }
    }
  });

  // Calc

  let persons     = document.querySelectorAll('.counter-block-input')[0],
      restDays    = document.querySelectorAll('.counter-block-input')[1],
      place       = document.getElementById('select'),
      totalValue  = document.getElementById('total'),
      personSum = 0,
      daysSum = 0,
      total = 0;

  totalValue.textContent = 0;

  persons.addEventListener('input', function(){
    personSum = +this.value;
    total = (daysSum + personSum)*4000;
    
    if(restDays.value == '' || restDays.value == 0) { 
      totalValue.innerText = 0;
    } else {
      totalValue.textContent = total;
    }
  });

  restDays.addEventListener('input', function(){
    daysSum = +this.value;
    total = (daysSum + personSum)*4000;
    
    if(restDays.value == '' || restDays.value == 0) { 
      totalValue.innerText = 0;
    } else {
      totalValue.textContent = total;
    }
  });

  place.addEventListener('input', function() {
    if (restDays.value == '' || restDays.value == '' ) {
      totalValue.innerText = 0;
    } else {
      let a = total; 
      totalValue.innerText = a * this.options[this.selectedIndex].value;
    }
  });
});
