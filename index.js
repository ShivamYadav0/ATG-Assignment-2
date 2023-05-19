gsap.registerPlugin(ScrollTrigger);
let dir = 0;
function colorChange(pel,id) {
  let root = document.querySelector(':root');
  let cs = getComputedStyle(root);
  let leftitem = document.querySelector('.'+pel+' .left');
  let rightitem = document.querySelector('.'+pel+' .right');
  let fixeditem = document.querySelector('.'+pel+' .svg-box');
  fixeditem.style.backgroundColor =cs.getPropertyValue('--lf'+id);
  leftitem.style.backgroundColor =cs.getPropertyValue('--lf'+id);
  rightitem.style.backgroundColor =cs.getPropertyValue('--rf'+id);
}
function show_next_hero_panel(newSection, index) {
  if (newSection !== currentSection) {
    let curdir = -1;
    if (index > dir) curdir = 1;
    dir = index;
    gsap.to(currentSection, { autoAlpha: 0, duration: 0.3 });
    gsap.to(newSection, { autoAlpha: 1, duration: 0.3 });
    let node =
      currentSection.childNodes[1].classList[
        currentSection.childNodes[1].classList.length - 1
      ];
    currentSection = newSection;
    // console.log(
    //   newSection.childNodes[1].classList[
    //     newSection.childNodes[1].classList.length - 1
    //   ]
    // );
    
    function slide (node,curdir){
      let els = document.querySelectorAll("." + node + " img");
      let elh1 = document.querySelectorAll("." + node + " h1");
      let elp = document.querySelectorAll("." + node + " p");
      
      //console.log(curdir);
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
    
      //console.log(node);
     slide(node,1)
     node =
      newSection.childNodes[1].classList[
        newSection.childNodes[1].classList.length - 1
      ];
      colorChange(node,index+1)
      slide(node,curdir)
    //
    const dots = document.querySelectorAll(".dots-nav");
    const dotIndex = Array.from(panels).indexOf(newSection);
    const desiredDot = dots[dotIndex];

    const dotPosition = desiredDot.getBoundingClientRect();
    const dotCenterX = dotPosition.left + dotPosition.width / 2;
    const dotCenterY = dotPosition.top + dotPosition.height / 2;

    const path = document.getElementById("Opaque_Ring");
    const pathLength = path.getTotalLength();
    const distance = (pathLength / dots.length) * (1 + dotIndex);
    console.log(dotIndex);
    
    let dvd = 9000;
    if(dotIndex==1){
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

const panels = gsap.utils.toArray(".main-wrapper__panel");

gsap.set(panels[0], { autoAlpha: 1 });
let currentSection = panels[0];

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
function animate(elem, direction) {
  // var direction = 0;
  var x = 0,
    y = direction * 100;
  x = 0;
  //   y = 0;
  // if(elem.classList.contains("gs_reveal_fromLeft")) {
  //   x = -100;
  //   y = 0;
  // } else if (elem.classList.contains("gs_reveal_fromRight")) {
  //   x = 100;
  //   y = 0;
  // }
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
