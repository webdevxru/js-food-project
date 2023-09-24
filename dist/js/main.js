window.addEventListener("DOMContentLoaded", () => {
  //tabs
  let tabs = document.querySelectorAll(".tabheader__item");
  let tabsContent = document.querySelectorAll(".tabcontent");

  let tabsParent = document.querySelector(".tabheader__items");

  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.style.display = "none";
    });
    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }
  function showTabContent(i = 0) {
    tabsContent[i].style.display = "block";
    tabs[i].classList.add("tabheader__item_active");
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener("click", (event) => {
    const target = event.target;
    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (target === item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
  //TImer
  const deadline = "2028-09-25"; //отправная точка

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor(((t / 1000) * 60 * 60) % 24),
      minutes = Math.floor((t / 1000 / 60) % 60),
      seconds = Math.floor((t / 1000) % 60);

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      days: days,
      seconds: seconds,
    };
  }
  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateLock, 1000);

    updateLock();

    function updateLock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = t.days;
      hours.innerHTML = t.hours;
      minutes.innerHTML = t.minutes;
      seconds.innerHTML = t.seconds;

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(".timer", deadline);
});
//modal

const modalTrigger = document.querySelectorAll("[data-modal]"),
  modal = document.querySelector(".modal"),
  modalCloseBtn = document.querySelector("[data-close]");

modalTrigger.forEach((btn) => {
  btn.addEventListener("click", () => {
    modal.classList.toggle("show");
    document.body.style.overflow = "hidden";
  });
});
function closeModal() {
    modal.classList.toggle("show");
    //восстановление скролла при закрытия окна
    document.body.style.overflow = "";
}
modalCloseBtn.addEventListener("click", closeModal);



modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

document.addEventListener('keydown', (e) => {
  if(e.code === "Escape" && modal.classList.contains('show')) {
    closeModal();
  }
})