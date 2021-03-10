// var $body = document.body,
//     $cards = document.querySelectorAll(".card");

// $body.addEventListener("mousemove", (e) => {
//     xAxes = ((innerWidth / 2) - e.clientX) / ((innerWidth / 2) / 50);
//     yAxes = ((innerHeight / 2) - e.clientY) / ((innerHeight / 2) / 20);

//     for (var i = 0; i < $cards.length; i++) {
//         $cards[i].style.transform = `rotateY(${xAxes}deg) rotateX(${yAxes}deg)`;
//     }

// })
// $body.addEventListener("mouseout", (e) => {
//     if (!$body.contains(e.toElement)) {
//         for (var i = 0; i < $cards.length; i++) {
//             $cards[i].style.transition = `0.2s `;
//             $cards[i].style.transform = ``;
//         }

//     }

// })

// for (i = 0; i < $cards.length; i++) {
//     (function es() {
//         var $card = $cards[i];
//         $card.addEventListener("mouseenter", function (e) {
//             // this.style.transform = `rotateY(${xAxes}deg) rotateX(${yAxes}deg)`;
//             $card.querySelector("img").style.transform = "translate3d(0,-20px,170px) rotateZ(-50deg)";
//             $card.querySelector(".title").style.transform = "translateZ(140px)";
//             $card.querySelector(".desc").style.transform = "translateZ(120px)";
//             $card.querySelector(".main-L").style.transform = "translateZ(100px)";
//             $card.querySelector("ul").style.transform = "translateZ(80px)";
//             $card.querySelector("button").style.transform = "translateZ(140px)";

//             console.log("in", e);

//         })
//         $card.addEventListener("mouseout", function (e) {
//             if (!$card.contains(e.toElement)) {

//                 $card.querySelector("img").style.transform = "";
//                 $card.querySelector(".title").style.transform = "";
//                 $card.querySelector(".desc").style.transform = "";
//                 $card.querySelector(".main-L").style.transform = "";
//                 $card.querySelector("ul").style.transform = "";
//                 $card.querySelector("button").style.transform = "";

//                 console.log("out", e);
//             }
//             // this.style.transform = `rotateY(${xAxes}deg) rotateX(${yAxes}deg)`;

//         })
//     })()
// }
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('sw.js').then(function (registration) {
            // Registration was successful
            console.log('Registered!');
        }, function (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        }).catch(function (err) {
            console.log(err);
        });
    });
} else {
    console.log('service worker is not supported');
}

let deferredPrompt;
const pwaPrompt = document.querySelector('.pwa-prompt');
const addBtn = document.querySelector('.pwa-prompt .btns .accept-button');
const rejectBtn = document.querySelector('.pwa-prompt .btns .reject-button');

window.addEventListener('appinstalled', (e) => {
    console.log(21);
    pwaPrompt.style.display = 'none';
});
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if(document.cookie.split(";").indexOf("PWA_Rejec=true") == -1 && document.cookie.split(";").indexOf(" PWA_Rejec=true") == -1 ){
        pwaPrompt.style.display = 'block';
    }
      
    addBtn.addEventListener('click', (e) => {
      pwaPrompt.style.display = 'none';
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }
          deferredPrompt = null;
        });
    });

    rejectBtn.addEventListener('click', (e) => {
        document.cookie = "PWA_Rejec=true; expires="+new Date(Date.now() + (1000 * 60 * 60 * 24 * 30)).toString()+"; path=/";
        pwaPrompt.style.display = 'none';
      });
  
  });
  
  // When you want to trigger prompt:
// console.log("worker");
// window.addEventListener('beforeinstallprompt', (e) => {
//     // Prevent Chrome 67 and earlier from automatically showing the prompt
//     e.preventDefault();
//     // Stash the event so it can be triggered later.
//     deferredPrompt = e;
//     // Update UI to notify the user they can add to home screen
//     addBtn.style.display = 'block';

//     addBtn.addEventListener('click', (e) => {
//         // hide our user interface that shows our A2HS button
//         addBtn.style.display = 'none';
//         // Show the prompt
//         deferredPrompt.prompt();
//         // Wait for the user to respond to the prompt
//         deferredPrompt.userChoice.then((choiceResult) => {
//             if (choiceResult.outcome === 'accepted') {
//             console.log('User accepted the A2HS prompt');
//             } else {
//             console.log('User dismissed the A2HS prompt');
//             }
//             deferredPrompt = null;
//         });
//     });
//     });
