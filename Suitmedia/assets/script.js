// Header
const header = document.getElementById('header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > lastScrollTop) {
    header.style.top = '-80px';
  } else {
    header.style.top = '0';
  }

  lastScrollTop = scrollTop;
});


// CMS
const bannerImageUrl = "assets/img/ide.jpeg";

const bannerImageContainer = document.getElementById("banner-image-container");
const bannerImage = document.createElement("img");
bannerImage.src = bannerImageUrl;
bannerImageContainer.insertBefore(bannerImage, bannerImageContainer.firstChild);


// LIST POST
function parseDate(dateString) {
  var parts = dateString.split(" ");
  var monthNames = [
    "JANUARI",
    "FEBRUARI",
    "MARET",
    "APRIL",
    "MEI",
    "JUNI",
    "JULI",
    "AGUSTUS",
    "SEPTEMBER",
    "OKTOBER",
    "NOVEMBER",
    "DESEMBER",
  ];

  var month = monthNames.indexOf(parts[1].toUpperCase());
  var day = parseInt(parts[0]);
  var year = parseInt(parts[2]);

  return new Date(year, month - 1, day);
}

var pageSize = 10; 

function updatePageSize() {
  pageSize = parseInt(document.getElementById("itemsPerPage").value);
  renderPage();
}

function sortByLatest() {
  var postRows = document.querySelectorAll(".post-row");
  var sortedRows = Array.from(postRows).sort(function (a, b) {
    var dateA = parseDate(a.querySelector(".post-time").innerText);
    var dateB = parseDate(b.querySelector(".post-time").innerText);
    return dateB - dateA;
  });

  renderPage(sortedRows);
}

function sortByOldest() {
  var postRows = document.querySelectorAll(".post-row");
  var sortedRows = Array.from(postRows).sort(function (a, b) {
    var dateA = parseDate(a.querySelector(".post-time").innerText);
    var dateB = parseDate(b.querySelector(".post-time").innerText);
    return dateA - dateB;
  });

  renderPage(sortedRows);
}

function renderPage(sortedRows) {
  var listPost = document.getElementById("list-post");
  listPost.innerHTML = "";

  for (var i = 0; i < Math.min(sortedRows.length, pageSize); i++) {
    listPost.appendChild(sortedRows[i]);
  }
}

var currentPage = 1;
var pageSize = 10;
var totalItems;
var totalPages;

function updatePageSize() {
  pageSize = parseInt(document.getElementById("itemsPerPage").value);
  renderPage();
}

function renderPage(sortedRows) {
  var listPost = document.getElementById("list-post");
  listPost.innerHTML = "";

  totalItems = sortedRows
    ? sortedRows.length
    : document.querySelectorAll(".post-row").length;
  totalPages = Math.ceil(totalItems / pageSize);
  updatePagination();

  var startIndex = (currentPage - 1) * pageSize;
  var endIndex = startIndex + pageSize;

  for (var i = startIndex; i < Math.min(endIndex, totalItems); i++) {
    listPost.appendChild(sortedRows ? sortedRows[i] : allPostRows[i]);
  }
}

function updatePagination() {
  var pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  for (var i = 1; i <= totalPages; i++) {
    var button = document.createElement("button");
    button.textContent = i;
    button.onclick = function () {
      currentPage = parseInt(this.textContent);
      renderPage();
    };

    if (i === currentPage) {
      button.classList.add("active");
    }

    pagination.appendChild(button);
  }
}

var allPostRows = Array.from(document.querySelectorAll(".post-row"));
renderPage(allPostRows);


// API
 const apiUrl = 'https://suitmedia-backend.suitdev.com/api/ideas';
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

    const proxyApiUrl = `${proxyUrl}${apiUrl}?page[number]=1&page[size]=10&append[]=small_image&append[]=medium_image&sort=-published_at`;

    fetch(proxyApiUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

// Get data terjadi error dengan status code 405 yang mengindikasikan bahwa metode HTTP yang digunakan tidak diizinkan. Pesan kesalahan yang muncul adalah "Backend accept only json communication." yang berarti hanya backend yang menerima komunikasi dalam format JSON. 





