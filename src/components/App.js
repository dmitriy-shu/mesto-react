import React, { useState } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js'
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';

import '../index.css';

function App() {

  //стейт-переменные попапов в значении false
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    isImageOpen: false,
    link: '',
    name: ''
  });

  //открытие попапа фото
  function handleCardClick(cardData) {
    const { link, name } = cardData;
    setSelectedCard({ isImageOpen: true, link: link, name: name });
  }

  //открытие попапа аватара
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  //открытие попапа профиля
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  //открытие попапа добавления карточки
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  //закрытие попапов
  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard({
      isImageOpen: false,
      link: '',
      name: ''
    });
  }

  //возврат разметки страницы  
  return (
    <div className="page">

      <Header />

      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      >
      </Main>



      <Footer />

      <section className="popups">
        <PopupWithForm
          name='profile'
          title='Редактировать профиль'
          buttonText='Сохранить'
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
          <fieldset className="popup__inputs">
            <input name="nameProfile" className="popup__input popup__input_name" id="name-input" type="text" defaultValue="" required minLength={2} maxLength={40} pattern="[A-Za-zА-ЯЁа-яё -]{1,}" placeholder="Ваше имя" />
            <span className="popup__error-message" id="name-input-error"></span>
            <input name="textProfile" className="popup__input popup__input_text" id="text-input" type="text" defaultValue="" required minLength={2} maxLength={40} placeholder="О себе" />
            <span className="popup__error-message" id="text-input-error"></span>
          </fieldset>
        </PopupWithForm>

        <PopupWithForm
          name='card'
          title='Новое место'
          buttonText='Сохранить'
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
          <fieldset className="popup__inputs">
            <input name="name" className="popup__input popup__input_title" id="title-input" type="text" placeholder="Название" defaultValue="" required minLength={1} maxLength={30} />
            <span className="popup__error-message" id="title-input-error"></span>
            <input name="link" className="popup__input popup__input_link" id="link-input" type="url" placeholder="Ссылка на картинку" defaultValue="" required />
            <span className="popup__error-message" id="link-input-error"></span>
          </fieldset>
        </PopupWithForm>

        <PopupWithForm
          name='avatar'
          title='Обновить аватар'
          buttonText='Сохранить'
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <fieldset className="popup__inputs">
            <input name="avatar" className="popup__input popup__input_avatar" id="avatar-link" type="url" placeholder="Загрузите изображение" defaultValue="" required />
            <span className="popup__error-message" id="avatar-link-error"></span>
          </fieldset>
        </PopupWithForm>

        <ImagePopup
          isOpen={selectedCard.isImageOpen}
          onClose={closeAllPopups}
          name={selectedCard.name}
          link={selectedCard.link}
        >
        </ImagePopup>

        <PopupWithForm
          name='card-delete'
          title='Вы уверены?'
          buttonText='Да'
        >
        </PopupWithForm>
      </section>



    </div>
  );
}

export default App;
