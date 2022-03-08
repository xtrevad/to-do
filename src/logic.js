import { loadProject } from './loadProject';
import {
  selectDefaultProject,
  refIDFix,
  showSelectedProject,
} from './displayController';

let projectsArr = [];

function getProjectArr(i) {
  return projectsArr[i];
}

function getProjectArrLength() {
  return projectsArr.length;
}

function getProjectArrActual() {
  return projectsArr;
}

const newProject = (t) => {
  const title = t;
  let toDoItems = [];
  return {
    title,
    toDoItems,
  };
};

const newToDoItem = (title, content, dueDate, priority) => {
  // TODO: make this a modal pop-up!
  const getTitle = () => title;
  const getContent = () => content;
  const getDueDate = () => dueDate;
  const getPriority = () => priority;
  const getSummary = () => {
    return `${title}: ${content}. Must be completed by ${dueDate}. Priority: ${priority}`;
  };

  return {
    getTitle,
    getContent,
    getDueDate,
    getPriority,
    getSummary,
  };
};

function pushToArr(project) {
  projectsArr.push(project);
}

function spliceFromArr(i) {
  delete projectsArr[i];
  console.table(projectsArr);
  // projectsArr.splice(i, i + 1);
}

function pushToDoToProject(item) {
  const activeProjHTML = document.querySelector('.active-project');
  console.log('THIS IS ACTIVE: ' + activeProjHTML);
  const activeProj = getProjectArr(activeProjHTML.dataset.id - 1);
  activeProj.toDoItems.push(item);
}
// Load a project by clicking on it

function makeProjectsClickable() {
  const projectListItems = document.getElementsByClassName('project');
  const projects = Array.from(projectListItems);
  projects.forEach((project) => {
    project.addEventListener('click', () => {
      // refIDFix();
      showSelectedProject(project);
    });
  });
}

export {
  newToDoItem,
  pushToArr,
  spliceFromArr,
  newProject,
  getProjectArr,
  getProjectArrLength,
  makeProjectsClickable,
  pushToDoToProject,
  getProjectArrActual,
};
