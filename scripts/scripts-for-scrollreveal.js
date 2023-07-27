var anim = {
  delay: 500,
  distance: '200px', //пространство для маневра анимации
  duration: 500, //продолжительноть анимации
  easing: 'ease-in-out',
  rotate: { z: 10 }, //наклон 
  //rotate: {x: 65}, залитает ровно
  scale: 0.8, //
  mobile: true,
  //reset: true, //убирает при прокрутке
};
 
window.sr = ScrollReveal()
  .reveal( '.reveal', anim );    

/* Анимация поумолчанию
origin      : 'bottom',
distance    : '20px',
duration    : 500,
delay       : 0,
rotate      : { x: 0, y: 0, z: 0 },
opacity     : 0,
scale       : 0.9,
easing      : 'cubic-bezier( 0.6, 0.2, 0.1, 1 )',
 
Options
container   : null,
mobile      : true,
reset       : false,
useDelay    : 'always',
viewFactor  : 0.20,
viewOffset  : { top: 0, right: 0, bottom: 0, left: 0 },
afterReveal : function( domEl ) {},
afterReset  : function( domEl ) {}    

Описание параметра
параметр	Типы	Доступные значения	описание
origin	string	'top','right','bottom','left'	Направление анимации
distance	string	Можно использовать любое значение CSS-единицы, например: «20px», «10vw», «5%».	Анимированная дистанция
duration	number	500	Продолжительность анимации в миллисекундах
delay	number	0	Время задержки анимации, в миллисекундах
rotate	object/number	{ x: 0, y: 0, z: 0 }	Начальный угол, в градусах
opacity	number	0	Начальная прозрачность
scale	number	0.9	Начальное значение масштабирования
easing	string	'ease'
'ease'
'ease-out'
'ease-in-out'
'ease-in-out'	Эффектом замедления анимации может быть любое допустимое значение смягчения CSS
container	node	document.getElementById('foo')	контейнер
mobile	boolean	true / false	Отображать ли анимационные эффекты на мобильных телефонах
reset	boolean	true / false	Является ли элемент анимированным при прокрутке назад и вперед в пределах границы контейнера
useDelay	string	'always','once','onload'	Контроль, когда элемент использует задержку анимации
viewFactor	number	0.20	0,20 означает, что до того, как элемент анимирован, 20% его находится в пределах границы области просмотра или контейнера
viewOffset	object/number	{ top: 48, bottom: 24 }	Увеличить область просмотра или границы контейнера, единицы измерения
afterReveal	function	function( domEl ) {}	Функция обратного вызова срабатывает после раскрытия анимации
afterReset	function	function( domEl ) {}	Функция обратного вызова срабатывает после сброса анимации
*/  