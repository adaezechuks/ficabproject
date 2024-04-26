  var reviews = {
    reviews: []
  };
  
  function ReviewStarContainer(stars) {
    var div = document.createElement("div");
    div.className = "stars-container";
    for (var i = 0; i < 5; i++) {
      var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox", "0 12.705 512 486.59");
      svg.setAttribute("x", "0px");
      svg.setAttribute("y", "0px");
      svg.setAttribute("xml:space", "preserve");
      svg.setAttribute("class", "star");
      var svgNS = svg.namespaceURI;
      var star = document.createElementNS(svgNS, "polygon");
      star.setAttribute(
        "points",
        "256.814,12.705 317.205,198.566 512.631,198.566 354.529,313.435 414.918,499.295 256.814,384.427 98.713,499.295 159.102,313.435 1,198.566 196.426,198.566"
      );
      star.setAttribute("fill", i < stars ? "#f39c12" : "#808080");
      svg.appendChild(star);
      div.appendChild(svg);
    }
    return div;
  }
  
  function ReviewContentContainer(name, city, review) {
    var reviewee = document.createElement("div");
    reviewee.className = "reviewee footer";
    reviewee.innerHTML = "- " + name + ", " + city;
  
    var comment = document.createElement("p");
    comment.innerHTML = review;
  
    var div = document.createElement("div");
    div.className = "review-content";
    div.appendChild(comment);
    div.appendChild(reviewee);
  
    return div;
  }
  
  function ReviewsContainer(review) {
    var div = document.createElement("blockquote");
    div.className = "review";
    div.appendChild(ReviewStarContainer(review.stars));
    div.appendChild(
      ReviewContentContainer(review.name, review.city, review.review)
    );


     // Create and append the details table
     var table = createDetailsTable(review.details);
     div.appendChild(table);


    var button = document.createElement("button");
    button.type = "button";
    button.className = "btn btn-danger"; // Set Bootstrap classes for styling

    // Add the glyphicon inside the button
    var icon = document.createElement("span");
    icon.className = "glyphicon glyphicon-trash";
    button.appendChild(icon);

    // Add text node for the button label
    button.appendChild(document.createTextNode(" Delete")); // Space before "Delete" for better spacing

    // Event handling for the button
    button.onclick = function() {
      deleteReview(review.id); // Call a function to handle the delete action
    };

    // Append the button to the provided container
    div.appendChild(button);

    return div;
  }
  function createDetailsTable(details) {
    var table = document.createElement("table");
    var thead = document.createElement("thead");
    var tbody = document.createElement("tbody");
    table.className = "table table-hover table-bordered table-stripped table-sm";

    // Create table header
    var headerRow = document.createElement("tr");
    var targetHeader = document.createElement("th");
    targetHeader.textContent = "Target";
    var polarityHeader = document.createElement("th");
    polarityHeader.textContent = "Polarity";
    headerRow.appendChild(targetHeader);
    headerRow.appendChild(polarityHeader);
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body with detail rows
    details.forEach(detail => {
        var row = document.createElement("tr");
        var targetCell = document.createElement("td");
        targetCell.textContent = detail.target;
        var polarityCell = document.createElement("td");
        polarityCell.textContent = detail.polarity;
        row.appendChild(targetCell);
        row.appendChild(polarityCell);
        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    return table;
}

  function renderNow(){
    console.log({renderNowReviews:reviews})
     for (var i = 0; i < reviews.reviews.length; i++) {
    document
      .getElementById("review-container")
      .appendChild(ReviewsContainer(reviews.reviews[i]));
  }
  }
  
 
const  useEffect=()=>{
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch(`${ENDPOINT}get-all-reviews`, requestOptions)
    .then((response) => response.json())
    .then((result) => {

      let reviewNew = result.map((oneResult,i)=>{
        return  {
          stars: oneResult.rating,
          name: oneResult.customer,
          city: oneResult.reviewTime,
          review: oneResult.reviewText,
          details: oneResult?.details,
          id:oneResult?.id
        }
      });
      reviews.reviews = reviewNew

      // reviews = result;
      console.log(reviews)
      renderNow();
     // console.log(result)
    })
    .catch((error) => console.log(error));
}
const deleteReview = ((id)=>{
  if(!confirm("Are you sure you want to delete this review? \nThis cannot be undone"))
    return;

  const requestOptions = {
    method: "DELETE",
    redirect: "follow"
  };
  
  fetch(`${ENDPOINT}reviews/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      useEffect()
    })
    .catch((error) => console.error(error));
})
useEffect()