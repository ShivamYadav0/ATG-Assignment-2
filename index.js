window.addEventListener("load", () => {
  ScrollSmoother.get().scrollTop(window.pageYOffset);
  window.history.scrollRestoration = "auto";
});

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
function animate(elem, direction, ind) {
  var x = 0;
  if (elem.classList.contains("img-slide-2")) {
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
function slide(node, curdir, ind) {
  let els = document.querySelectorAll("." + node + " img");
  let elh1 = document.querySelectorAll("." + node + " h1");
  let elp = document.querySelectorAll("." + node + " p");

  elh1.forEach((obj, i) => {
    animate(obj, curdir, ind);
  });
  elp.forEach((obj, i) => {
    animate(obj, curdir, ind);
  });
  if(ind==6){
    els.forEach((obj, i) => {
      animate(obj, curdir, ind);
    });
    //animate(els, curdir, ind);
  }
  
  // els.forEach((obj, i) => {
  //   animate(obj, curdir, ind);
  // });
}

// Function to show the next hero panel
function show_next_hero_panel(newSection, index) {
  if (newSection !== currentSection) {
    let curdir = -1;
    if (index > dir) curdir = 1;
    dir = index;
    gsap.to(currentSection, {
      autoAlpha: 0,
      duration: 0.3,
      ease: "power1.inOut",
    });
    gsap.to(newSection, { autoAlpha: 1, duration: 0.4, ease: "power1.inOut" });

    currentSection = newSection;
    node =
      newSection.childNodes[1].classList[
        newSection.childNodes[1].classList.length - 1
      ];
    colorChange(node, index + 1);
    slide(node, curdir, index);
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
for (let i = 1; i <= panels.length; i++) {
  let delayed = i;
  if (i == 1) delayed = i;
  if (i != 6 && i != 7) {
    gsap.to(`.f${i} .img-slide-2`, {
      y: 100,
      duration: 0.8,
      scrollTrigger: {
        trigger: () => `.f${i}`,
        start: () => "top top-=" + ((delayed - 1 - 0.5) * innerHeight) / 1.34,
        end: () => "+=100%",
        scrub: 0.5,
      },
    });
  }
  if(i!=7)
  gsap.to(`.f${i} .img-slide`, {
    y: -100,
    duration: 0.8,
    scrollTrigger: {
      trigger: () => `.f${i}`,
      start: () => "top top-=" + ((i - 1 - 0.5) * innerHeight) / 1.34,
      end: () => "+=100%",
      scrub: 0.5,
    },
  });
}

panels.forEach((panel, i) => {
  ScrollTrigger.create({
    trigger: ".main-wrapper",
    start: () => "top top-=" + ((i - 0.5) * innerHeight) / 1.4,
    end: () => "+=" + innerHeight / 1.4,
    scrub: 1,
    //onUpdate: (self) => console.log(self),
    onToggle: (self) => self.isActive && show_next_hero_panel(panel, i),
  });
});

console.clear();
