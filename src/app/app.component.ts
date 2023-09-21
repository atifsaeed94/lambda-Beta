//@ts-nocheck
import { Component, OnInit } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { SplitText } from 'gsap/SplitText';
import { SplitTextPlugin as SplitText } from 'gsap/SplitText';

import { CustomEase } from 'gsap/CustomEase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'lambda-Beta';
  ngOnInit() {
    gsap.registerPlugin(
      Observer,
      DrawSVGPlugin,
      MotionPathPlugin,
      ScrollTrigger,
      CustomEase
    );

// Define custom eases
CustomEase.create('yButterfly', '.17,.17,.43,1');
CustomEase.create('butterflyShow', '.17,.17,.46,1');
CustomEase.create('butterflyDown', '.53,0,.49,1');
CustomEase.create('butterflyUp', '.73,0,.41,1');
CustomEase.create('yButterflyDown', '.68,0,.43,1');
CustomEase.create('butterflyHide', '.68,0,0,1');
CustomEase.create('clip', '.57,0,.43,1');

// Initialize SplitText
initSplitText('.split');

// Animation logic
const sections = gsap.utils.toArray('.banner-slide');
const wrap = gsap.utils.wrap(0, sections.length);
const tree = document.querySelector('.banner-tree');
const wings = document.querySelector('.wings');

let currentIndex = 0;

const tlAnimation = gsap.timeline({
  defaults: { duration: 1.2 },
  scrollTrigger: {
    trigger: 'main',
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    onEnter: () => {
      const hoverActive = false;
    },
    onLeave: () => {
      window.scrollTo(0, 0);
    },
  },
});

function gotoSection(index :any) {
  index = wrap(index);

  const currentSection = sections[currentIndex];
  const textCurrent = currentSection.querySelectorAll('.fade-overflow');
  const nextSection = sections[index];
  const textNext = nextSection.querySelectorAll('.fade-overflow');

  tlAnimation
    .to(currentSection, {
      scale: 0.7,
      alpha: 0,
      ease: 'power0.easeIn',
    })
    .to(textCurrent, {
      y: -350,
      stagger: {
        each: 0.02,
        from: 'start',
      },
      ease: 'power0.easeIn',
    }, '<')
    .to(tree, {
      scale: index > 0 ? 2.4 : 1,
      yPercent: index > 0 ? 125 : 0,
      duration: 0.8,
    }, '<')
    .to(wings, {
      alpha: 0,
      duration: 0.8,
    }, '<')
    .fromTo(textNext, {
      y: 400,
    }, {
      y: 0,
      stagger: {
        each: 0.02,
        from: 'start',
      },
      ease: 'power1.easeOut',
    }, '<0.4')
    .fromTo([nextSection], {
      scale: 0.7,
      alpha: 0,
    }, {
      scale: 1,
      alpha: 1,
      ease: 'power1.easeOut',
    }, '<');

  currentIndex = index;
}

function treeAnimation() {
  tlAnimation
    .to('.banner-text', {
      y: '150%',
      alpha: 0,
      duration: 0.8,
    })
    .to(tree, {
      scale: 1,
      yPercent: 0,
      duration: 0.8,
    }, '<')
    .to(tree, {
      alpha: 0,
      duration: 0.4,
    }, '>-=0.15')
    .set('.tree svg', {
      display: 'block',
    }, '<-=0.1')
    .fromTo('.tree-svg__bottom', {
      drawSVG: '0%',
      strokeWidth: 33,
    }, {
      drawSVG: '100%',
      strokeWidth: 33,
      duration: 0.5,
    }, '<')
    .fromTo('.tree-svg__top', {
      drawSVG: '0%',
      strokeWidth: 33,
    }, {
      drawSVG: '100%',
      strokeWidth: 33,
      duration: 0.5,
    })
    .fromTo('.tree-svg__left', {
      drawSVG: '0%',
      strokeWidth: 33,
      rotate: '25deg',
      transformOrigin: 'bottom right',
    }, {
      drawSVG: '75%',
      strokeWidth: 33,
      rotate: '25deg',
      transformOrigin: 'bottom right',
      duration: 0.5,
    }, '<')
    .fromTo('.tree-svg__right', {
      drawSVG: '0%',
      strokeWidth: 33,
      rotate: '-25deg',
      transformOrigin: 'bottom left',
    }, {
      drawSVG: '75%',
      strokeWidth: 33,
      rotate: '-25deg',
      transformOrigin: 'bottom left',
      duration: 0.5,
    }, '<')
    .fromTo('.tree-svg__right-top', {
      drawSVG: '0%',
      strokeWidth: 33,
      rotate: '-13deg',
      transformOrigin: 'bottom left',
    }, {
      drawSVG: '85%',
      strokeWidth: 33,
      rotate: '-13deg',
      transformOrigin: 'bottom left',
      duration: 0.5,
    }, '<')
    .fromTo('.tree-svg__left-top', {
      drawSVG: '0%',
      strokeWidth: 33,
      rotate: '13deg',
      transformOrigin: 'bottom right',
    }, {
      drawSVG: '85%',
      strokeWidth: 33,
      rotate: '13deg',
      transformOrigin: 'bottom right',
      duration: 0.5,
    }, '<')
    .to('.tree-svg__branches', {
      drawSVG: '100%',
      strokeWidth: 3,
      rotate: '0',
      duration: 0.5,
    })
    .to('.tree-svg__bottom', {
      strokeWidth: 3,
      duration: 0.5,
    }, '<')
    .to('.tree-circle', {
      scale: 0.65,
      duration: 0.5,
    }, '<')
    .set('.tree-circle__big', {
      boxShadow: '0 0 0 200px var(--color-fat-tuesday)',
    }, '<')
    .to('.tree-circle__big', {
      boxShadow: '0 0 0 1px var(--color-fat-tuesday)',
      ease: 'power1.easeIn',
      duration: 0.5,

})
}}  
  
}

