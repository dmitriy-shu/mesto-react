import React from 'react';

function Card(props) {

  const {
    card,
    onCardClick
  } = props

  //функция  вызова функции открытия попапа фото
  function handleImageClick() {
    onCardClick(card);
  }

  //возвращаем готовую карточку
  return (
    <div className="element">
      <img className="element__image" alt="изображение" src={card.link} onClick={handleImageClick} />
      <button className="element__delete" type="button"></button>
      <div className="element__text">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__interactivity">
          <button type="button" className="element__like"></button>
          <span className="element__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </div>
  )
}

export default Card;