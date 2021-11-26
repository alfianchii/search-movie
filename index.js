// $(".search-button").on("click", function () {
// 	$.ajax({
// 		url: "http://www.omdbapi.com/?apikey=9da156cc&s=" + $(".input-keyword").val(),
// 		success: (result) => {
// 			const movies = result.Search;
// 			let cards = "";
// 			movies.forEach((movie) => {
// 				cards += showCards(movie);
// 			});

// 			$(".movie-container").html(cards);

// 			// Ketika tombol detail di-klik
// 			$(".modal-detail-button").on("click", function () {
// 				$.ajax({
// 					url: "http://www.omdbapi.com/?apikey=9da156cc&i=" + $(this).data("imdbid"),
// 					success: (movie) => {
// 						const movieDetail = showMovieDetail(movie);

// 						$(".modal-body").html(movieDetail);
// 					},
// 					error: (e) => {
// 						console.log(e.responseText);
// 					},
// 				});
// 			});
// 		},
// 		error: (e) => {
// 			console.log(e.responseText);
// 		},
// 	});
// });

/* Fetch */
const searchButton = document.body.querySelector(".search-button");
searchButton.addEventListener("click", function () {
	const inputKeyword = document.body.querySelector(".input-keyword");
	fetch(`http://www.omdbapi.com/?apikey=9da156cc&s=${inputKeyword.value}`)
		.then((response) => response.json())
		.then((response) => {
			const movies = response.Search;
			let cards = "";
			movies.forEach((movie) => {
				cards += showCards(movie);
			});
			const movieContainer = document.body.querySelector(".movie-container");
			movieContainer.innerHTML = cards;

			// Ketika tombol Show Details di-klik
			const modalDetailButton = document.body.querySelectorAll(".modal-detail-button");
			modalDetailButton.forEach((btn) => {
				btn.addEventListener("click", function () {
					const imdbid = this.dataset.imdbid;
					fetch(`http://www.omdbapi.com/?apikey=9da156cc&i=${imdbid}`)
						.then((response) => response.json())
						.then((movie) => {
							const movieDetail = showMovieDetail(movie);
							const modalBody = document.body.querySelector(".modal-body");
							modalBody.innerHTML = movieDetail;
						});
				});
			});
		});
});

function showMovieDetail(movie) {
	return `
	<div class="container-fluid">
			<div class="row">
				<div class="col-md-3">
					<img src="${movie.Poster}" class="img-fluid" />
				</div>

				<div class="col-md">
					<ul class="list-group">
						<li class="list-group-item"><h4>${movie.Title} (${movie.Year})</h4></li>
						<li class="list-group-item"><strong>Director : </strong> ${movie.Director}</li>
						<li class="list-group-item"><strong>Actors : </strong> ${movie.Actors}</li>
						<li class="list-group-item"><strong>Writer : </strong> ${movie.Writer}</li>
						<li class="list-group-item">
							<strong>Plot : </strong> <br />
							${movie.Plot}
						</li>
					</ul>
				</div>
			</div>
		</div>
	`;
}

function showCards(movie) {
	return `
	<div class="col-md-4 my-3">
		<div class="card">
			<img src="${movie.Poster}" class="card-img-top" />
			<div class="card-body">
				<h5 class="card-title mb-2">${movie.Title}</h5>
				<h6 class="card-subtitle mb-2 text-muted mb-4">${movie.Year}</h6>
				<a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#movieDetailModal" data-imdbid="${movie.imdbID}">Show Details</a>
			</div>
		</div>
	</div>`;
}
