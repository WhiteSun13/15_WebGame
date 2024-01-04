let root = document.documentElement;
var board = document.getElementById('board');
var banner = document.getElementById("myBanner");
var info = document.getElementById("info");
var pg = document.getElementById("playGround");
var winSound = new Audio('Win.mp3');

var timer = document.getElementById('current-time');
var recordTime = document.getElementById('record-time');
var startTime;
var updateTime;
var recordTimes = {};

// Загружаем рекордное время из LocalStorage
if(localStorage.getItem('recordTimes')) {
    recordTimes = JSON.parse(localStorage.getItem('recordTimes'));
}

var Color2 = '36005F'
var Color4 = '00125F'
var BG = [["url(\"data:image/svg+xml,%3Csvg width='24' height='40' viewBox='0 0 24 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40c5.523 0 10-4.477 10-10V0C4.477 0 0 4.477 0 10v30zm22 0c-5.523 0-10-4.477-10-10V0c5.523 0 10 4.477 10 10v30z' fill='%23", "' fill-opacity='0.75' fill-rule='evenodd'/%3E%3C/svg%3E\")"],
["url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='18' viewBox='0 0 100 18'%3E%3Cpath fill='%23","' fill-opacity='0.75' d='M61.82 18c3.47-1.45 6.86-3.78 11.3-7.34C78 6.76 80.34 5.1 83.87 3.42 88.56 1.16 93.75 0 100 0v6.16C98.76 6.05 97.43 6 96 6c-9.59 0-14.23 2.23-23.13 9.34-1.28 1.03-2.39 1.9-3.4 2.66h-7.65zm-23.64 0H22.52c-1-.76-2.1-1.63-3.4-2.66C11.57 9.3 7.08 6.78 0 6.16V0c6.25 0 11.44 1.16 16.14 3.42 3.53 1.7 5.87 3.35 10.73 7.24 4.45 3.56 7.84 5.9 11.31 7.34zM61.82 0h7.66a39.57 39.57 0 0 1-7.34 4.58C57.44 6.84 52.25 8 46 8S34.56 6.84 29.86 4.58A39.57 39.57 0 0 1 22.52 0h15.66C41.65 1.44 45.21 2 50 2c4.8 0 8.35-.56 11.82-2z'%3E%3C/path%3E%3C/svg%3E\")"],
["url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='hexagons' fill='%23","' fill-opacity='0.75' fill-rule='nonzero'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"],
["url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='96' viewBox='0 0 60 96'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23","' fill-opacity='0.75'%3E%3Cpath d='M36 10a6 6 0 0 1 12 0v12a6 6 0 0 1-6 6 6 6 0 0 0-6 6 6 6 0 0 1-12 0 6 6 0 0 0-6-6 6 6 0 0 1-6-6V10a6 6 0 1 1 12 0 6 6 0 0 0 12 0zm24 78a6 6 0 0 1-6-6 6 6 0 0 0-6-6 6 6 0 0 1-6-6V58a6 6 0 1 1 12 0 6 6 0 0 0 6 6v24zM0 88V64a6 6 0 0 0 6-6 6 6 0 0 1 12 0v12a6 6 0 0 1-6 6 6 6 0 0 0-6 6 6 6 0 0 1-6 6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"],
["url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 304 304' width='304' height='304'%3E%3Cpath fill='%23","' fill-opacity='0.68' d='M44.1 224a5 5 0 1 1 0 2H0v-2h44.1zm160 48a5 5 0 1 1 0 2H82v-2h122.1zm57.8-46a5 5 0 1 1 0-2H304v2h-42.1zm0 16a5 5 0 1 1 0-2H304v2h-42.1zm6.2-114a5 5 0 1 1 0 2h-86.2a5 5 0 1 1 0-2h86.2zm-256-48a5 5 0 1 1 0 2H0v-2h12.1zm185.8 34a5 5 0 1 1 0-2h86.2a5 5 0 1 1 0 2h-86.2zM258 12.1a5 5 0 1 1-2 0V0h2v12.1zm-64 208a5 5 0 1 1-2 0v-54.2a5 5 0 1 1 2 0v54.2zm48-198.2V80h62v2h-64V21.9a5 5 0 1 1 2 0zm16 16V64h46v2h-48V37.9a5 5 0 1 1 2 0zm-128 96V208h16v12.1a5 5 0 1 1-2 0V210h-16v-76.1a5 5 0 1 1 2 0zm-5.9-21.9a5 5 0 1 1 0 2H114v48H85.9a5 5 0 1 1 0-2H112v-48h12.1zm-6.2 130a5 5 0 1 1 0-2H176v-74.1a5 5 0 1 1 2 0V242h-60.1zm-16-64a5 5 0 1 1 0-2H114v48h10.1a5 5 0 1 1 0 2H112v-48h-10.1zM66 284.1a5 5 0 1 1-2 0V274H50v30h-2v-32h18v12.1zM236.1 176a5 5 0 1 1 0 2H226v94h48v32h-2v-30h-48v-98h12.1zm25.8-30a5 5 0 1 1 0-2H274v44.1a5 5 0 1 1-2 0V146h-10.1zm-64 96a5 5 0 1 1 0-2H208v-80h16v-14h-42.1a5 5 0 1 1 0-2H226v18h-16v80h-12.1zm86.2-210a5 5 0 1 1 0 2H272V0h2v32h10.1zM98 101.9V146H53.9a5 5 0 1 1 0-2H96v-42.1a5 5 0 1 1 2 0zM53.9 34a5 5 0 1 1 0-2H80V0h2v34H53.9zm60.1 3.9V66H82v64H69.9a5 5 0 1 1 0-2H80V64h32V37.9a5 5 0 1 1 2 0zM101.9 82a5 5 0 1 1 0-2H128V37.9a5 5 0 1 1 2 0V82h-28.1zm16-64a5 5 0 1 1 0-2H146v44.1a5 5 0 1 1-2 0V18h-26.1zm102.2 270a5 5 0 1 1 0 2H98v14h-2v-16h124.1zM242 149.9V160h16v34h-16v62h48v48h-2v-46h-48v-66h16v-30h-16v-12.1a5 5 0 1 1 2 0zM53.9 18a5 5 0 1 1 0-2H64V2H48V0h18v18H53.9zm112 32a5 5 0 1 1 0-2H192V0h50v2h-48v48h-28.1zm-48-48a5 5 0 0 1-9.8-2h2.07a3 3 0 1 0 5.66 0H178v34h-18V21.9a5 5 0 1 1 2 0V32h14V2h-58.1zm0 96a5 5 0 1 1 0-2H137l32-32h39V21.9a5 5 0 1 1 2 0V66h-40.17l-32 32H117.9zm28.1 90.1a5 5 0 1 1-2 0v-76.51L175.59 80H224V21.9a5 5 0 1 1 2 0V82h-49.59L146 112.41v75.69zm16 32a5 5 0 1 1-2 0v-99.51L184.59 96H300.1a5 5 0 0 1 3.9-3.9v2.07a3 3 0 0 0 0 5.66v2.07a5 5 0 0 1-3.9-3.9H185.41L162 121.41v98.69zm-144-64a5 5 0 1 1-2 0v-3.51l48-48V48h32V0h2v50H66v55.41l-48 48v2.69zM50 53.9v43.51l-48 48V208h26.1a5 5 0 1 1 0 2H0v-65.41l48-48V53.9a5 5 0 1 1 2 0zm-16 16V89.41l-34 34v-2.82l32-32V69.9a5 5 0 1 1 2 0zM12.1 32a5 5 0 1 1 0 2H9.41L0 43.41V40.6L8.59 32h3.51zm265.8 18a5 5 0 1 1 0-2h18.69l7.41-7.41v2.82L297.41 50H277.9zm-16 160a5 5 0 1 1 0-2H288v-71.41l16-16v2.82l-14 14V210h-28.1zm-208 32a5 5 0 1 1 0-2H64v-22.59L40.59 194H21.9a5 5 0 1 1 0-2H41.41L66 216.59V242H53.9zm150.2 14a5 5 0 1 1 0 2H96v-56.6L56.6 162H37.9a5 5 0 1 1 0-2h19.5L98 200.6V256h106.1zm-150.2 2a5 5 0 1 1 0-2H80v-46.59L48.59 178H21.9a5 5 0 1 1 0-2H49.41L82 208.59V258H53.9zM34 39.8v1.61L9.41 66H0v-2h8.59L32 40.59V0h2v39.8zM2 300.1a5 5 0 0 1 3.9 3.9H3.83A3 3 0 0 0 0 302.17V256h18v48h-2v-46H2v42.1zM34 241v63h-2v-62H0v-2h34v1zM17 18H0v-2h16V0h2v18h-1zm273-2h14v2h-16V0h2v16zm-32 273v15h-2v-14h-14v14h-2v-16h18v1zM0 92.1A5.02 5.02 0 0 1 6 97a5 5 0 0 1-6 4.9v-2.07a3 3 0 1 0 0-5.66V92.1zM80 272h2v32h-2v-32zm37.9 32h-2.07a3 3 0 0 0-5.66 0h-2.07a5 5 0 0 1 9.8 0zM5.9 0A5.02 5.02 0 0 1 0 5.9V3.83A3 3 0 0 0 3.83 0H5.9zm294.2 0h2.07A3 3 0 0 0 304 3.83V5.9a5 5 0 0 1-3.9-5.9zm3.9 300.1v2.07a3 3 0 0 0-1.83 1.83h-2.07a5 5 0 0 1 3.9-3.9zM97 100a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-48 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 96a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-144a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-96 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm96 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-32 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM49 36a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-32 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM33 68a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 240a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm80-176a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm112 176a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 180a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 84a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'%3E%3C/path%3E%3C/svg%3E\")"],
["url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cg fill='%23","' fill-opacity='0.75'%3E%3Cpolygon fill-rule='evenodd' points='8 4 12 6 8 8 6 12 4 8 0 6 4 4 6 0 8 4'/%3E%3C/g%3E%3C/svg%3E\")"],
["url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23","' fill-opacity='0.75' fill-rule='evenodd'/%3E%3C/svg%3E\")"],
["url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 40' width='80' height='40'%3E%3Cpath fill='%23","' fill-opacity='0.75' d='M0 40a19.96 19.96 0 0 1 5.9-14.11 20.17 20.17 0 0 1 19.44-5.2A20 20 0 0 1 20.2 40H0zM65.32.75A20.02 20.02 0 0 1 40.8 25.26 20.02 20.02 0 0 1 65.32.76zM.07 0h20.1l-.08.07A20.02 20.02 0 0 1 .75 5.25 20.08 20.08 0 0 1 .07 0zm1.94 40h2.53l4.26-4.24v-9.78A17.96 17.96 0 0 0 2 40zm5.38 0h9.8a17.98 17.98 0 0 0 6.67-16.42L7.4 40zm3.43-15.42v9.17l11.62-11.59c-3.97-.5-8.08.3-11.62 2.42zm32.86-.78A18 18 0 0 0 63.85 3.63L43.68 23.8zm7.2-19.17v9.15L62.43 2.22c-3.96-.5-8.05.3-11.57 2.4zm-3.49 2.72c-4.1 4.1-5.81 9.69-5.13 15.03l6.61-6.6V6.02c-.51.41-1 .85-1.48 1.33zM17.18 0H7.42L3.64 3.78A18 18 0 0 0 17.18 0zM2.08 0c-.01.8.04 1.58.14 2.37L4.59 0H2.07z'%3E%3C/path%3E%3C/svg%3E\")"],
["url(\"data:image/svg+xml,%3Csvg width='180' height='180' viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M81.28 88H68.413l19.298 19.298L81.28 88zm2.107 0h13.226L90 107.838 83.387 88zm15.334 0h12.866l-19.298 19.298L98.72 88zm-32.927-2.207L73.586 78h32.827l.5.5 7.294 7.293L115.414 87l-24.707 24.707-.707.707L64.586 87l1.207-1.207zm2.62.207L74 80.414 79.586 86H68.414zm16 0L90 80.414 95.586 86H84.414zm16 0L106 80.414 111.586 86h-11.172zm-8-6h11.173L98 85.586 92.414 80zM82 85.586L87.586 80H76.414L82 85.586zM17.414 0L.707 16.707 0 17.414V0h17.414zM4.28 0L0 12.838V0h4.28zm10.306 0L2.288 12.298 6.388 0h8.198zM180 17.414L162.586 0H180v17.414zM165.414 0l12.298 12.298L173.612 0h-8.198zM180 12.838L175.72 0H180v12.838zM0 163h16.413l.5.5 7.294 7.293L25.414 172l-8 8H0v-17zm0 10h6.613l-2.334 7H0v-7zm14.586 7l7-7H8.72l-2.333 7h8.2zM0 165.414L5.586 171H0v-5.586zM10.414 171L16 165.414 21.586 171H10.414zm-8-6h11.172L8 170.586 2.414 165zM180 163h-16.413l-7.794 7.793-1.207 1.207 8 8H180v-17zm-14.586 17l-7-7h12.865l2.333 7h-8.2zM180 173h-6.613l2.334 7H180v-7zm-21.586-2l5.586-5.586 5.586 5.586h-11.172zM180 165.414L174.414 171H180v-5.586zm-8 5.172l5.586-5.586h-11.172l5.586 5.586zM152.933 25.653l1.414 1.414-33.94 33.942-1.416-1.416 33.943-33.94zm1.414 127.28l-1.414 1.414-33.942-33.94 1.416-1.416 33.94 33.943zm-127.28 1.414l-1.414-1.414 33.94-33.942 1.416 1.416-33.943 33.94zm-1.414-127.28l1.414-1.414 33.942 33.94-1.416 1.416-33.94-33.943zM0 85c2.21 0 4 1.79 4 4s-1.79 4-4 4v-8zm180 0c-2.21 0-4 1.79-4 4s1.79 4 4 4v-8zM94 0c0 2.21-1.79 4-4 4s-4-1.79-4-4h8zm0 180c0-2.21-1.79-4-4-4s-4 1.79-4 4h8z' fill='%23","' fill-opacity='0.75' fill-rule='evenodd'/%3E%3C/svg%3E\")"],
["url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%23","' fill-opacity='0.75'%3E%3Cpath fill-rule='evenodd' d='M11 0l5 20H6l5-20zm42 31a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM0 72h40v4H0v-4zm0-8h31v4H0v-4zm20-16h20v4H20v-4zM0 56h40v4H0v-4zm63-25a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM53 41a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-30 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-28-8a5 5 0 0 0-10 0h10zm10 0a5 5 0 0 1-10 0h10zM56 5a5 5 0 0 0-10 0h10zm10 0a5 5 0 0 1-10 0h10zm-3 46a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM21 0l5 20H16l5-20zm43 64v-4h-4v4h-4v4h4v4h4v-4h4v-4h-4zM36 13h4v4h-4v-4zm4 4h4v4h-4v-4zm-4 4h4v4h-4v-4zm8-8h4v4h-4v-4z'/%3E%3C/g%3E%3C/svg%3E\")"],
["url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='152' height='152' viewBox='0 0 152 152'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='temple' fill='%23","' fill-opacity='0.75'%3E%3Cpath d='M152 150v2H0v-2h28v-8H8v-20H0v-2h8V80h42v20h20v42H30v8h90v-8H80v-42h20V80h42v40h8V30h-8v40h-42V50H80V8h40V0h2v8h20v20h8V0h2v150zm-2 0v-28h-8v20h-20v8h28zM82 30v18h18V30H82zm20 18h20v20h18V30h-20V10H82v18h20v20zm0 2v18h18V50h-18zm20-22h18V10h-18v18zm-54 92v-18H50v18h18zm-20-18H28V82H10v38h20v20h38v-18H48v-20zm0-2V82H30v18h18zm-20 22H10v18h18v-18zm54 0v18h38v-20h20V82h-18v20h-20v20H82zm18-20H82v18h18v-18zm2-2h18V82h-18v18zm20 40v-18h18v18h-18zM30 0h-2v8H8v20H0v2h8v40h42V50h20V8H30V0zm20 48h18V30H50v18zm18-20H48v20H28v20H10V30h20V10h38v18zM30 50h18v18H30V50zm-2-40H10v18h18V10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"]]


var tiles = [];
var empty = {x: 3, y: 3};
let Gn = 4;
let size = 17;
let numStyle = 1;
let bgn = 2
let bgTile = 1
let textSize = "5vmin"
let textVpos = "center"
let textHpos = "center"
let special = 0

var inGame = false;
var firstMove = false;

document.body.style.backgroundImage = BG[bgn][0] + Color4 + BG[bgn][1];
updateRecordTime();
startGame();


// Получите все радио-кнопки
let radioDifficult = document.querySelectorAll('input[name=difficult]');
let radioNums = document.querySelectorAll('input[name=numStyle]');
let radioPT = document.querySelectorAll('input[name=patternTile]');
let radioPBG = document.querySelectorAll('input[name=patternBG]');
let radioTxtSize = document.querySelectorAll('input[name=TxtSize]');
let radioTxtVpos = document.querySelectorAll('input[name=TxtVpos]');
let radioTxtHpos = document.querySelectorAll('input[name=TxtHpos]');
let radioSpecial = document.querySelectorAll('input[name=special]');

// Добавьте обработчик событий для каждой радио-кнопки
for (let i = 0; i < radioSpecial.length; i++) {
    radioSpecial[i].addEventListener('change', function() {
        special = this.value;
        updateRecordTime();
        clearBoard();
        startGame();
    });
}

for (let i = 0; i < radioDifficult.length; i++) {
    radioDifficult[i].addEventListener('change', function() {
        Gn = this.value;
        updateRecordTime();
        clearBoard();
        startGame();
    });
}

for (let i = 0; i < radioNums.length; i++) {
    radioNums[i].addEventListener('change', function() {
        numStyle = this.value;
        updateRecordTime();
        clearBoard();
        startGame();
    });
}

for (let i = 0; i < radioPT.length; i++) {
    radioPT[i].addEventListener('change', function() {
        bgTile = this.value;
        clearBoard();
        startGame();
    });
}

for (let i = 0; i < radioTxtSize.length; i++) {
    radioTxtSize[i].addEventListener('change', function() {
        textSize = this.value;
        clearBoard();
        startGame();
    });
}

for (let i = 0; i < radioTxtVpos.length; i++) {
    radioTxtVpos[i].addEventListener('change', function() {
        textVpos = this.value;
        clearBoard();
        startGame();
    });
}

for (let i = 0; i < radioTxtHpos.length; i++) {
    radioTxtHpos[i].addEventListener('change', function() {
        textHpos = this.value;
        clearBoard();
        startGame();
    });
}

for (let i = 0; i < radioPBG.length; i++) {
    radioPBG[i].addEventListener('change', function() {
        bgn = this.value;
        document.body.style.backgroundImage = BG[bgn][0] + Color4 + BG[bgn][1];
    });
}

function clearBoard() {
    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }
}

function startGame(){
    let colorSpectrum = generateColorSpectrum(Gn*Gn);
    switch (Gn) {
        case '3':
            size = 17;
            break;
        case '4':
            size = 17;
            break;
        case '5':
            size = 15;
            break;
        case '6':
            size = 14;
            break;
        default:
    }
    tiles = [];
    empty = {x: Gn-1, y: Gn-1};
    board.style.height = Gn * size + 'vmin';
    board.style.width = Gn * size +'vmin';
    for(var i = 0; i < (Gn*Gn-1); i++) {
        var tile = document.createElement('div');
        tile.className = 'tile';
        tile.id = (i + 1);
        if (special != 2){
            if (numStyle == 1) tile.innerHTML = (i + 1);
            if (numStyle == 2) tile.innerHTML = dec2bin(i + 1);
            if (numStyle == 3) tile.innerHTML = (i + 1).toString(8);
            if (numStyle == 4) tile.innerHTML = (i + 1).toString(16);
            if (numStyle == 5) tile.innerHTML = toChineseNumber(i + 1);
        }
        
        if (special == 0) tile.style.backgroundImage = BG[bgTile][0] + Color2 + BG[bgTile][1];
        if (special == 1){
            tile.style.backgroundImage = "url('Cats/cat" + (i+1) +".jpg')";
            tile.style.backgroundSize = "cover";
        }
        if (special == 2){
            tile.style.background = colorSpectrum[i];
        }

        tile.style.fontSize = textSize;
        tile.style.alignItems = textVpos;
        tile.style.justifyContent = textHpos;
        tile.x = i % Gn;
        tile.y = Math.floor(i / Gn);
        tile.style.left = tile.x * Gn * size/Gn + 'vmin'; /* Use vmin for positioning */
        tile.style.top = tile.y * Gn * size/Gn + 'vmin'; /* Use vmin for positioning */
        tile.style.width = 'calc(100% / ' + Gn + ' - 2vmin)'; /* Use vmin for sizing */
        tile.style.height = 'calc(100% / ' + Gn + ' - 2vmin)'; /* Use vmin for sizing */
        tile.onclick = function() {
            if (!inGame) return;
            if (!firstMove) {startTimer(); firstMove = true; info.classList.add("hide");}
            if((this.x == empty.x && Math.abs(this.y - empty.y) == 1) || 
            (this.y == empty.y && Math.abs(this.x - empty.x) == 1)) {
                var x = this.x, y = this.y;
                this.x = empty.x;
                this.y = empty.y;
                this.style.left = this.x * Gn * size/Gn + 'vmin'; /* Use vmin for positioning */
                this.style.top = this.y * Gn * size/Gn + 'vmin'; /* Use vmin for positioning */
                empty = {x: x, y: y};
                console.log(this.startX, this.startY, this.x, this.y);
            }
            var win = tiles.every(function(tile) {
                return tile.x == tile.startX && tile.y == tile.startY;
            });
            if(win){stopTimer(true); createConfetti(); winSound.play(); inGame = false;} 
        };
        tile.startX = tile.x;
        tile.startY = tile.y;
        tiles.push(tile);
        board.appendChild(tile);
    }
}


function isSolvable(tiles) {
    let invCount = 0;
    for (let i = 0; i < Gn * Gn - 1; i++) {
        for (let j = i + 1; j < Gn * Gn; j++) {
            if (tiles[j] !== undefined && tiles[i] !== undefined && tiles[i].id > tiles[j].id) invCount++;
        }
    }
    console.log(invCount);
    return (invCount % 2 == 0);
}

function shuffle() {
    do {
        tiles.sort(function() { return Math.random() - 0.5; });
        tiles.forEach(function(tile, i) {
            tile.x = i % Gn;
            tile.y = Math.floor(i / Gn);
            tile.style.left = tile.x * Gn * size/Gn + 'vmin';
            tile.style.top = tile.y * Gn * size/Gn + 'vmin';
        });
        empty = {x: Gn-1, y: Gn-1};
    } while(!isSolvable(tiles));
}

function toggleBanner() {
  if (banner.classList.contains("hide")) {
    banner.classList.remove("hide");
    inGame = false;
    firstMove = false;
    stopTimer(false)
} else {
    banner.classList.add("hide");
    inGame = true;
  }

  if (pg.classList.contains("half")) {
    pg.classList.remove("half");
  } else {
    pg.classList.add("half");
  }

  if (info.classList.contains("hide") && inGame) {
    info.classList.remove("hide");
  } else {
    info.classList.add("hide");
  }

  shuffle();
}

document.onkeydown = function(e) {
    var key = e.keyCode;
    var tile;
    switch(key) {
        case 39: // ArrowRight
            if(empty.x < Gn - 1) {
                tile = tiles.find(function(t) {
                    return t.x == empty.x + 1 && t.y == empty.y;
                });
            }
        break;
        case 40: // ArrowDown
            if(empty.y < Gn - 1) {
                tile = tiles.find(function(t) {
                    return t.x == empty.x && t.y == empty.y + 1;
                });
            }
        break;
        case 37: // ArrowLeft
            if(empty.x > 0) {
                tile = tiles.find(function(t) {
                    return t.x == empty.x - 1 && t.y == empty.y;
                });
            }
        break;
        case 38: // ArrowUp
            if(empty.y > 0) {
                tile = tiles.find(function(t) {
                    return t.x == empty.x && t.y == empty.y - 1;
                });
            }
            break;
    }
    if(tile) {
        tile.onclick();
    }
};



function updateColor(picker, selector) {
    if (selector == 1) root.style.setProperty('--color1', picker.toString());
    if (selector == 2){
        Color2 = picker.toString().replace(/^#/,'');
        clearBoard();
        startGame();
    }
    if (selector == 3) root.style.setProperty('--color3', picker.toString());
    if (selector == 4) {
        Color4 = picker.toString().replace(/^#/,'');
        document.body.style.backgroundImage = BG[bgn][0] + Color4 + BG[bgn][1];
    }
    if (selector == 5) root.style.setProperty('--colorText', picker.toString());
}

function dec2bin(dec) {
  return (dec >>> 0).toString(2);
}

function generateColorSpectrum(n) {
    let colors = [];
    for(let i = 0; i < n; i++) {
        let hue = Math.floor(360 * (i / n));
        colors.push(`hsl(${hue}, 100%, 50%)`);
    }
    return colors;
}

function createConfetti() {
  const confettiCount = 150;
  const confettiColors = ['red', 'orange', 'yellow', 'green', 'blue', 'violet'];

  for (let i = 0; i < confettiCount; i++) {
    let confettiPiece = document.createElement('div');
    confettiPiece.classList.add('confetti-piece');
    confettiPiece.style.top = Math.floor(Math.random() * -50) + '%';
    confettiPiece.style.left = Math.floor(Math.random() * 100) + '%';
    confettiPiece.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    confettiPiece.style.animationDuration = Math.floor(Math.random() * 3 + 2) + 's';
    document.getElementById('confetti').appendChild(confettiPiece);

    setTimeout(function() {
      confettiPiece.remove();
    }, 5000);  // Удаление конфетины через 5 секунд
  }
}

function toChineseNumber(n) {
  if (!Number.isInteger(n) && n < 0) {
    throw Error('请输入自然数');
  }

  const digits = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  const positions = ['', '十', '百', '千', '万', '十万', '百万', '千万', '亿', '十亿', '百亿', '千亿'];
  const charArray = String(n).split('');
  let result = '';
  let prevIsZero = false;
  //处理0  deal zero
  for (let i = 0; i < charArray.length; i++) {
    const ch = charArray[i];
    if (ch !== '0' && !prevIsZero) {
      result += digits[parseInt(ch)] + positions[charArray.length - i - 1];
    } else if (ch === '0') {
      prevIsZero = true;
    } else if (ch !== '0' && prevIsZero) {
      result += '零' + digits[parseInt(ch)] + positions[charArray.length - i - 1];
    }
  }
  //处理十 deal ten
  if (n < 100) {
    result = result.replace('一十', '十');
  }
  return result;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function randomTheme(){
    let colour;
    radioPBG[bgn].checked = false;
    radioPT[bgTile].checked = false;

    bgn = Math.floor(Math.random() * BG.length);
    bgTile = Math.floor(Math.random() * BG.length);

    numStyle = Math.floor(Math.random() * (6 - 1) + 1);
    radioNums[numStyle - 1].checked = true;

    colour = getRandomColor();
    document.getElementById("color1").jscolor.fromString(colour);
    root.style.setProperty('--color1', colour)
    
    colour = getRandomColor();
    document.getElementById("color2").jscolor.fromString(colour);
    Color2 = colour.replace(/^#/,'');
    
    colour = getRandomColor();
    document.getElementById("color3").jscolor.fromString(colour);
    root.style.setProperty('--color3', colour)

    colour = getRandomColor();
    document.getElementById("color4").jscolor.fromString(colour);
    Color4 = colour.replace(/^#/,'');

    document.body.style.backgroundImage = BG[bgn][0] + Color4 + BG[bgn][1];
    radioPBG[bgn].checked = true;
    radioPT[bgTile].checked = true;

    updateRecordTime();
    clearBoard();
    startGame();
}

// =========================Таймер=============================

// Запускаем таймер
function startTimer() {
    startTime = Date.now();
    updateTime = setInterval(function() {
        var elapsedTime = Date.now() - startTime;
        var milliseconds = Math.floor((elapsedTime % 1000) / 10);
        var seconds = Math.floor((elapsedTime / 1000) % 60);
        var minutes = Math.floor(elapsedTime / (1000 * 60));

        timer.textContent = (minutes < 10 ? '0' + minutes : minutes) + ':' +
                            (seconds < 10 ? '0' + seconds : seconds) + '.' +
                            (milliseconds < 10 ? '0' + milliseconds : milliseconds);
    }, 10);
}

// Останавливаем таймер и сохраняем рекордное время, если оно лучше предыдущего
function stopTimer(save) {
    clearInterval(updateTime);
    var elapsedTime = Date.now() - startTime;
    var currentMode = 'G' + Gn + '_S' + special;
    if (save) {
        if(!recordTimes[currentMode] || elapsedTime < recordTimes[currentMode]) {
            recordTimes[currentMode] = elapsedTime;
            localStorage.setItem('recordTimes', JSON.stringify(recordTimes));
        }
    }

    updateRecordTime();
}

function updateRecordTime() {
    var currentMode = 'G' + Gn + '_S' + special;
    var record = recordTimes[currentMode] || 0;
    var milliseconds = Math.floor((record % 1000) / 10);
    var seconds = Math.floor((record / 1000) % 60);
    var minutes = Math.floor(record / (1000 * 60));

    recordTime.textContent = 'Record: ' + 
                             (minutes < 10 ? '0' + minutes : minutes) + ':' +
                             (seconds < 10 ? '0' + seconds : seconds) + '.' +
                             (milliseconds < 10 ? '0' + milliseconds : milliseconds);
}