import {modalControl, deleteControl, formControl} from './modules/control.js';
import hoverRow from './modules/control.js';
import {renderPhoneBook, renderContacts} from './modules/render.js';
import {data} from './modules/serviceStorage.js';

{
  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);

    const {
      list,
      logo,
      btnAdd,
      form,
      formOverlay,
      btnDel,
    } = renderPhoneBook(app, title);

    const allRow = renderContacts(list, data);
    const {closeModal} = modalControl(btnAdd, formOverlay);
    hoverRow(allRow, logo);
    deleteControl(btnDel, list);
    formControl(form, list, closeModal);
  };

  window.phoneBookInit = init;
}

