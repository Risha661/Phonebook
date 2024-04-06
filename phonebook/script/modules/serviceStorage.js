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


localStorage.setItem('userContact', JSON.stringify([
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
]));
const data = getStorage('userContact');

const addContactData = (data, contact) => {
  data.push(contact);
  setStorage('userContact', data);
  data = getStorage('userContact');
};

export {getStorage};
export {setStorage, removeStorage, addContactData};
export {data};
