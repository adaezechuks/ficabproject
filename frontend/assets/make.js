const allStar = document.querySelectorAll('.rating .star')
const ratingValue = document.querySelector('.rating input')

allStar.forEach((item, idx)=> {
	item.addEventListener('click', function () {
		let click = 0
		ratingValue.value = idx + 1

		allStar.forEach(i=> {
			i.classList.replace('bxs-star', 'bx-star')
			i.classList.remove('active')
		})
		for(let i=0; i<allStar.length; i++) {
			if(i <= idx) {
				allStar[i].classList.replace('bx-star', 'bxs-star')
				allStar[i].classList.add('active')
			} else {
				allStar[i].style.setProperty('--i', click)
				click++
			}
		}
	})
})

const saveReview = ()=>{
    document.getElementById("form-placeholder").style.display="none"
    document.getElementById("loading-placeholder").style.display="block"


    const rating = document.getElementById("rating").value;
    const opinion = document.getElementById("opinion").value;
	var customer = document.getElementById("customer").value || "Anonymous"

	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	const raw = JSON.stringify({
	"review": opinion,
	"rating": rating,
	"customer": customer,
	});

	const requestOptions = {
	method: "POST",
	headers: myHeaders,
	body: raw,
	redirect: "follow"
	};

	fetch(`${ENDPOINT}predict`, requestOptions)
	.then((response) => {
		if(!response.ok){
			console.log("Error"+response.statusText);
		}
		response.json()
	})
	.then((result) =>{
		 console.log(result)
		 alert("Thank you for Submitting your review")
		})
	.catch((error) => console.error(error))
	.finally(()=>{
		
		document.getElementById("form-placeholder").style.display="block"
		document.getElementById("loading-placeholder").style.display="none"


		document.getElementById("rating").value = "";
		document.getElementById("opinion").value ="";
		document.getElementById("customer").value ="";
	});
}