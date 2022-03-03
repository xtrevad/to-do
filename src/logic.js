import { loadProject } from './loadProject';

let projectsArr = [];

function getProjectArr(i) {
  return projectsArr[i];
}

function getProjectArrLength() {
  return projectsArr.length;
}

// Maps project name in the DOM with its title
function mapProjectName() {
  const p = document.querySelectorAll('.project');
  p.forEach((project) => {
    // TODO functionality
  });
}

function deleteProject() {
  // TODO: Add "x" button to each created project in the sidebar. Upon click, it prompts user "do you want to delete this?"
  // TODO: and if they confirm, then the DOM element AND the associated project object is deleted from projectArr
}

const newProject = (t) => {
  const title = t;
  let toDoItems = [];
  toDoItems[0] = '';
  return {
    title,
    toDoItems,
  };
};

const newToDoItem = (title, content, dueDate, priority, completed) => {
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

// Load a project by clicking on it

function makeProjectsClickable() {
  const projectListItems = document.getElementsByClassName('project');
  const projects = Array.from(projectListItems);
  projects.forEach((project) => {
    project.addEventListener('click', () => {
      project.classList.remove('active-project');
      // ! this doesn't work^
      loadProject(project);
    });
  });
}

export {
  newToDoItem,
  pushToArr,
  newProject,
  getProjectArr,
  getProjectArrLength,
  makeProjectsClickable,
};
