import { getProjectArr, newToDoItem, spliceFromArr } from './logic';
import { showSelectedProject } from './displayController';

function loadProject(projectHTML) {
  // console.log(`you have clicked on: Project Data ID ${projectHTML}`);
  showSelectedProject(projectHTML);
  // const pp = getProjectArr(projectHTML.dataset.id - 1);
  // pp.toDoItems.forEach((item) => {
  //   console.log(item.getSummary());
  // });

  // TODO: once clicked and the activated project is loaded, set the
  // todo: correponding DOM element to have the 'active-project' class

  // TODO: make this load the project's to-dos in the main content area
  // todo: fill its 'to-do' items with dummy content for now
}

function renameProject() {
  event.target.textContent = prompt(
    'What would you like to rename this project?',
    'New Project'
  );
  getProjectArr(event.target.dataset.id - 1).title = event.target.textContent;
}

function deleteProject(projectHTML) {
  const p = projectHTML.dataset.id - 1;
  spliceFromArr(p);
}

export { loadProject, renameProject, deleteProject };
