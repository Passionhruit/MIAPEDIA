// 영화 리스트 보여주기
function showMovieList(val) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YmVjM2U3MzdhYzIyZDQxOGExZTBmNGRmZTEzNTY3ZiIsInN1YiI6IjY0NzFiZjQ0YmUyZDQ5MDExNmM4YTk2MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JvZ2uXWJg9pC1AfqkJeUENhOZIGdg7e9flH1BDoX6ME",
    },
  };

  fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  )
    .then((response) => response.json())
    .then((data) => {
      let results = data["results"];
      results.map((a, i) => {
        let title = a["title"];
        let id = a["id"];
        let overview = a["overview"];
        let date = a["release_date"];
        let average = a["vote_average"];
        let poster = `https://image.tmdb.org/t/p/w200` + a["poster_path"];
        let rank = i + 1;
        // 대소문자 구분 없이 입력한 제목에 따른 영화 검색하기
        if (title.toLowerCase().includes(val.toLowerCase().trim())) {
          const movieInfo = document.createElement("li");
          movieInfo.innerHTML = ` <div class= "wrap">
			                              <img src=${poster} alt="Movie Poster">
                                    <h3>${rank}</h3>
			                              <span>${overview}</span>
                                    <p>${id}</p>
			                            </div>
			                            <h2>${title}</h2>
			                            <p>개봉 ${date} 평점 ${average}</p>
                                  <button class="detailBtn">상세보기</button>`;
          document.querySelector("#movieList").appendChild(movieInfo);

          // 상세페이지 버튼마다 다른 id 값 경로생성
          const detailBtn = movieInfo.querySelector(".detailBtn");
          detailBtn.addEventListener("click", function () {
            const myPage = `index2.html?id=${id}`;
            window.location.href = myPage;
          });
        }
      });
    })
    .catch((err) => console.error(err));
}

// "" 가 입력된 상태로 함수 실행 --> 영화 전체목록 보여줌
showMovieList("");

// 영화 검색기능
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", showSearchList);

function showSearchList(e) {
  movieList.innerHTML = ""; // 빈 여백값으로 만듬
  e.preventDefault(); // 브라우저의 기본동작 제한, 폼 제출시 페이지가 새로고침 되는 것을 막음
  const val = searchInput.value;
  showMovieList(val);
}

// id 조회기능
const movieList = document.getElementById("movieList");
function showMovieInfo(e) {
  const wrapElement = e.target.closest(".wrap");
  if (wrapElement) {
    const title = wrapElement.nextElementSibling.textContent;
    const id = wrapElement.querySelector("p").textContent;

    alert(`"${title}" 의 id는 "${id}" 입니다.`);
  }
}
movieList.addEventListener("click", showMovieInfo);

// 페이지 로드시 커서 입력창에 위치
window.onload = function () {
  searchInput.focus();
};

// topBtn 클릭시 페이지 최상단으로 이동 (화살표함수)
const topBtn = document.getElementById("topBtn");
const showTopPage = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

topBtn.addEventListener("click", showTopPage);

// 슬라이드 기능

var slides,
  slide,
  currentIdx = 0,
  slideCount,
  slideWidth = 200,
  slideMargin = 30,
  prevBtn,
  nextBtn;

window.onload = function () {
  slides = document.querySelector(".slides");
  slide = document.querySelectorAll(".slides li");
  slideCount = slide.length;
  prevBtn = document.querySelector(".prev");
  nextBtn = document.querySelector(".next");

  makeClone();
};

// 슬라이드의 복사본을 만들어 앞또는 뒤에 추가
function makeClone() {
  // 뒷부분의 복사본
  console.log(slide);
  for (var i = 0; i < slideCount; i++) {
    // a.cloneNode() => a 요소를 그대로 복사
    // a.cloneNode(true) => a 뿐만 아니라 a 의 자식 모두 복사
    var cloneSlide = slide[i].cloneNode(true);
    cloneSlide.classList.add("clone");
    // slides (ul) 태그에 복사본을 넣어줌
    slides.appendChild(cloneSlide);
  }
  // 앞부분의 복사본 5,4,3,2,1 순서
  for (var i = slideCount - 1; i >= 0; i--) {
    var cloneSlide = slide[i].cloneNode(true);
    cloneSlide.classList.add("clone");
    slides.prepend(cloneSlide);
  }
  updateWidth();
  setInitialPos();
  setTimeout(function () {
    slides.classList.add("animated");
  }, 100);
}

// 요소가 일렬로 서있도록 요소를 감싼 너비를 모든요소값+마진값으로 변경
function updateWidth() {
  var currentSlides = document.querySelectorAll(".slides li");
  var newSlideCount = currentSlides.length;
  var newWidth =
    (slideWidth + slideMargin) * newSlideCount - slideMargin + "px";
  slides.style.width = newWidth;
}

//초기 위치를 slide 01 부터
function setInitialPos() {
  var initialTranslateValue = -(slideWidth + slideMargin) * slideCount;
  // slides {transform:translateX(-1000px);}
  slides.style.transform = `translateX(${initialTranslateValue}px)`;
}

document.querySelector(".next").addEventListener("click", function () {
  moveSlide(currentIdx + 5);
});

document.querySelector(".prev").addEventListener("click", function () {
  moveSlide(currentIdx - 5);
});

// 좌우로 움직임
function moveSlide(num) {
  slides.style.left = -num * (slideWidth + slideMargin) + "px";
  currentIdx = num;
  if (Math.abs(currentIdx) == slideCount) {
    setTimeout(function () {
      slides.classList.remove("animated");
      slides.style.left = "0px";
      currentIdx = 0;
    }, 800);
    setTimeout(function () {
      slides.classList.add("animated");
    }, 1000);
  }
}
