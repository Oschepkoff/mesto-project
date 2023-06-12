//Константы
const popupProfile = document.querySelector('.popup-profile');              //попап профиля
const profileEdit = document.querySelector('.profile__edit');               //кнопка редактирования профиля
const popupClose = document.querySelector('.popup__close');                 //кнопка закрытия попапа
const profileName = document.querySelector('.profile__name');               //имя профиля
const profileDescription = document.querySelector('.profile__description'); //описание профиля
const popupName = document.querySelector('#name');                          //имя профиля в попапе
const popupDescription = document.querySelector('#description');            //описание профиля в попапе
const cardTemplate = document.querySelector('#card-template').content;      //содержимое template
const cardElement = cardTemplate.querySelector('.item');                    //карточка в template
const elements = document.querySelector('.elements');                       //секция elements
const popupPlace = document.querySelector('.popup-place');                  //попап добавления карточки
const placeAdd = document.querySelector('.profile__add-button');            //кнопка добавления карточки
const placeClose = document.querySelector('.popup__close-place');           //кнопка закрытия попапа добавления карточки
const placeName = document.querySelector('#placeName');                     //имя в попапе карточки
const placeUrl = document.querySelector('#url');                            //ссылка в попапе карточки
const popupImage = document.querySelector('.popup-image');                  //попап открытия картинки
const popupImageCard = document.querySelector('.popup__image');             //картинка в попапе картинки
const popupTextCard = document.querySelector('.popup__image-text');         //текст картинки в попапе
const imageClose = document.querySelector('.popup__close-image');           //кнопка закрытия попапа картинки

//Функция открытия попапа профиля
function showPopupProfile() {
  popupProfile.classList.add('popup_opened');
  console.log('Popup открылся');
}

//Слушатель открытия попапа редактирования профиля
profileEdit.addEventListener('click', showPopupProfile);

//Функция закрытия попапа профиля
function closePopupProfile() {
  popupProfile.classList.remove('popup_opened');
  console.log('Popup закрылся');
}

//Слушатель закрытия попапа профиля
popupClose.addEventListener('click', closePopupProfile);

//Подстановка значений в попап профиля с главной страницы
popupName.value = profileName.textContent;
popupDescription.value = profileDescription.textContent;

//Функция Submit редактирование профиля
function formSubmitProfile(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value
  profileDescription.textContent = popupDescription.value
  closePopupProfile();
  console.log('Значения сохранены')
}

//Слушатель Submit редактирование профиля
popupProfile.addEventListener('submit', formSubmitProfile);

//Массив из 6 карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Вызов карточек
initialCards.forEach(function (element) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.item__pic').src = element.link;
  cardElement.querySelector('.item__title').textContent = element.name;

  const buttonLike = cardElement.querySelector('.item__like-button');
  buttonLike.addEventListener('click', function (evt) {
    evt.target.classList.toggle('item__like-button_active');
  });

  elements.append(cardElement)
}
);

//Функция открытия попапа добавления карточки
function showPopupPlace() {
  popupPlace.classList.add('popup_opened');
  console.log('Popup открылся');
}

//Слушатель открытия попапа добавления карточки
placeAdd.addEventListener('click', showPopupPlace);

//Функция закрытия попапа добавления карточки
function closePopupPlace() {
  popupPlace.classList.remove('popup_opened');
  console.log('Popup закрылся');
}

//Слушатель закрытия попапа добавления карточки
placeClose.addEventListener('click', closePopupPlace);

//Функция сборки карточки
function addCard() {
  const cardContainer = document.createElement('div');
  cardContainer.classList.add('item');
  const itemTrash = document.createElement('button');
  itemTrash.classList.add('item__button-trash');
  const linkElement = document.createElement('img');
  linkElement.classList.add('item__pic');
  linkElement.src = placeUrl.value;
  const mainItem = document.createElement('div');
  mainItem.classList.add('item__main');
  const nameElement = document.createElement('h2');
  nameElement.classList.add('item__title');
  nameElement.textContent = placeName.value;
  const likeButtonElement = document.createElement('button');
  likeButtonElement.classList.add('item__like-button');
  mainItem.append(nameElement, likeButtonElement);
  cardContainer.append(itemTrash, linkElement, mainItem);
  elements.prepend(cardContainer);
}

//Слушатель submit добавление карточки
popupPlace.addEventListener('submit', formSubmitPlace);

//Функция Submit добавления карточки
function formSubmitPlace(evt) {
  evt.preventDefault();

  addCard();
  //renderHasCards();
  const buttonLike = document.querySelector('.item__like-button');      //like для добавленных карточек
  buttonLike.addEventListener('click', function (evt) {                 //like для добавленных карточек
    evt.target.classList.toggle('item__like-button_active');            //like для добавленных карточек
  });

  const buttonTrash = elements.querySelectorAll('.item__button-trash');   //Выбор корзин удаления
  buttonTrash.forEach(btn => {                                            //удаление добавленных карточек
    btn.addEventListener('click', () => {                                 //удаление добавленных карточек
      const cardItem = btn.closest('.item');                                //удаление добавленных карточек
      cardItem.remove();                                                    //удаление добавленных карточек
    });
  });

  const imageCards = elements.querySelectorAll('.item__pic');             //Выбор картинки для попапа из добавленных
  //Открытие картинки в попапе
  imageCards.forEach(img => {
    img.addEventListener('click', () => {
      popupImage.classList.add('popup_opened');
      const cardItem = img.closest('.item');
      const textCard = cardItem.querySelector('.item__title');
      popupTextCard.textContent = textCard.textContent;
      const imageCard = cardItem.querySelector('.item__pic');
      popupImageCard.src = imageCard.src;
      console.log('Popup открылся');
    });
  });

  closePopupPlace()
};

//Выбор корзин удаления из массива
const buttonTrash = elements.querySelectorAll('.item__button-trash');

//Удаление карточек из массива
buttonTrash.forEach(btn => {
  btn.addEventListener('click', () => {
    const cardItem = btn.closest('.item');
    cardItem.remove();
  });
});

//Выбор картинки для попапа из массива
const imageCards = elements.querySelectorAll('.item__pic');

//Открытие картинки в попапе
imageCards.forEach(img => {
  img.addEventListener('click', () => {
    popupImage.classList.add('popup_opened');
    const cardItem = img.closest('.item');
    const textCard = cardItem.querySelector('.item__title');
    popupTextCard.textContent = textCard.textContent;
    const imageCard = cardItem.querySelector('.item__pic');
    popupImageCard.src = imageCard.src;
    console.log('Popup открылся');
  })
})

//Функция закрытия попапа добавления карточки
function closePopupImage() {
  popupImage.classList.remove('popup_opened');
  console.log('Popup закрылся');
}

//Слушатель закрытия попапа добавления карточки
imageClose.addEventListener('click', closePopupImage); 