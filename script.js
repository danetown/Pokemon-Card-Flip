"use strict";

const cards = document.querySelectorAll(".card");
const cardFront = document.querySelectorAll(".card-front");
const cardBack = document.querySelectorAll(".card-back");
const cardContainer = document.querySelector(".card-container");
const newGame = document.querySelector(".btn");
const cardBackpic = document.querySelectorAll(".card-back-pic");
const scoreTrack = document.querySelector(".Score");

const numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];
let score = 0;
let highScore = 20;
let matchedCards = 0;

function fillslots() {
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  cardBackpic.forEach((pic, index) => {
    pic.src = `pokemon${numbers[index]}.jpeg`;
  });
}

fillslots();

let flipped = [];

cardContainer.addEventListener("click", function (e) {
  const target = e.target;

  if (target.classList.contains("card-front")) {
    const card = target.parentNode;

    if (!card.classList.contains("flipped") && flipped.length < 2) {
      card.classList.add("flipped");
      flipped.push(card);
      console.log(flipped);

      if (flipped.length === 2) {
        const card1Value = flipped[0].querySelector(".card-back-pic").src;
        const card2Value = flipped[1].querySelector(".card-back-pic").src;

        if (card1Value === card2Value) {
          flipped.forEach((card) => {
            card.classList.add("matched");
            matchedCards++;
            win();
          });
        } else if (card1Value !== card2Value) {
          flipped.forEach((card) => {
            setTimeout(() => {
              card.classList.remove("flipped");

              card.querySelector(".card-front").classList.remove("hidden");
              setTimeout(() => {
                card.querySelector(".card-back").classList.add("hidden");
              }, 250);
            }, 1000);
          });
        }

        flipped = [];
        score++;
        console.log(score);
        scoreTrack.textContent = `Score: ${score}`;
      }
    }
  }
});

function win() {
  cards.forEach((card) => {
    if (card.classList.contains("matched")) {
      console.log(`${matchedCards}`);
    }
  });

  if (matchedCards === numbers.length) {
    setTimeout(() => {
      document.querySelector(".fire").classList.remove("hidden");
    }, 1000);

    if (score < highScore) {
      highScore = score;
      document.querySelector(".HighScore").textContent = `Highscore: ${
        highScore + 1
      }`;
    }
  }
}

cards.forEach((card, index) => {
  card.addEventListener("click", () => {
    setTimeout(() => {
      cardBack[index].classList.remove("hidden");
      console.log(cardBack[index].textContent);
    }, 250);
  });
});
win();

newGame.addEventListener("click", function () {
  score = 0;
  scoreTrack.textContent = `Score: ${score} `;
  cardBack.forEach((card) => {
    if (!card.classList.contains("hidden")) {
      card.classList.add("hidden");
    }
  });
  cards.forEach((card) => {
    card.classList.remove("matched");
    card.classList.remove("flipped");
  });
  matchedCards = 0;
  fillslots();
  document.querySelector(".fire").classList.add("hidden");
});
