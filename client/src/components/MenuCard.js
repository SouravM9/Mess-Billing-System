import React from 'react';

function MenuCard() {
  return (
    <div className='container text-center'>
      <h1>Menu Card</h1>
      <img
        src='https://res.cloudinary.com/dji1pwzqq/image/upload/v1683275353/ix892-1y5go_page-0001_tmpu7o.jpg'
        className='menu'
        alt='Menu'
        style={
            {
                width: '50%'
            }
        }
      />
    </div>
  );
}

export default MenuCard;
