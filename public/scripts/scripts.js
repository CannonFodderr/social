let notificationsButton = document.querySelector('#notificationsBTN');
let notificationsList = document.querySelector('.notificationsList');
let items = document.querySelectorAll('.notificationsItem');

notificationsButton.addEventListener('click', ()=>{
    notificationsList.classList.toggle('showNotifications');
    // notificationsList.classList.toggle('showMe');
});

items.forEach((item)=> {
    item.addEventListener('click', ()=>{
        item.style.display = none;
    })
})

items.forEach((item)=>{
    item.addEventListener('click', ()=>{
        item.style.background = "green";
        setTimeout(function(){
            item.remove(this);
        }, 1000)
    })
});