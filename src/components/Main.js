import React, { useState } from 'react';
import avatar from '../images/avatar.jpg';
import { api } from '../utils/api.js';
import Card from './Card.js'

function Main(props) {

  const {
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    onCardClick
  } = props

  //данные пользователя (имя, о себе, аватар)
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState();

  //создаем пустой массив для карточек
  const [cards, setCards] = useState([]);

  //запрашиваем данные пользователя с сервера
  React.useEffect(() => {
    api.getUserInfo()
      .then((data) => {
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      });
  }, []);

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

  //возврат разметки  страницы
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__image">
          <img className="profile__avatar" src={userAvatar || avatar} alt="аватар" />
          <button onClick={onEditAvatar} className="profile__avatar-edit"></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{userName}</h1>
          <button onClick={onEditProfile} type="button" className="profile__edit-button"></button>
          <p className="profile__subtitle">{userDescription}</p>
        </div>
        <button onClick={onAddPlace} type="button" className="profile__add-button"></button>
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
          >
          </Card>
        ))}
      </section>
    </main>
  );
}

export default Main;