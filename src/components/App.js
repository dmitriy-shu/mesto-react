import React, { useState } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js'
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import { api } from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContex.js';
import EditProfilePopup from './EditProfilePopup.js'
import EditAvatarPopup from './EditAvatarPopup.js'
import AddPlacePopup from './AddPlacePopup.js';

import '../index.css';

function App() {

  //стейт-переменная принимает данные пользователя
  const [currentUser, setCurrenUser] = useState({});

  //стейт-переменные попапов в значении false
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    isImageOpen: false,
    link: '',
    name: ''
  });

  //стейт-переменная для отображения "сохранение..."
  const [isLoading, setIsLoading] = useState(false);

  //запрашиваем данные пользователя с сервера
  React.useEffect(() => {
    api.getUserInfo()
      .then((data) => {
        setCurrenUser(data);
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      });
  }, []);

  //функция обновляет данные пользователя
  function handleUpdateUser(data) {
    setIsLoading(true);
    api.sendUserInfo(data)
      .then((data) => {
        setCurrenUser(data);
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      })
  }

  //функция отвечает за изменение аватара пользователя
  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api.sendUserAvatar(data)
      .then((data) => {
        setCurrenUser(data);
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      })
  }

  //пустой массив для карточек
  const [cards, setCards] = useState([]);

  //запрашиваем массив карточек с сервера
  React.useEffect(() => {
    api.getCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      });
  }, []);

  //отправка новой карточки на сервер
  function handleAddPlaceSubmit(data) {
    setIsLoading(true)
    api.addCard(data)
      .then((data) => {
        setCards([...cards, data]);
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      })
  }

  //отрисовка лайка
  function handleCardLike(card) {
    //проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос на сервер и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        // Обновляем стейт
        setCards(newCards);
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      });
  }

  //удаление карточки
  function handleCardDelete(card) {
    //проверяем карточку, добавлена ли она текущем пользователем
    const isOwn = card.owner._id === currentUser._id;

    // Отправляем запрос на сервер и получаем обновлённые данные карточки
    api.deleteCard(card._id, !isOwn)
      .then((newCard) => {
        // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
        const newCards = cards.filter((c) => c._id === card._id ? !newCard : c);
        // Обновляем стейт
        setCards(newCards);
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      });
  }

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
    <CurrentUserContext.Provider value={currentUser}>

      <div className="page">

        <Header />

        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        >
        </Main>



        <Footer />

        <section className="popups">

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}>
          </EditProfilePopup>

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}>
          </AddPlacePopup>

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}>
          </EditAvatarPopup>


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

    </CurrentUserContext.Provider>
  );
}

export default App;
