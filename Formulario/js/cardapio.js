import dataset from './model/dataset.js';
import foodModel from './model/foods.js';


function loadFoods() {
  if (localStorage.getItem('foods-app:loaded') !== 'ok') {
    foodModel.load(dataset);
    localStorage.setItem('foods-app:loaded', 'ok');
  }
  let foods = foodModel.readAll();

  for (const item of foods) {
    createFoodCardItem(item);
  }
}

function createFoodCardItem(item) {
  const foodsView =  `<div class="col-3 card my-1 mx-1 py-1 id="food-${item.id}"><br>
                    <img src="${item.image} " class="card-img-top" alt="..." height="220" width="260">
                    <div class="card-body">
                      <h5 class="card-title">${item.name}</h5>
                      <h5 class="card-title">R$ ${item.preco}</h5>
                      <p class="card-text">${item.description}</p>
                      <a href="#" class="btn btn-primary">Comprar</a><br>
                    </div>
                    </div>`;

  const foodsDeck = document.querySelector('.card-deck');

  foodsDeck.insertAdjacentHTML('beforeend', foodsView);
}

function ClearForm() {
  const foodNameInput = document.querySelector('#food-name');
  const foodImageInput = document.querySelector('#food-image');
  const foodDescriptionInput = document.querySelector('#food-description');
  const foodPrecoInput = document.querySelector('#food-preco');

  foodNameInput.value = '';
  foodImageInput.value = '';
  foodDescriptionInput.value = '';
  foodPrecoInput.value = '';
}

function loadFormCreateFood() {
  const foodForm = document.getElementById("foodForm");

  ClearForm();

  foodForm.onsubmit = function (event) {
    event.preventDefault();

    let newFood = Object.fromEntries(new FormData(foodForm));

    foodModel.create(newFood);

    const foodCard = createFoodCardItem(newFood);
    
    $('#formFoodModal').modal('toggle');
  }
}

window.loadFormCreateFood = loadFormCreateFood;
window.ClearForm = ClearForm;

loadFoods();
