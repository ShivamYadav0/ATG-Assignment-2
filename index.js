gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  toggleActions: "restart pause resume pause",
  scroller: ".container"
});

gsap.to(".orange p", {
  scrollTrigger: ".orange", 
  duration: 2, 
  repeat: -1, 
  rotation: 360
});

gsap.to(".red", {
  scrollTrigger: {
    trigger: ".red",
    toggleActions: "restart pause reverse pause"
  }, 
  duration: 1, 
  backgroundColor: "#FFA500", 
  ease: "none"
});

gsap.to(".yoyo p", {
  scrollTrigger: ".yoyo", 
  scale: 2, 
  repeat: -1, 
  yoyo: true, 
  ease: "power2"
});


// // Creating SVG and path elements and insert to DOM



// function getSinPath(options) {
//   var _options = options || {};
//   var _width = _options.width || window.innerWidth;
//   var _height = _options.height || window.innerHeight;
//   var _addWidth = _options.addWidth || 100;
//   var _controlSep = _options.controlSep || 50;
//   var _curves = _options.curves || 2;

//   var x = - _addWidth;
//   var y = _height / 2;
//   var amplitudeX = (_width + _addWidth * 2) / _curves;     // X distance among curve points
//   var amplitudeY = _height / 3;                            // Y distance between points and control points

//   var path = [];
//   path.push('M', x, y);
//   var alternateY = true;
//   var controlY;
//   for (var i = 0; i < _curves; i++) {
//       controlY = alternateY ? y - amplitudeY : y + amplitudeY;
//       if (i === 0) {
//           path.push('C', x + (amplitudeX / 2 - _controlSep), controlY);
//       } else {
//           path.push('S');
//       }
//       path.push(x + (amplitudeX / 2 + _controlSep), controlY);
//       path.push(x + amplitudeX, y);
//       x += amplitudeX;
//       alternateY = !alternateY;
//   }

//   return path.join(' ');
// }


// (function () {

//   // Creating SVG and path elements and insert to DOM

//   var svgNS = 'http://www.w3.org/2000/svg';
//   var svgEl = document.createElementNS(svgNS, 'svg');

//   var pathEl = document.createElementNS(svgNS, 'path');
//   // The `getSinPath` function return the `path` in String format
//   pathEl.setAttribute('d', getSinPath());
//   pathEl.setAttribute('class', 'path-slider__path');

//   svgEl.appendChild(pathEl);
//   document.body.appendChild(svgEl);


//   // Changing `background-image`
//   // Firstly, saving the computed `background` of each item, as these are defined in CSS
//   // When item is selected, the `background` is set accordingly

//   var items = document.querySelectorAll('.path-slider__item');
//   var images = [];
//   for (var j = 0; j < items.length; j++) {
//       images.push(getComputedStyle(items[j].querySelector('.item__circle')).getPropertyValue('background-image'));
//   }

//   var imgAnimation;
//   var lastIndex;
//   var setImage = function (index) {
//       if (imgAnimation) {
//           imgAnimation.pause();
//           sliderContainer.style['background-image'] = images[lastIndex];
//           sliderContainerBackground.style['opacity'] = 0;
//       }
//       lastIndex = index;
//       sliderContainerBackground.style['background-image'] = images[index];
//       imgAnimation = anime({
//           targets: sliderContainerBackground,
//           opacity: 1,
//           easing: 'linear'
//       });
//   };


//   // Adding the extra element needed to fade the images smoothly
//   // Also set the image for the initial current item (the first one)

//   var sliderContainer = document.querySelector('.path-slider');
//   var sliderContainerBackground = document.createElement('div');
//   sliderContainerBackground.setAttribute('class', 'path-slider__background');
//   setImage(0);
//   sliderContainer.appendChild(sliderContainerBackground);


//   // Initializing the slider

//   var options = {
//       startLength: 'center',
//       paddingSeparation: 100,
//       easing: 'easeOutCubic',
//       begin: function (params) {
//           // Item get selected, then set the `background` accordingly
//           if (params.selected) {
//               setImage(params.index);
//           }
//       }
//   };

//   var slider = new PathSlider(pathEl, '.path-slider__item', options);


//   // Regenerate the SVG `path` and update items position on `resize` event (responsive behavior)

//   window.addEventListener('resize', function() {
//       pathEl.setAttribute('d', getSinPath());
//       slider.updatePositions();
//   });

// })();


// // // Wait for the document to be ready
// // document.addEventListener('DOMContentLoaded', function () {
// //   // Get the SVG and image elements
// //   const svg = document.getElementById('transring');
// //   const images = document.querySelectorAll('.scroll-image');

// //   // Create a timeline for the scroll animations
// //   const timeline = gsap.timeline();

// //   // Animate the SVG path
// //   timeline.fromTo(
// //     '.transrgwht',
// //     { strokeDashoffset: 1000 },
// //     { strokeDashoffset: 0, duration: 1, ease: 'power1.inOut' }
// //   );

// //   // Animate the images
// //   images.forEach(function (image) {
// //     timeline.fromTo(
// //       image,
// //       { opacity: 0, y: 20 },
// //       { opacity: 1, y: 0, duration: 0.5, ease: 'power1.out', delay: 0.5, stagger: 0.2 }
// //     );
// //   });

// //   // Add scroll trigger to start the animation
// //   gsap.to(svg, {
// //     scrollTrigger: {
// //       trigger: svg,
// //       start: 'top center',
// //       end: 'bottom center',
// //       scrub: true,
// //     },
// //     opacity: 1,
// //     duration: 0.5,
// //     ease: 'power1.inOut',
// //     onComplete: function () {
// //       timeline.play();
// //     },
// //   });

// //   // Add scroll trigger to reveal the images
// //   gsap.to(images, {
// //     scrollTrigger: {
// //       trigger: images,
// //       start: 'top 80%',
// //       end: 'bottom center',
// //       scrub: true,
// //     },
// //     visibility: 'visible',
// //     delay: 0.2,
// //   });
// // });


















// // // let logbt = document.querySelector("#login-bt");

// // // let signbt = document.querySelector("#sign-bt");
// // // function login() {
// // //   let nodeList = document.querySelectorAll(".sign").forEach((e) => {
// // //     e.style.display = "block";
// // //   });

// // //   document.querySelectorAll(".login").forEach((e) => {
// // //     e.style.display = "none";
// // //   });
// // // }
// // // function signup() {
// // //   document.querySelectorAll(".login").forEach((e) => {
// // //     e.style.display = "block";
// // //   });
// // //   document.querySelectorAll(".sign").forEach((e) => {
// // //     e.style.display = "none";
// // //   });
// // // }

// // // logbt.onclick = () => {
// // //   login();
// // // };
// // // signbt.onclick = () => {
// // //   signup();
// // // };
// // // let authbtn_mobile = document.querySelector(".mobile-auth-btn");
// // // let modal_cut = document.querySelector(".modal");
// // // let bts = document.querySelector(".bts");
// // // modal_cut.onclick = () => {
// // //   bts.classList.toggle(".modal-cut");
// // // };
// // // bts.onclick = () => {
// // //   bts.classList.toggle(".modal-cut");
// // // };
// // // authbtn_mobile.addEventListener("click", function (e) {
// // //   //  alert(this.textContent);
// // //   let s = this.textContent;
// // //   if (s.includes("create")) {
// // //     this.textContent = "or, sign in";
// // //     login();
// // //   } else {
// // //     this.textContent = "or, create account";
// // //     signup();
// // //   }
// // // });

// // // // body.onresize = () => {

// // // // };

// // // let observe = document.querySelector("#resizable");
// // // function outputsize() {
// // //   //console.log(observe.offsetWidth, observe.offsetHeight);
// // //   // document.querySelector(".title").textContent = observe.offsetWidth;
// // //   //window.res(observe.offsetWidth, observe.offsetHeight);
// // // }
// // // outputsize();

// // // new ResizeObserver(outputsize).observe(observe);
