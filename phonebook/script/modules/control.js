
import * as create from './modules/createElements.js';
import {setStorage, removeStorage,
  addContactData} from './modules/serviceStorage.js';
import {createRow} from './createElements.js';

create.createContainer();
create.createHeader();
create.createLogo();
create.createMain();
create.createFooter();
create.createButtonsGroup();
create.createTable();
create.createForm();
create.createRow();

const hoverRow = (allRow, logo) => {
  const text = logo.textContent;
  allRow.forEach(contact => {
    contact.addEventListener('mouseenter', () => {
      logo.textContent = contact.phoneLink.textContent;
    });
    contact.addEventListener('mouseleave', () => {
      logo.textContent = text;
    });
  });
};

const modalControl = (btnAdd, formOverlay) => {
  const openModal = () => {
    formOverlay.classList.add('is-visible');
  };

  const closeModal = () => {
    formOverlay.classList.remove('is-visible');
  };

  btnAdd.addEventListener('click', openModal);

  formOverlay.addEventListener('click', e => {
    const target = e.target;
    if (target === formOverlay || target.closest('.close')) {
      closeModal();
    }
  });

  return {
    closeModal,
  };
};

const deleteControl = (btnDel, list) => {
  btnDel.addEventListener('click', () => {
    document.querySelectorAll('.delete').forEach(del => {
      del.classList.toggle('is-visible');
    });
  });

  list.addEventListener('click', e => {
    const target = e.target;

    if (target.closest('.del-icon')) {
      const contactElement = target.closest('.contact');
      const index =
      Array.from(contactElement.parentNode.children).indexOf(contactElement);
      removeStorage(index);
      contactElement.remove();
    }
  });
};

const addContactPage = (contact, list) => {
  list.append(createRow(contact));
};

const formControl = (form, list, closeModal) => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newContact = Object.fromEntries(formData);
    console.log(newContact);

    setStorage('userContact', newContact);

    addContactPage(newContact, list);
    addContactData(newContact);

    form.reset();
    closeModal();
  });
};

export {modalControl, deleteControl, addContactPage, formControl};
export default hoverRow;
