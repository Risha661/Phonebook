'use strict';

const data = [
  {
    name: 'Иван',
    surname: 'Петров',
    phone: '+79514545454',
    button: 'Редактировать',
  },
  {
    name: 'Игорь',
    surname: 'Семёнов',
    phone: '+79999999999',
    button: 'Редактировать',
  },
  {
    name: 'Семён',
    surname: 'Иванов',
    phone: '+79800252525',
    button: 'Редактировать',
  },
  {
    name: 'Мария',
    surname: 'Попова',
    phone: '+79876543210',
    button: 'Редактировать',
  },
];

{
  const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('container');
    return container;
  };

  const createHeader = () => {
    const header = document.createElement('header');
    header.classList.add('header');

    const headerContainer = createContainer();
    header.append(headerContainer);

    header.headerContainer = headerContainer;

    return header;
  };


  const createLogo = (title) => {
    const h1 = document.createElement('h1');
    h1.classList.add('logo');
    h1.textContent = `Телефонный справочник. ${title}`;

    return h1;
  };

  const createMain = () => {
    const main = document.createElement('main');

    const mainContainer = createContainer();
    main.append(mainContainer);
    main.mainContainer = mainContainer;

    return main;
  };

  const createFooter = (title) => {
    const footer = document.createElement('footer');
    footer.classList.add('footer');

    const footerContainer = createContainer();
    footer.append(footerContainer);

    footer.footerContainer = footerContainer;

    const pText = document.createElement('p');
    pText.classList.add('p-text');
    pText.textContent = `Все права защищены © ${title}`;
    footerContainer.append(pText);

    return footer;
  };

  const createButtonsGroup = (params) => {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('btn-wrapper');

    const btns = params.map(({className, type, text}) => {
      const button = document.createElement('button');
      button.type = type;
      button.textContent = text;
      button.className = className;
      return button;
    });
    btnWrapper.append(...btns);

    return {
      btnWrapper,
      btns,
    };
  };

  const createTable = () => {
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');

    const thead = document.createElement('thead');
    thead.insertAdjacentHTML('beforeend', `
    <tr>
    <th class='delete'>Удалить</th>
    <th>Имя</th>
    <th>Фамилия</th>
    <th>Телефон</th>
    </tr>
    `);

    const tbody = document.createElement('tbody');

    table.append(thead, tbody);
    table.tbody = tbody;

    return table;
  };

  const createForm = () => {
    const overlay = document.createElement('div');
    overlay.classList.add('form-overlay');

    const form = document.createElement('form');
    form.classList.add('form');
    form.insertAdjacentHTML('beforeend', `
      <button class="close" type="button"></button>
      <h2 class="form-title">Добавить контакт</h2>
      <div class="form-group">
        <label class="form-label" for="name">Имя:</label>
        <input class="form-input" name="name"
         id="name" type="text" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="surname">Фамилия:</label>
        <input class="form-input" name="surname"
         id="surname" type="text" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="phone">Телефон:</label>
        <input class="form-input" name="phone"
         id="phone" type="number" required>
      </div>
    `);

    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-3',
        type: 'submit',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'reset',
        text: 'Отмена',
      },
    ]);

    form.append(...buttonGroup.btns);

    overlay.append(form);

    return {
      overlay,
      form,
    };
  };

  const renderPhoneBook = (app, title) => {
    const header = createHeader();
    const logo = createLogo(title);
    const main = createMain();
    const footer = createFooter(title);
    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-3 js-add',
        type: 'button',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'button',
        text: 'Удалить',
      },
    ]);
    const table = createTable();
    const form = createForm();

    header.headerContainer.append(logo);
    main.mainContainer.append(buttonGroup.btnWrapper, table, form.overlay);
    app.append(header, main, footer);

    return {
      list: table.tbody,
      logo,
      btnAdd: buttonGroup.btns[0],
      btnDel: buttonGroup.btns[1],
      formOverlay: form.overlay,
      form: form.form,
    };
  };

  const createRow = ({name: firstName, surname, phone, button}) => {
    const tr = document.createElement('tr');
    tr.classList.add('contact');
    // добавили класс для строки,чтобы реализовать удаление контакта

    const tdDel = document.createElement('td');
    tdDel.classList.add('delete');
    const buttonDel = document.createElement('button');
    buttonDel.classList.add('del-icon');
    tdDel.append(buttonDel);

    const tdName = document.createElement('td');
    tdName.textContent = firstName;

    const tdSurname = document.createElement('td');
    tdSurname.textContent = surname;

    const tdPhone = document.createElement('td');
    const phoneLink = document.createElement('a');
    phoneLink.href = `tel:${phone}`;
    phoneLink.textContent = phone;
    tr.phoneLink = phoneLink;

    tdPhone.append(phoneLink);

    const tdBtn = document.createElement('td');
    const btnRetouch = document.createElement('button');
    btnRetouch.classList.add('btn', 'btn-danger');
    btnRetouch.textContent = button;
    tdBtn.append(btnRetouch);

    tr.append(tdDel, tdName, tdSurname, tdPhone, tdBtn);

    return tr;
  };

  const renderContacts = (elem, data) => {
    const allRow = data.map(createRow);
    elem.append(...allRow);
    return allRow;
  };

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


  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);
    const phoneBook = renderPhoneBook(app, title);

    const {
      list,
      logo,
      btnAdd,
      formOverlay,
      form,
      btnDel,
    } = phoneBook;
    // Функционал

    const allRow = renderContacts(list, data);

    hoverRow(allRow, logo);

    btnAdd.addEventListener('click', () => {
      formOverlay.classList.add('is-visible');
    }); // отвечает за открытие модалки

    formOverlay.addEventListener('click', e => {
      const target = e.target;
      if (target === formOverlay) {
        formOverlay.classList.remove('is-visible');
      }
    });

    document.addEventListener('touchstart', e => {
      console.log(e);
    });

    document.querySelector('.close').addEventListener('click', () => {
      formOverlay.classList.remove('is-visible');
    }); // кнопка для закрытия модалки, т.е. form.overlay

    document.addEventListener('touchmove', e => {
      console.log(e.type);
    });

    document.addEventListener('touchend', e => {
      console.log(e.type);
    });

    btnDel.addEventListener('click', () => {
      document.querySelectorAll('.delete').forEach(del => {
        del.classList.toggle('is-visible');
      });
    }); // Перебор элементов с классом delete

    list.addEventListener('click', e => {
      const target = e.target;

      if (target.closest('.del-icon')) {
        target.closest('.contact').remove();
      }
    });
    // Реализация удаления строки контакта

    // setTimeout(() => {
    //   const contact = createRow({
    //     name: 'Ирина',
    //     surname: 'Князева',
    //     phone: '+79261561119',
    //     button: 'Редактировать',
    //   });
    //   list.append(contact);
    // }, 2000) // Реализация проверки добавления и удаление новых контактов
  };

  window.phoneBookInit = init;
}

