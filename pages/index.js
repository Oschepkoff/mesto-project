//Константы

//попап редактирования профиля
const popupProfile = document.querySelector('.popup-profile');                  //попап профиля
const buttonClosePopupProfile = popupProfile.querySelector('.popup__close');    //кнопка закрытия попапа редактирования профиля
const inputNameFormProfile = popupProfile.querySelector('#name');               //имя профиля в попапе
const inputDescriptionFormProfile = popupProfile.querySelector('#description'); //описание профиля в попапе
const formProfile = popupProfile.querySelector('.popup__form')                  //форма попапа профиля
//секция профиля
const proFile = document.querySelector('.profile');
const buttonOpenPopupProfile = proFile.querySelector('.profile__edit');         //кнопка редактирования профиля
const profileName = proFile.querySelector('.profile__name');                    //имя профиля
const profileDescription = proFile.querySelector('.profile__description');      //описание профиля
//секция template
const cardTemplate = document.querySelector('#card-template').content;          //содержимое template
const cardElement = cardTemplate.querySelector('.item');                        //карточка в template
//секция elements
const elements = document.querySelector('.elements');                           //секция elements
//попап добавления карточки
const popupPlace = document.querySelector('.popup-place');                      //попап добавления карточки
const buttonClosePopupPlace = popupPlace.querySelector('.popup__close');        //кнопка закрытия попапа добавления карточки
const inputNameFormAddNewCard = popupPlace.querySelector('#placeName');         //имя в попапе карточки
const inputUrlFormAddNewCard = popupPlace.querySelector('#url');                //ссылка в попапе карточки
const formPlace = popupPlace.querySelector('.popup__form');                     //форма попапа карточки
//кнопка открытия попапа добавления карточки
const buttonOpenPopupPlace = document.querySelector('.profile__add-button');            
//попап открытия картинки
const popupFullImage = document.querySelector('.popup-image');                      //попап открытия картинки
const popupImageCard = popupFullImage.querySelector('.popup__image');               //картинка в попапе картинки
const popupTextCard = popupFullImage.querySelector('.popup__image-text');           //текст картинки в попапе
const buttonClosePopupImage = popupFullImage.querySelector('.popup__close');        //кнопка закрытия попапа картинки


//Функция открытия попапа
function openPopup(popup){
  popup.classList.add('popup_opened');
}

//Функция закрытия попапа
function closePopup(popup){
  popup.classList.remove('popup_opened');
}

//Функция добавления лайка
function likeCard(btn) {
  btn.classList.toggle('item__like-button_active');
}

//Функция удаления карточки
function deleteCard(trash) {
  trash.closest('.item').remove();
}

//Функция попапа картинки
function showImage(image) {
  popupImageCard.src = image.src;
  popupImageCard.alt = image.alt;
  popupTextCard.textContent = image.alt;
  openPopup(popupFullImage);
}

//Функция кнопки закрытия попапа
function closePopupButton() {
  document.querySelectorAll('.popup__close').forEach(button => {
      const buttonClose = button.closest('.popup');
      button.addEventListener('click', () => closePopup(buttonClose));
  }); 
}

//Функция кнопки корзины
function trashPopupButton(item) {
  const buttonTrash = item.querySelector('.item__button-trash');
  buttonTrash.addEventListener('click', () => deleteCard(buttonTrash));
}

//Функция кнопки лайка
function likePopupButton(item) {
  const buttonLike = item.querySelector('.item__like-button');
  buttonLike.addEventListener('click', () => likeCard(buttonLike));
}

//Функция попапа картинки
function showFullImage(item) {
  const image = item.querySelector('.item__pic');
  image.addEventListener('click', () => showImage(image));
}

//Функция создания карточки
const createCard = (data) => {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.item__pic');
  const cardText = cardElement.querySelector('.item__title');
  
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardText.textContent = data.name;
  
  likePopupButton(cardElement);
  trashPopupButton(cardElement);
  showFullImage(cardElement);

  return cardElement;
}



//Функция вставки карточки
const renderCard = (data) => {
  elements.prepend(data);
}

//Функция submit попапа профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputNameFormProfile.value;
  profileDescription.textContent = inputDescriptionFormProfile.value;
  closePopup(popupProfile);
}

//Функция submit попапа добавления карточки
const handlePlaceFormSubmit = (evt) => {
  evt.preventDefault();
  const item = {
      name: inputNameFormAddNewCard.value,
      link: inputUrlFormAddNewCard.value,
  }
  renderCard(createCard(item));
  closePopup(popupPlace);
  inputNameFormAddNewCard.value = '';
  inputUrlFormAddNewCard.value = '';
}

//Вызов карточек из массива
initialCards.forEach(item => renderCard(createCard(item)));

//Закрытие попапов
buttonClosePopupProfile.addEventListener('click', closePopupButton());
buttonClosePopupPlace.addEventListener('click', closePopupButton());
buttonClosePopupImage.addEventListener('click', closePopupButton());

//Открытие попапа профиля
buttonOpenPopupProfile.addEventListener('click', () => {
  inputNameFormProfile.value = profileName.textContent;
  inputDescriptionFormProfile.value = profileDescription.textContent;
  openPopup(popupProfile);
});

//Открытие попапа добавления карточки
buttonOpenPopupPlace.addEventListener('click', () => {
  openPopup(popupPlace);
});

//Submit
formProfile.addEventListener('submit', handleProfileFormSubmit);
formPlace.addEventListener('submit', handlePlaceFormSubmit);