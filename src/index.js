import {
  pushToArr,
  newToDoItem,
  newProject,
  getProjectArr,
  getProjectArrLength,
} from './logic.js';
import refreshDisplay from './displayController.js';
import './style.css';
import loadHome from './homePage.js';
// import loadProject from './loadProject';

loadHome();

const newProjectBtn = document.getElementById('new-project-btn');
newProjectBtn.addEventListener('click', () => {
  const newP = newProject('New Project');
  console.log(newP);
  console.log(getProjectArrLength());
  pushToArr(newP);
  refreshDisplay();
});
