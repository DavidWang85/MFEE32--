
const cardsArray = [
    {
        name: "black",
        img: "https://i.pinimg.com/474x/bf/b0/79/bfb0795cc824765cb73c493bd98ae449.jpg"
    },
    {
        name: "deadPool",
        img: "https://i.pinimg.com/474x/af/4b/f2/af4bf25a3cb7b13c32340428c1bf8243.jpg"
    },
    {
        name: "ironMan",
        img: "https://i.pinimg.com/474x/e7/92/30/e792308fa55fd36d9c534683f25358da.jpg"
    },
    {
        name: "venom",
        img: "https://i.pinimg.com/474x/0a/67/1f/0a671fb47b371083505fd5506272a658.jpg"
    },
    {
        name: "warMachine",
        img: "https://i.pinimg.com/564x/9d/98/22/9d982270cb7dec2c8a826f61d0d2b58a.jpg"
    },
    {
        name: "groot",
        img: "https://i.pinimg.com/474x/9f/46/80/9f46801d155197452acd67b79518fbb1.jpg"
    },
    {
        name: "spiderMan",
        img: "https://i.pinimg.com/474x/25/08/46/250846cf2b0235424544619fea38c792.jpg"
    },
    {
        name: "blackWindow",
        img: "https://i.pinimg.com/474x/88/af/96/88af96c282b2b00f4cb0f0e6b97d16b3.jpg"
    },
    {
        name: "doctorStrange",
        img: "https://i.pinimg.com/474x/28/ef/2b/28ef2bb6df320ca86348f9e83e84f44a.jpg"
    },
    {
        name: "wanda",
        img: "https://i.pinimg.com/474x/24/e1/44/24e144e3c3a3f6e4bfebdcb41aeaf02f.jpg"
    },
    {
        name: "thor",
        img: "https://i.pinimg.com/474x/6c/d3/da/6cd3daba9ab80ecb088a396fd7d1e862.jpg"
    }
];

var gameGrid = cardsArray.concat(cardsArray).sort(function () {
    return 0.5 - Math.random();
});

var firstGuess = "";
var secondGuess = "";
var count = 0;
var previousTarget = null;
var delay = 1000;

var game = document.querySelector("#game");
var grid = document.createElement("section");
grid.setAttribute("class", "userGrid");
game.appendChild(grid);

gameGrid.forEach(function (item) {
    var name = item.name
    var img = item.img;

    var card = document.createElement("div");
    card.classList.add("userCard");
    // card.classList.add("shake")
    // card.classList.add("shake-slow")


    card.dataset.name = name;

    var front = document.createElement("div");
    front.classList.add("front");

    var back = document.createElement("div");
    back.classList.add("back");
    back.style.backgroundImage = "url(" + img + ")";

    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
});
let userCards = document.querySelectorAll(".userCard");
let userCardNum = (userCards.length) / 2
console.log("物件", userCardNum)
var match = function match() {
    var selected = document.querySelectorAll(".userSelected");
    selected.forEach(function (card) {
        card.classList.add("match");
    });
};

var resetGuesses = function resetGuesses() {
    firstGuess = "";
    secondGuess = "";
    count = 0;
    previousTarget = null;

    var selected = document.querySelectorAll(".userSelected");
    selected.forEach(function (card) {
        card.classList.remove("userSelected");
    });
};

grid.addEventListener("click", function (event) {
    var clicked = event.target;

    if (
        clicked.nodeName === "SECTION" ||
        clicked === previousTarget ||
        clicked.parentNode.classList.contains("userSelected") ||
        clicked.parentNode.classList.contains("match")
    ) {
        return;
    }

    if (count < 2) {
        count++;
        if (count === 1) {
            firstGuess = clicked.parentNode.dataset.name;
            console.log(firstGuess);
            clicked.parentNode.classList.add("userSelected");
        } else {
            secondGuess = clicked.parentNode.dataset.name;
            console.log(secondGuess);
            clicked.parentNode.classList.add("userSelected");
        }

        if (firstGuess && secondGuess) {
            if (firstGuess !== secondGuess){
                wrongMusic.play();
            }
            if (firstGuess === secondGuess) {
                correctMusic.play();
                setTimeout(match, delay);
                userCardNum = userCardNum - 1;
                console.log("目前", userCardNum);
                //計算時間機器(結束)
                if (userCardNum === 0) {
                    openMusic.pause();
                    correctMusic.play();
                    end = new Date().getTime();
                    // console.log("結束時間", end);
                    totalTime = (end - start) / 1000;
                    // alert(`總共${totalTime}秒`)
                    //先顯示modal，並且把結算的時間settlementModal傳上去
                    var settlementModal = new bootstrap.Modal(document.getElementById('settlementModal'), { keyboard: false });
                    settlementModal.show();
                    let showTotalTime = document.querySelector("#showTotalTime");
                    showTotalTime.textContent = `成功破關，總共花${totalTime}秒`
                    let userTotalTime = document.querySelector("#userTotalTime");
                    userTotalTime.value = totalTime;
                    //把名字和秒數存到localStorage
                    // let userName = document.querySelector("#userName").value;
                    // localStorage.setItem(`David`, `${totalTime}`)

                }
            }
            setTimeout(resetGuesses, delay);
        }
        previousTarget = clicked;
    }
});
//計算時間機器(開始)
var start = 0;
var end = 0;
var totalTime = 0;
const startGame = document.querySelector('#startGame');
const openMusic = document.querySelector("#openMusic");
const correctMusic = document.querySelector("#correctMusic");
const wrongMusic = document.querySelector("#wrongMusic");
const rankModal = document.querySelector("#rankModal");


startGame.addEventListener("click", function () {
    console.log("開始計時");
    start = new Date().getTime();
    //開始背景音樂
    openMusic.play();
    console.log(start);
})

function nextPage() {
    var nextPage = new bootstrap.Modal(document.getElementById('nextPage'), { keyboard: false });
    nextPage.show();
    setTimeout("location.href = './poker-game.html'", 2000)
}
function startModal() {
    var startModal = new bootstrap.Modal(document.getElementById('startModal'), { keyboard: false });
    startModal.show();
}
startModal();



function setUserData() {
    let userName = document.querySelector("#userName").value;
    let obj = { userName, totalTime };
    let timeRack  = localStorage.getItem('time');
    if (timeRack){
        timeRack = JSON.parse(timeRack)
        timeRack.push(obj);
        localStorage.setItem('time', JSON.stringify(timeRack))
    }else{
        let objRack = obj;
        let arrRack = [objRack];
        localStorage.setItem('time', JSON.stringify(arrRack))
    }
    showRankModal();
}
function myRefresh() {
    window.location.reload();
}
function showRankModal(){
    var rankModal = new bootstrap.Modal(document.getElementById('rankModal'), { keyboard: false });
    rankModal.show();
    const showRack = document.querySelector("#showRack");
    let allRack = JSON.parse(localStorage.getItem('time'));
    console.log(allRack, allRack.length)
    let str = "";
    allRack.forEach(function(item){
        str += `<li>名字:${item.userName}，秒數:${item.totalTime}</li>`
        showRack.innerHTML = str;
    })
}
