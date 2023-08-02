let stars = document.querySelectorAll(".star-icon");

document.addEventListener("click", function (e) {
  let classStar = e.target.classList;
  if (!classStar.contains("ativo") && classStar.contains("star-icon")) {
    stars.forEach(function(star){
      star.classList.remove('ativo');
    });
    classStar.add("ativo");
    console.log(e.target.getAttribute("data-avaliacao"));
  }
});
