import { modalControl, deleteControl, formControl } from "./script/control";
import hoverRow from "./script/control";
import { renderPhoneBook, renderContacts } from "./script/render";
import { data } from "./script/serviceStorage";

// import "./css/style.css";
// import "./css/bootstrap.min.css";
// import "./css/normalize.min.css";
import "./scss/index.scss";

{
  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);

    const { list, logo, btnAdd, form, formOverlay, btnDel } = renderPhoneBook(
      app,
      title
    );

    const allRow = renderContacts(list, data);
    const { closeModal } = modalControl(btnAdd, formOverlay);
    hoverRow(allRow, logo);
    deleteControl(btnDel, list);
    formControl(form, list, closeModal);
  };

  window.phoneBookInit = init;
}
