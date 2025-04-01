document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-button');
    const pageTitle = document.getElementById('page-title');
    const cancelButton = document.getElementById('cancel-button');
    const recordForm = document.getElementById('record-form');
    const createFooter = document.getElementById('create-footer');
    const consumableType = document.getElementById('consumable-type');
    const specificFields = document.getElementById('specific-fields');

    // Устанавливаем активную кнопку по умолчанию (Создать запись)
    document.querySelector('.nav-button[data-page="create"]').classList.add('active');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Снимаем активное состояние со всех кнопок
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Обновляем заголовок страницы и показываем соответствующий раздел
            const page = button.getAttribute('data-page');
            switch (page) {
                case 'create':
                    pageTitle.textContent = 'Создать запись';
                    showCreateRecord();
                    break;
                case 'checkpoint':
                    pageTitle.textContent = 'Проверка';
                    showOtherSection();
                    break;
                case 'history':
                    pageTitle.textContent = 'История';
                    showOtherSection();
                    break;
                case 'settings':
                    pageTitle.textContent = 'Настройки';
                    showOtherSection();
                    break;
                default:
                    pageTitle.textContent = '';
            }
        });
    });

    function showCreateRecord() {
        recordForm.style.display = 'block';
        cancelButton.classList.add('hidden');
        updateFooterVisibility();
    }

    function showOtherSection() {
        recordForm.style.display = 'none';
        cancelButton.classList.add('hidden');
        createFooter.style.display = 'none';
    }

    // При клике по форме показываем кнопку отмены
    recordForm.addEventListener('click', () => {
        cancelButton.classList.remove('hidden');
    });

    // Обработка нажатия кнопки отмены: сбрасываем форму и скрываем футер
    cancelButton.addEventListener('click', () => {
        recordForm.reset();
        specificFields.innerHTML = '';
        cancelButton.classList.add('hidden');
        createFooter.style.display = 'none';
        // Возвращаемся к разделу "Создать запись"
        document.querySelector('.nav-button[data-page="create"]').classList.add('active');
        pageTitle.textContent = 'Создать запись';
    });

    // Обновляем специфичные поля и футер при изменении типа расходника
    consumableType.addEventListener('change', updateSpecificFields);

    function updateSpecificFields() {
        const selected = consumableType.value;
        specificFields.innerHTML = getFieldsHTML(selected);
        updateFooterVisibility();
    }

    function updateFooterVisibility() {
        // Если выбран тип расходника, показываем футер с кнопками, иначе скрываем
        if (consumableType.value !== "") {
            createFooter.style.display = 'flex';
        } else {
            createFooter.style.display = 'none';
        }
    }

    function getFieldsHTML(option) {
        switch (option) {
            case 'oil_engine':
                return `
            <div class="form-group">
              <label for="date-oil_engine">Дата</label>
              <input type="date" id="date-oil_engine">
            </div>
            <div class="form-group">
              <label for="mileage-oil_engine">Пробег</label>
              <input type="number" id="mileage-oil_engine" placeholder="Пробег">
            </div>
            <div class="form-group">
              <label for="oil-type-oil_engine">Тип масла</label>
              <input type="text" id="oil-type-oil_engine" placeholder="Тип масла">
            </div>
            <div class="form-group">
              <label for="cost-oil_engine">Стоимость</label>
              <input type="number" id="cost-oil_engine" placeholder="Стоимость">
            </div>
            <div class="form-group">
              <label for="comment-oil_engine">Комментарий</label>
              <textarea id="comment-oil_engine" placeholder="Комментарий"></textarea>
            </div>
          `;
            case 'oil_filter':
            case 'air_filter':
            case 'cabin_filter':
            case 'fuel_filter':
            case 'coolant':
            case 'brake_fluid':
            case 'power_steering_fluid':
                return `
            <div class="form-group">
              <label for="date-${option}">Дата</label>
              <input type="date" id="date-${option}">
            </div>
            <div class="form-group">
              <label for="mileage-${option}">Пробег</label>
              <input type="number" id="mileage-${option}" placeholder="Пробег">
            </div>
            <div class="form-group">
              <label for="cost-${option}">Стоимость</label>
              <input type="number" id="cost-${option}" placeholder="Стоимость">
            </div>
            <div class="form-group">
              <label for="comment-${option}">Комментарий</label>
              <textarea id="comment-${option}" placeholder="Комментарий"></textarea>
            </div>
          `;
            case 'transmission_oil':
                return `
            <div class="form-group">
              <label for="date-transmission_oil">Дата</label>
              <input type="date" id="date-transmission_oil">
            </div>
            <div class="form-group">
              <label for="mileage-transmission_oil">Пробег</label>
              <input type="number" id="mileage-transmission_oil" placeholder="Пробег">
            </div>
            <div class="form-group">
              <label for="oil-type-transmission_oil">Тип масла</label>
              <input type="text" id="oil-type-transmission_oil" placeholder="Тип масла">
            </div>
            <div class="form-group">
              <label for="cost-transmission_oil">Стоимость</label>
              <input type="number" id="cost-transmission_oil" placeholder="Стоимость">
            </div>
            <div class="form-group">
              <label for="comment-transmission_oil">Комментарий</label>
              <textarea id="comment-transmission_oil" placeholder="Комментарий"></textarea>
            </div>
          `;
            case 'brake_system':
                return `
            <div class="form-group">
              <label for="date-brake_system">Дата</label>
              <input type="date" id="date-brake_system">
            </div>
            <div class="form-group">
              <label for="mileage-brake_system">Пробег</label>
              <input type="number" id="mileage-brake_system" placeholder="Пробег">
            </div>
            <div class="form-group">
              <label for="axis-brake_system">Ось</label>
              <select id="axis-brake_system">
                <option value="front">Передняя</option>
                <option value="rear">Задняя</option>
              </select>
            </div>
            <div class="form-group">
              <label for="cost-brake_system">Цена</label>
              <input type="number" id="cost-brake_system" placeholder="Цена">
            </div>
            <div class="form-group">
              <label for="comment-brake_system">Комментарий</label>
              <textarea id="comment-brake_system" placeholder="Комментарий"></textarea>
            </div>
          `;
            case 'shock_absorbers':
            case 'suspension_components':
            case 'alignment':
                return `
            <div class="form-group">
              <label for="date-${option}">Дата</label>
              <input type="date" id="date-${option}">
            </div>
            <div class="form-group">
              <label for="mileage-${option}">Пробег</label>
              <input type="number" id="mileage-${option}" placeholder="Пробег">
            </div>
            <div class="form-group">
              <label for="cost-${option}">Стоимость</label>
              <input type="number" id="cost-${option}" placeholder="Стоимость">
            </div>
            <div class="form-group">
              <label for="comment-${option}">Комментарий</label>
              <textarea id="comment-${option}" placeholder="Комментарий"></textarea>
            </div>
          `;
            case 'tire_change':
                return `
            <div class="form-group">
              <label for="date-tire_change">Дата</label>
              <input type="date" id="date-tire_change">
            </div>
            <div class="form-group">
              <label for="mileage-tire_change">Пробег</label>
              <input type="number" id="mileage-tire_change" placeholder="Пробег">
            </div>
            <div class="form-group">
              <label for="brand-tire_change">Бренд</label>
              <input type="text" id="brand-tire_change" placeholder="Бренд">
            </div>
            <div class="form-group">
              <label for="cost-tire_change">Стоимость</label>
              <input type="number" id="cost-tire_change" placeholder="Стоимость">
            </div>
            <div class="form-group">
              <label for="comment-tire_change">Комментарий</label>
              <textarea id="comment-tire_change" placeholder="Комментарий"></textarea>
            </div>
          `;
            case 'tire_purchase':
                return `
            <div class="form-group">
              <label for="date-tire_purchase">Дата</label>
              <input type="date" id="date-tire_purchase">
            </div>
            <div class="form-group">
              <label for="mileage-tire_purchase">Пробег</label>
              <input type="number" id="mileage-tire_purchase" placeholder="Пробег">
            </div>
            <div class="form-group">
              <label for="model-tire_purchase">Модель</label>
              <input type="text" id="model-tire_purchase" placeholder="Модель">
            </div>
            <div class="form-group">
              <label for="cost-tire_purchase">Стоимость</label>
              <input type="number" id="cost-tire_purchase" placeholder="Стоимость">
            </div>
            <div class="form-group">
              <label for="comment-tire_purchase">Комментарий</label>
              <textarea id="comment-tire_purchase" placeholder="Комментарий"></textarea>
            </div>
          `;
            case 'battery':
                return `
            <div class="form-group">
              <label for="date-battery">Дата установки</label>
              <input type="date" id="date-battery" value="${new Date().toISOString().split('T')[0]}">
            </div>
            <div class="form-group">
              <label for="capacity-battery">Ёмкость</label>
              <input type="text" id="capacity-battery" placeholder="Ёмкость">
            </div>
            <div class="form-group">
              <label for="brand-battery">Марка</label>
              <input type="text" id="brand-battery" placeholder="Марка">
            </div>
            <div class="form-group">
              <label for="action-battery">Проверка или замена</label>
              <select id="action-battery">
                <option value="check">Проверка</option>
                <option value="replace">Замена</option>
              </select>
            </div>
            <div class="form-group">
              <label for="comment-battery">Комментарий</label>
              <textarea id="comment-battery" placeholder="Комментарий"></textarea>
            </div>
          `;
            case 'other_timing':
            case 'other_spark':
            case 'other_injectors':
            case 'other_radiator':
            case 'other_cleaning':
            case 'other_additional':
                return `
            <div class="form-group">
              <label for="date-${option}">Дата</label>
              <input type="date" id="date-${option}">
            </div>
            <div class="form-group">
              <label for="mileage-${option}">Пробег</label>
              <input type="number" id="mileage-${option}" placeholder="Пробег">
            </div>
            <div class="form-group">
              <label for="cost-${option}">Стоимость</label>
              <input type="number" id="cost-${option}" placeholder="Стоимость">
            </div>
            <div class="form-group">
              <label for="comment-${option}">Комментарий</label>
              <textarea id="comment-${option}" placeholder="Комментарий"></textarea>
            </div>
          `;
            case 'ac_refill':
                return `
            <div class="form-group">
              <label for="date-ac_refill">Дата</label>
              <input type="date" id="date-ac_refill">
            </div>
            <div class="form-group">
              <label for="mileage-ac_refill">Пробег</label>
              <input type="number" id="mileage-ac_refill" placeholder="Пробег">
            </div>
            <div class="form-group">
              <label for="volume-ac_refill">Объём заправленного фреона</label>
              <input type="number" id="volume-ac_refill" placeholder="Объём">
            </div>
            <div class="form-group">
              <label for="cost-ac_refill">Стоимость</label>
              <input type="number" id="cost-ac_refill" placeholder="Стоимость">
            </div>
            <div class="form-group">
              <label for="comment-ac_refill">Комментарий</label>
              <textarea id="comment-ac_refill" placeholder="Комментарий"></textarea>
            </div>
          `;
            default:
                return '';
        }
    }
});