import React, { useEffect, useState } from 'react';
import { api } from '../utils/Api.js';
import Card from './Card.js'
import Profile from './Profile.js'

function Main(props) {

  const {
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    onCardClick
  } = props

  //данные пользователя (имя, о себе, аватар)
  const [user, setUser] = useState({
    name       : "Name",
    description: "Description",
    avatar     : null
  })
  //создаем пустой массив для карточек
  const [cards, setCards] = useState([]);

  //запрашиваем данные пользователя с сервера
  //запрашиваем массив карточек с сервера
  useEffect(() => {
    async function fetchData(){
      const userInfo = await api.getUserInfo()
      setUser(userInfo);

      const fetchedCards = await api.getCards()
      setCards(fetchedCards);
    }
    fetchData()
  }, []);

  //возврат разметки  страницы
  return (
    <main className="content">
      <Profile
        user={ user }
        onEditProfile={ onEditProfile }
        onEditAvatar={ onEditAvatar }
        onAddPlace={ onAddPlace }
      />
      <section className="elements">
        { cards.map((card) => (
          <Card
            key={ card._id }
            card={ card }
            onCardClick={ onCardClick }
          />
        )) }
      </section>
    </main>
  );
}

export default Main;