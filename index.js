gsap.registerPlugin(ScrollTrigger);

let dir = 0;
let currentSection;
let node;

const panels = gsap.utils.toArray(".main-wrapper__panel");

// Function to change color
function colorChange(pel, id) {
  let root = document.querySelector(":root");
  let cs = getComputedStyle(root);
  let leftitem = document.querySelector("." + pel + " .left");
  let rightitem = document.querySelector("." + pel + " .right");
  let fixeditem = document.querySelector("." + pel + " .svg-box");
  fixeditem.style.backgroundColor = cs.getPropertyValue("--lf" + id);
  leftitem.style.backgroundColor = cs.getPropertyValue("--lf" + id);
  rightitem.style.backgroundColor = cs.getPropertyValue("--rf" + id);
}

// Function to animate elements
function animate(elem, direction) {
  var x = 0
  if(elem.classList.contains("img-slide-2")){
   direction = -direction;
  }
  var y = direction * 100;
  x = 0;

  elem.style.transform = "translate(" + x + "px, " + y + "px)";
  elem.style.opacity = "0";

  gsap.fromTo(
    elem,
    { x: x, y: y, autoAlpha: 0 },
    {
      duration: 1.25,
      x: 0,
      y: 0,
      autoAlpha: 1,
      ease: "expo",
      overwrite: "auto",
    }
  );
}

// Function to animate elements in a section
function slide(node, curdir) {
  let els = document.querySelectorAll("." + node + " img");
  let elh1 = document.querySelectorAll("." + node + " h1");
  let elp = document.querySelectorAll("." + node + " p");

  elh1.forEach((obj, i) => {
    animate(obj, curdir);
  });
  elp.forEach((obj, i) => {
    animate(obj, curdir);
  });
  els.forEach((obj, i) => {
    animate(obj, curdir);
  });
}

// Function to show the next hero panel
function show_next_hero_panel(newSection, index) {
 // console.log(((index - 0.5) * innerHeight) / 1.4);
  if (newSection !== currentSection) {
    let curdir = -1;
    if (index > dir) curdir = 1;
    dir = index;
    gsap.to(currentSection, { autoAlpha: 0, duration: 0.3 });
    gsap.to(newSection, { autoAlpha: 1, duration: 0.4 });

    currentSection = newSection;
    node =
      newSection.childNodes[1].classList[
        newSection.childNodes[1].classList.length - 1
      ];
    colorChange(node, index + 1);
    slide(node, curdir);
    //const client = node.getBoundingClientRect();

    const dotIndex = Array.from(panels).indexOf(newSection);

    const path = document.getElementById("Opaque_Ring");
    const pathLength = path.getTotalLength();

    let dvd = 9000;
    if (dotIndex == 1) {
      dvd = 6;
    }
    if (dotIndex == 2) {
      dvd = 3;
    }
    if (dotIndex == 3) {
      dvd = 2;
    }
    if (dotIndex == 4) {
      dvd = 1.5;
    }
    if (dotIndex == 5) {
      dvd = 1.2;
    }
    if (dotIndex == 6) {
      dvd = 1;
    }

    gsap.to(path, {
      strokeDasharray: pathLength / dvd,
      strokeDashoffset: 0,
      duration: 1,
    });
  }
}

gsap.set(panels[0], { autoAlpha: 1 });
currentSection = panels[0];
node =
  currentSection.childNodes[1].classList[
    currentSection.childNodes[1].classList.length - 1
  ];

ScrollTrigger.create({
  trigger: ".main-wrapper__panel-wrapper",
  start: () => "top top",
  end: () => "+=" + ((panels.length - 1) * innerHeight) / 1.4,
  pin: true,
});

panels.forEach((panel, i) => {
  ScrollTrigger.create({
    trigger: ".main-wrapper",
    start: () => "top top-=" + ((i - 0.5) * innerHeight) / 1.4,
    end: () => "+=" + innerHeight / 1.4,

    onToggle: (self) => self.isActive && show_next_hero_panel(panel, i),
  });
});

// // Add a scroll event listener to the window
// window.addEventListener("scroll", handleScroll);

// // Define the scroll event handler function
// function handleScroll() {
//   // Get the current scroll position of the window
//   const scrollPosition = window.scrollY;

//   // Perform your desired actions based on the scroll position
//   // For example, if the scroll position is greater than 500 pixels, trigger an event
//   if (scrollPosition > 1000) {
//     if (scrollPosition >= 1113) console.log("obs", scrollPosition);
//     // Trigger your event or perform actions here
//     // console.log('Scroll position is greater than 500 pixels');
//   }
// }
// let tl = gsap.timeline({
//   scrollTrigger: {
//     trigger: ".container",
//     pin: true,
//     start: "center center",
//     end: "+=900",
//     scrub: 1,
//   }
// });

// // add animations and labels to the timeline
// tl.addLabel("start")
//   .staggerTo(".box .f2-1 , .box .f2-2", 3,{delay: 1,transform: function(i) {
//     let ch=(i==1?'-':'')
//     return 'translateY(' +ch +'30%)'
// }, ease:Power3.easeInOut}, 0.1)
//   .addLabel("end")
//   .staggerTo(".box .f3-1 , .box .f3-2", 3, {delay: 9,transform: function(i) {
//     let ch=(i==1?'-':'')
//     return 'translateY(' +ch +'30%)'
// }, ease:Power3.easeInOut}, 0.1)

//   // let tl2 = gsap.timeline({
//   //   scrollTrigger: {
//   //     trigger: ".container2",
//   //     pin: true,
//   //     start: "center center",
//   //     end: "+=500",
//   //     scrub: 1,
     
//   //     onSnapComplete: () => console.log(tl.currentLabel())
//   //   }
//   // });
  
//   // // add animations and labels to the timeline
//   // tl2.addLabel("start")
//   //   .staggerTo(".box2 .f3-1 , .box2 .f3-2", 1, {transform: function(i) {
//   //     let ch=(i==1?'-':'')
//   //     return 'translateY(' +ch +'50%)'
//   // }, ease:Power3.easeInOut}, 0.15, "frame1+=0.6")
//   //   .addLabel("end");
  


//   //  snap: {
//   //   snapTo: "labels", // snap to the closest label in the timeline
//   //   duration: { min: 0.2, max: 3 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
//   //   delay: 0.1, // wait 0.1 seconds from the last scroll event before doing the snapping
//   //   ease: "power1.inOut" // the ease of the snap animation ("power3" by default)
//   // },
//   // markers: true,