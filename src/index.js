import {
  pushToArr,
  newToDoItem,
  newProject,
  getProjectArr,
  getProjectArrLength,
  pushToDoToProject,
} from './logic.js';
import { refreshDisplay } from './displayController.js';
import './style.css';
import loadHome from './homePage.js';
import { loadProject } from './loadProject.js';
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

const newToDoBtn = document.getElementById('new-todo-btn');
newToDoBtn.addEventListener('click', () => {
  const newItem = newToDoItem(
    'title',
    'content',
    'due date',
    'priority',
    'completed'
  );
  pushToDoToProject(newItem);
  loadProject(document.querySelector('.active-project'));
  // TODO: make this a custom pop-up prompt window
  // todo: which asks for all task details before creating it.
  // todo: Also, make them all editable in the DOM.
});

// * test project below - delete once no longer necessary
//
const testP = newProject('test project');
pushToArr(testP);
refreshDisplay();
testP.toDoItems[0] = newToDoItem(
  'do this',
  'here is content of a thing to do',
  'feb16',
  'high priority',
  'not completed'
);
testP.toDoItems[1] = newToDoItem(
  'also do this',
  'some more steps',
  'april 22',
  'low priority',
  'not completed'
);
