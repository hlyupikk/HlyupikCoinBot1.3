// Получаем элементы
const coinCountElement = document.getElementById('coin-count');
const clickButton = document.getElementById('click-button');
const shopItems = document.querySelectorAll('.shop-item');

// Загружаем сохранённые данные из Local Storage
let coinCount = parseInt(localStorage.getItem('coinCount')) || 0;
let currentSkin = localStorage.getItem('currentSkin') || 'default';
let clickMultiplier = parseFloat(localStorage.getItem('clickMultiplier')) || 1;

// Устанавливаем количество монет на экране и применяем текущий скин
coinCountElement.textContent = coinCount;
applySkin(currentSkin);

// Функция для применения выбранного скина
function applySkin(skin) {
    let skinUrl;

    if (skin === 'default') {
        skinUrl = 'https://www.pngall.com/wp-content/uploads/4/Empty-Gold-Coin-PNG-Image.png'; // Дефолтное изображение
    } else if (skin === 'skin1') {
        skinUrl = 'https://avatanplus.com/files/resources/original/58ee47571b77e15b62c6ac49.png'; // Красный фон
    } else if (skin === 'skin2') {
        skinUrl = 'https://i.pinimg.com/originals/a7/05/62/a7056242ebcc48c77648886ca978d12e.png'; // Зеленый фон
    } else if (skin === 'skin3') {
        skinUrl = 'https://obolon.ua/img/products/14942.png'; // Синий фон
    } else {
        console.error('Unknown skin:', skin);
        return;
    }

    // Применяем фоновое изображение к кнопке
    clickButton.style.backgroundImage = `url('${skinUrl}')`;
}

// Обрабатываем клики по кнопке
clickButton.addEventListener('click', () => {
    coinCount += clickMultiplier;
    coinCountElement.textContent = coinCount;
    localStorage.setItem('coinCount', coinCount);
});

// Обработка выбора магазина
shopItems.forEach(item => {
    item.addEventListener('click', () => {
        const type = item.dataset.type;
        if (type === 'skin') {
            const skin = item.dataset.skin;
            const price = skin === 'skin1' ? 100 : (skin === 'skin2' ? 250 : 500);
            if (coinCount >= price) {
                // Снимаем монеты за покупку
                coinCount -= price;
                coinCountElement.textContent = coinCount;
                localStorage.setItem('coinCount', coinCount);

                // Применяем и сохраняем новый скин
                currentSkin = skin;
                applySkin(currentSkin);
                localStorage.setItem('currentSkin', currentSkin);
            } else {
                alert('Недостаточно Хлюпиков!');
            }
        } else if (type === 'upgrade') {
            const multiplier = parseFloat(item.dataset.multiplier);
            const price = multiplier === 2 ? 150 : (multiplier === 3 ? 500 : 1000);
            if (coinCount >= price) {
                // Снимаем монеты за покупку
                coinCount -= price;
                coinCountElement.textContent = coinCount;
                localStorage.setItem('coinCount', coinCount);

                // Применяем и сохраняем новый множитель
                clickMultiplier = multiplier;
                localStorage.setItem('clickMultiplier', clickMultiplier);
            } else {
                alert('Недостаточно Хлюпиков!');
            }
        }
    });
});
