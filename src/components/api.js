//функция проверки 
function checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
 }

//загрузка карточек с сервера
export const getInitialCards = () => {
    return fetch('https://nomoreparties.co/v1/wff-cohort-10/cards', {
    headers: {
        authorization: '890c8242-590d-450e-b7b0-73fd2e81f605'
    }
    })
    .then(res => checkResponse(res))
};

//загрузка информации о пользователе с сервера
export const getUserInformation = () => {
    return fetch('https://nomoreparties.co/v1/wff-cohort-10/users/me', {
    headers: {
        authorization: '890c8242-590d-450e-b7b0-73fd2e81f605'
    }
    })
    .then(res => checkResponse(res))
};

//отправка новой автарки на сервер
export const patchAvatar = (url) => {
    return fetch('https://nomoreparties.co/v1/wff-cohort-10/users/me/avatar', {
        method: 'PATCH',
        headers: {
            authorization: '890c8242-590d-450e-b7b0-73fd2e81f605',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: url
        })
    })
    .then(res => checkResponse(res))
};

//отправка данных о пользователе на сервер
export const patchUserInformation = (name, job) => {
    return fetch('https://nomoreparties.co/v1/wff-cohort-10/users/me', {
        method: 'PATCH',
        headers: {
            authorization: '890c8242-590d-450e-b7b0-73fd2e81f605',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            about: job
        })
    })
    .then(res => checkResponse(res))
};

//отправка карточки на сервер 
export const postInitialCard = (body) => {
    return fetch('https://nomoreparties.co/v1/wff-cohort-10/cards', {
        method: 'POST',
        headers: {
            authorization: '890c8242-590d-450e-b7b0-73fd2e81f605',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(res => checkResponse(res))
};

//удаление созданной карточки карточки 
export const deleteCardApi = (idCard) => {
    return fetch(`https://nomoreparties.co/v1/wff-cohort-10/cards/${idCard}`, {
        method: 'DELETE',
        headers: {
            authorization: '890c8242-590d-450e-b7b0-73fd2e81f605'
        }
    })
    .then(res => checkResponse(res))
};

//если лайкнул карточку
export const putLIkeCard = (idCard) => {
    return fetch(`https://nomoreparties.co/v1/wff-cohort-10/cards/likes/${idCard}`, {
        method: 'PUT', 
        headers: {
            authorization: '890c8242-590d-450e-b7b0-73fd2e81f605',
            'Content-Type': 'application/json'
        }
    })
    .then(res => checkResponse(res))
};

//если отменил лайк карточки
export const deleteLIkeCard = (idCard) => {
    return fetch(`https://nomoreparties.co/v1/wff-cohort-10/cards/likes/${idCard}`, {
        method: 'DELETE', 
        headers: {
            authorization: '890c8242-590d-450e-b7b0-73fd2e81f605',
        }
    })
    .then(res => checkResponse(res))
}