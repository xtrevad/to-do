import { de } from 'date-fns/locale';
import {
  pushToArr,
  newToDoItem,
  newProject,
  getProjectArr,
  getProjectArrLength,
  makeProjectsClickable,
} from './logic.js';
import { renameProject, loadProject } from './loadProject.js';

const refreshDisplay = () => {
  // Refreshes the 'project' side panel
  const c = document.getElementById('sidebar-list');
  document.querySelectorAll('.project').forEach((node) => node.remove()); // Deletes the old list in preparation for rebuilding it
  for (let i = 0; i < getProjectArrLength(); i++) {
    const p = document.createElement('li');
    p.classList.add('project');
    p.textContent = getProjectArr(i).title;
    p.addEventListener('dblclick', () => renameProject());
    // p.setAttribute('contenteditable', 'true');
    p.dataset.id = i + 1;
    // ! I see bugs in my future...if I implement functionality that lets users re-order projects,
    // ! this will break the association between the DOM nodelist data-id and the projectArr index
    c.appendChild(p);

    // TODO: refresh the individual 'to-do' items in the project
  }
  makeProjectsClickable();
};

export default refreshDisplay;
