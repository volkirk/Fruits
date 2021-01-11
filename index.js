// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const minWeightButton= document.querySelector('.minweight__input');
const maxWeightButton= document.querySelector('.maxweight__input');
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
 let fruit_listHTML= document.getElementById('fruits__list');
  fruit_listHTML.innerText='';
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits

  for (let i = 0; i < fruits.length; i++) {
  var li= fruit_listHTML.appendChild(document.createElement('li'));
  li.appendChild(document.createElement('div')).innerText='Индекс:'+ i;
  li.appendChild(document.createElement('div')).innerText='Фрукт:'+ fruits[i].kind;
  li.appendChild(document.createElement('div')).innerText='Цвет:'+ fruits[i].color;
  li.appendChild(document.createElement('div')).innerText='Вес:'+ fruits[i].weight;
  
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild
  }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.round(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  index =fruits.indexOf(fruits[getRandomInt(0,fruits.length)]);

  j=0;
  // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
  while (fruits.length>0) {
    if (index==-1) {
      index=0;
    }
    console.log(index+' index');
    result.splice(j,1,fruits[index]);
    console.log(result[0]+'result');
    fruits.splice(index,1);
    if (fruits[index]==undefined) {
      index--;
    }
    j++;
    
    // TODO: допишите функцию перемешивания массива
    //
    // Подсказка: находим случайный элемент из fruits, используя getRandomInt
    // вырезаем его из fruits и вставляем в result.
    // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
    // (массив fruits будет уменьшатся, а result заполняться)
  }
  fruits = result;
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

const filterFruits = () => {
  fruits = fruits.filter((item) => {
  return (item.weight >= minWeightButton.value && item.weight <= maxWeightButton.value);
  });
};

  filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a,b) => {
  return a.color > b.color ? true : false;
  // TODO: допишите функцию сравнения двух элементов по цвету
};

const sortAPI = {
  bubbleSort(fruits, comparation) {
    const n = fruits.length;
    // внешняя итерация по элементам
    for (let i = 0; i < n-1; i++) { 
        // внутренняя итерация для перестановки элемента в конец массива
        for (let j = 0; j < n-1-i; j++) { 
            // сравниваем элементы
            if (comparation(fruits[j], fruits[j+1])) { 
                // делаем обмен элементов
                let temp = fruits[j+1]; 
                fruits[j+1] = fruits[j]; 
                fruits[j] = temp; 
            }
        }
    }                    
    // TODO: допишите функцию сортировки пузырьком
  },

  //fast sort?
  
  // выполняет сортировку и производит замер времени
  startSort(sort, fruits, comparation) {
    const start = new Date().getTime();
    sort(fruits, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  if (sortKind=='bubleSort') {
    sortKind='quickSort';
  }
  else{
    sortKind='bubbleSort';
  }
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
});

sortActionButton.addEventListener('click', () => {
  sortTimeLabel.innerText='sorting...'
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  sortTimeLabel.innerText=sortTime;
  // TODO: вывести в sortTimeLabel значение sortTime
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  kind1 = kindInput.value;
  color1 = colorInput.value;
  weight1= weightInput.value;
  if (kind1,color1,weight1=='') {
    alert('Вы не ввели значение')
  }
  else{
  fruits.push({kind:kind1,color:color1,weight:weight1})
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  display();}
});
