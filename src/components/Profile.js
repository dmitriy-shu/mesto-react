import React from 'react';
import defaultAvatar from "../images/avatar.jpg";

export default function Profile(props) {
  const { onEditAvatar, onEditProfile, onAddPlace } = props
  const { avatar, name, description } = props.user

  return (
    <section className="profile">
      <div className="profile__image">
        <img className="profile__avatar" src={ defaultAvatar || avatar } alt="аватар"/>
        <button onClick={ onEditAvatar } className="profile__avatar-edit"/>
      </div>
      <div className="profile__info">
        <h1 className="profile__title">{ name }</h1>
        <button onClick={ onEditProfile } type="button" className="profile__edit-button"/>
        <p className="profile__subtitle">{ description }</p>
      </div>
      <button onClick={ onAddPlace } type="button" className="profile__add-button"/>
    </section>
  )
}