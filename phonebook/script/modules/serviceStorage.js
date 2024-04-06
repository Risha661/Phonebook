import * as create from './modules/createElements.js';

create.createContainer();
create.createHeader();
create.createLogo();
create.createMain();
create.createFooter();
create.createButtonsGroup();
create.createTable();
create.createForm();
create.createRow();

const getStorage = key => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : [];
};

const setStorage = (key, newDataContact) => {
  localStorage.setItem(key, JSON.stringify(newDataContact));
};

const removeStorage = (index) => {
  const contacts = JSON.parse(localStorage.getItem('userContact')) || [];
  if (index >= 0 && index < contacts.length) {
    contacts.splice(index, 1);
    localStorage.setItem('userContact', JSON.stringify(contacts));
  } else {
    alert('Error!');
  }
};

const addContactData = (data, contact) => {
  data.push(contact);
  setStorage('userContact', data);
  data = getStorage('userContact');
};

export {getStorage};
export {setStorage, removeStorage, addContactData};
