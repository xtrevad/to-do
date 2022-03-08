import format from 'date-fns/format';
import {
  pushToArr,
  newToDoItem,
  newProject,
  getProjectArr,
  getProjectArrActual,
  getProjectArrLength,
  makeProjectsClickable,
  pushToDoToProject,
} from './logic.js';
import { renameProject, loadProject, deleteProject } from './loadProject.js';
import { formatDistanceToNow } from 'date-fns';
import { enIE } from 'date-fns/locale';

function refIDFix() {
  const projs = Array.from(document.getElementsByClassName('project'));
  const btns = Array.from(document.getElementsByClassName('delete-project'));
  for (let i = 0; i < getProjectArrLength(); i++) {
    projs[i].setAttribute('data-id', `${i + 1}`);
    btns[i].setAttribute('data-id', `${i + 1}`);
  }
}

const refreshDisplay = () => {
  // Refreshes the 'project' side panel
  const c = document.getElementById('sidebar-list');
  document.querySelectorAll('.row').forEach((node) => node.remove()); // Deletes the old list in preparation for rebuilding it
  // for (let i = 0; i < getProjectArrLength(); i++)
  const array = getProjectArrActual();
  array.forEach((element) => {
    const i = array.indexOf(element);
    const row = document.createElement('div');
    row.classList.add('row');
    c.appendChild(row);
    const p = document.createElement('li');
    p.classList.add('project');
    p.textContent = getProjectArr(i).title;
    p.addEventListener('dblclick', () => renameProject());
    // p.setAttribute('contenteditable', 'true');
    p.setAttribute('data-id', `${i + 1}`);
    // ? I see bugs in my future...if I implement functionality that lets users re-order projects,
    // ? this will break the association between the DOM nodelist data-id and the projectArr index
    row.appendChild(p);
    const delBtn = document.createElement('div');
    delBtn.classList.add('delete-project');
    delBtn.innerHTML = '&times';
    delBtn.setAttribute('data-id', `${i + 1}`);
    delBtn.addEventListener('click', () => {
      const n = Array.from(document.querySelectorAll(`[data-id='${i + 1}']`));
      console.log('this is n: ' + n);
      n.forEach((node) => {
        deleteProject(node);
        delBtn.parentElement.remove();

        // ! Elements have become disassociated from the projArr!!! This breaks everything
        // node.remove();
      });
      const oldCards = document.querySelectorAll('.card');
      Array.from(oldCards).forEach((card) => {
        card.remove();
      });
      // refIDFix();
    });
    row.appendChild(delBtn);
  });

  makeProjectsClickable();
};

const showSelectedProject = (projectHTML) => {
  // refIDFix();
  // Gives the active project a distinctive style in the sidebar
  const allProj = document.getElementsByClassName('project');
  const projDomList = Array.from(allProj);
  projDomList.forEach((projDomEl) => {
    projDomEl.classList.remove('active-project');
    projDomEl.parentElement.classList.remove('active-row');
  });
  projectHTML.classList.add('active-project');
  projectHTML.parentElement.classList.add('active-row');
  // Removes previous project's to-dos
  const oldCards = document.querySelectorAll('.card');
  Array.from(oldCards).forEach((card) => {
    card.remove();
  });

  // Displays 'to-do' lists in the content panel

  const p = getProjectArr(projectHTML.dataset.id - 1);
  console.log(p);
  for (let i = 0; i < p.toDoItems.length; i++) {
    const card = document.createElement('div');
    card.classList.add('card');
    const title = document.createElement('h3');
    title.textContent = p.toDoItems[i].getTitle();
    card.appendChild(title);
    const content = document.createElement('p');
    content.textContent = p.toDoItems[i].getContent();
    card.appendChild(content);
    const dueDate = document.createElement('div');
    dueDate.textContent = 'Due: ' + p.toDoItems[i].getDueDate();
    card.appendChild(dueDate);
    const pr = p.toDoItems[i].getPriority();
    if (pr === 'High') {
      card.classList.add('high-priority');
    } else if (pr === 'Medium') {
      card.classList.add('medium-priority');
    } else {
      card.classList.add('low-priority');
    }
    document.getElementById('card-container').appendChild(card);
    card.addEventListener('click', () => {
      card.classList.toggle('completed');
    });
  }
};

const selectDefaultProject = () => {
  const allP = document.getElementsByClassName('active-project');
  const allR = document.getElementsByClassName('active-row');
  if (allP.length == 0 || allR.length == 0) {
    const sel = document.getElementsByClassName('project');
    sel[0].classList.add('active-project');
    sel[0].parentElement.classList.add('active-row');
  }
};

const todoInputModal = () => {
  const mainDiv = document.createElement('div');
  mainDiv.id = 'todo-input-modal';
  mainDiv.classList.add('modal');
  const mc = document.createElement('div');
  mc.classList.add('modal-content');
  mainDiv.appendChild(mc);
  const mh = document.createElement('div');
  mh.classList.add('modal-header');
  mc.appendChild(mh);
  const form = document.createElement('form');
  form.classList.add('modal-form');
  mc.appendChild(form);

  const span = document.createElement('span');
  span.classList.add('close');
  span.innerHTML = '&times;';

  span.addEventListener('click', () => {
    document.getElementsByClassName('modal')[0].remove();
  });
  window.addEventListener('click', () => {
    if (event.target === document.getElementsByClassName('modal')[0]) {
      document.getElementsByClassName('modal')[0].remove();
    }
  });
  mh.appendChild(span);

  const h2 = document.createElement('h2');
  h2.textContent = 'New item';
  mh.appendChild(h2);
  // Title
  const ti = document.createElement('input');
  ti.id = 'modal-todo-title';
  ti.setAttribute('type', 'text');
  ti.setAttribute('placeholder', 'Task');
  form.appendChild(ti);

  // Content
  const co = document.createElement('input');
  co.id = 'modal-todo-content';
  co.setAttribute('type', 'text');
  co.setAttribute('placeholder', 'Notes');
  form.appendChild(co);

  // Due date
  const due = document.createElement('input');
  due.id = 'modal-todo-due-date';
  due.setAttribute('type', 'datetime-local');
  form.appendChild(due);

  // Priority
  const pr = document.createElement('fieldset');
  pr.id = 'modal-todo-priority';
  form.appendChild(pr);
  const lab = document.createElement('legend');
  lab.textContent = 'Priority: ';
  pr.appendChild(lab);
  const arr = ['Low', 'Medium', 'High'];
  arr.forEach((prValue, i) => {
    const labelValue = document.createElement('label');
    labelValue.textContent = `${prValue}`;
    labelValue.setAttribute('for', `${prValue}`);
    const inputValue = document.createElement('input');
    inputValue.type = 'radio';
    inputValue.name = 'priority';
    inputValue.id = `${prValue}`;
    inputValue.prValue = i;
    pr.appendChild(labelValue);
    pr.appendChild(inputValue);
  });

  function displayRadioValue() {
    const rad = document.getElementsByName('priority');
    for (let i = 0; i < rad.length; i++) {
      if (rad[i].checked) {
        return rad[i].id;
      }
    }
  }

  const sub = document.createElement('button');
  sub.id = 'submit-btn';
  sub.setAttribute('type', 'button');
  sub.textContent = 'Add';
  sub.addEventListener('click', () => {
    const title = document.getElementById('modal-todo-title').value;
    const content = document.getElementById('modal-todo-content').value;
    const d = document.getElementById('modal-todo-due-date').value;
    const dueDate = formatDistanceToNow(new Date(d), { addSuffix: true });
    const priority = displayRadioValue();

    const n = newToDoItem(title, content, dueDate, priority);
    pushToDoToProject(n);
    showSelectedProject(document.querySelector('.active-project'));
    document.getElementsByClassName('modal')[0].remove();
  });
  form.appendChild(sub);

  document.getElementById('content').appendChild(mainDiv);
  mainDiv.style.display = 'none';
  mainDiv.style.display = 'block';
};

export {
  selectDefaultProject,
  refreshDisplay,
  showSelectedProject,
  todoInputModal,
  refIDFix,
};
