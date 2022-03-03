import { getProjectArr } from './logic';

function loadProject(projectHTML) {
  console.log(`you have clicked on: Project Data ID ${projectHTML}`);
  projectHTML.classList.add('active-project');
  const p = getProjectArr(projectHTML.dataset.id - 1);
  console.log(p);

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

export { loadProject, renameProject };
