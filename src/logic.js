import { loadProject } from './loadProject';

let projectsArr = [];

function getProjectArr(i) {
  return projectsArr[i];
}

function getProjectArrLength() {
  return projectsArr.length;
}

function deleteProject() {
  // TODO: Add "x" button to each created project in the sidebar. Upon click, it prompts user "do you want to delete this?"
  // TODO: and if they confirm, then the DOM element AND the associated project object is deleted from projectArr
}

const newProject = (t) => {
  const title = t;
  let toDoItems = [];
  return {
    title,
    toDoItems,
  };
};

const newToDoItem = (title, content, dueDate, priority, completed) => {
  // TODO: make this a modal pop-up!
  const getTitle = () => title;
  const getContent = () => content;
  const getDueDate = () => dueDate;
  const getPriority = () => priority;
  const getCompleted = () => completed;
  const getSummary = () => {
    return `${title}: ${content}. Must be completed by ${dueDate}. Priority: ${priority}`;
  };

  return {
    getTitle,
    getContent,
    getDueDate,
    getPriority,
    getCompleted,
    getSummary,
  };
};

function pushToArr(project) {
  projectsArr.push(project);
}

function spliceFromArr(i) {
  projectsArr.splice(i, i + 1);
}

function pushToDoToProject(item) {
  const activeProjHTML = document.querySelector('.active-project');
  const activeProj = getProjectArr(activeProjHTML.dataset.id - 1);
  activeProj.toDoItems.push(item);
}
// Load a project by clicking on it

function makeProjectsClickable() {
  const projectListItems = document.getElementsByClassName('project');
  const projects = Array.from(projectListItems);
  projects.forEach((project) => {
    project.addEventListener('click', () => {
      loadProject(project);
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
};
