let notificationsButton = document.querySelector('#notificationsBTN');
let notificationsList = document.querySelector('.notificationsList');


notificationsButton.addEventListener('click', ()=>{
    notificationsList.classList.toggle('showNotifications');
})