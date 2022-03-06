import { de } from 'date-fns/locale';
import {
  pushToArr,
  newToDoItem,
  newProject,
  getProjectArr,
  getProjectArrLength,
  makeProjectsClickable,
} from './logic.js';
import { renameProject, loadProject, deleteProject } from './loadProject.js';

const refreshDisplay = () => {
  // Refreshes the 'project' side panel
  const c = document.getElementById('sidebar-list');
  document.querySelectorAll('.row').forEach((node) => node.remove()); // Deletes the old list in preparation for rebuilding it
  for (let i = 0; i < getProjectArrLength(); i++) {
    const row = document.createElement('div');
    row.classList.add('row');
    c.appendChild(row);
    const p = document.createElement('li');
    p.classList.add('project');
    p.textContent = getProjectArr(i).title;
    p.addEventListener('dblclick', () => renameProject());
    // p.setAttribute('contenteditable', 'true');
    p.dataset.id = i + 1;
    // ? I see bugs in my future...if I implement functionality that lets users re-order projects,
    // ? this will break the association between the DOM nodelist data-id and the projectArr index
    row.appendChild(p);
    const delBtn = document.createElement('div');
    delBtn.classList.add('delete-project');
    delBtn.innerHTML = '&times';
    delBtn.dataset.id = i + 1;
    delBtn.addEventListener('click', () => {
      const n = Array.from(document.querySelectorAll(`[data-id='${i + 1}']`));
      n.forEach((node) => {
        deleteProject(node);
      });
    });
    delBtn.addEventListener('click', () => {
      const n = Array.from(document.querySelectorAll(`[data-id='${i + 1}']`));
      n.forEach((node) => {
        node.remove();
      });
      const oldCards = document.querySelectorAll('.card');
      Array.from(oldCards).forEach((card) => {
        card.remove();
      });
    });
    row.appendChild(delBtn);
  }
  makeProjectsClickable();
};

const showSelectedProject = (projectHTML) => {
  // Gives the active project a distinctive style in the sidebar
  const allProj = document.getElementsByClassName('project');
  const projDomList = Array.from(allProj);
  projDomList.forEach((projDomEl) => {
    projDomEl.classList.remove('active-project');
  });
  projectHTML.classList.add('active-project');
  // Removes previous project's to-dos
  const oldCards = document.querySelectorAll('.card');
  Array.from(oldCards).forEach((card) => {
    card.remove();
  });

  // Displays 'to-do' lists in the content panel

  const p = getProjectArr(projectHTML.dataset.id - 1);
  for (let i = 0; i < p.toDoItems.length; i++) {
    const card = document.createElement('div');
    card.classList.add('card');
    const title = document.createElement('h3');
    title.textContent = p.toDoItems[i].getTitle();
    card.appendChild(title);
    const content = document.createElement('p');
    content.textContent = p.toDoItems[i].getContent();
    card.appendChild(content);
    const dueDate = document.createElement('p');
    dueDate.textContent = 'Due: ' + p.toDoItems[i].getDueDate();
    card.appendChild(dueDate);
    const priority = document.createElement('div');
    priority.textContent = 'Priority: ' + p.toDoItems[i].getPriority();
    card.appendChild(priority);
    const completed = document.createElement('div');
    completed.textContent = 'completed: ' + p.toDoItems[i].getCompleted();
    card.appendChild(completed);
    document.getElementById('card-container').appendChild(card);
  }
};

export { refreshDisplay, showSelectedProject };
