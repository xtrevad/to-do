import { loadProject } from './loadProject';

function loadHome() {
  const c = document.createElement('div');
  c.id = 'content';
  document.body.appendChild(c);
  //Header
  const h = document.createElement('div');
  h.id = 'header';
  c.appendChild(h);
  const title = document.createElement('h1');
  title.id = 'title';
  title.textContent = 'To-Do';
  h.appendChild(title);
  //Sidebar
  const s = document.createElement('div');
  s.id = 'sidebar';
  c.appendChild(s);
  const sList = document.createElement('ul');
  sList.id = 'sidebar-list';
  s.appendChild(sList);
  // New project button
  const newProjectBtn = document.createElement('button');
  newProjectBtn.id = 'new-project-btn';
  newProjectBtn.textContent = 'New Project';
  sList.appendChild(newProjectBtn);
  // Card container
  const cardCContainer = document.createElement('div');
  cardCContainer.id = 'card-c-container';
  c.appendChild(cardCContainer);
  const newToDoBtn = document.createElement('button');
  newToDoBtn.id = 'new-todo-btn';
  newToDoBtn.textContent = 'New Item';
  cardCContainer.appendChild(newToDoBtn);
  const cardContainer = document.createElement('div');
  cardContainer.id = 'card-container';
  cardCContainer.appendChild(cardContainer);
}

export default loadHome;
