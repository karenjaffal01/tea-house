function search() {
  var searchbar = document.getElementById("serachbar");
  var searchString = searchbar.value.trim().toLowerCase();
  window.location.href = `search.html?q=${encodeURIComponent(searchString)}`;
}
function logoutUser() {

  if (sessionStorage.getItem('username')) {
      sessionStorage.removeItem('username');
  } 
  

  window.location.href = './login.html';
}

function authUser() {
  if (!sessionStorage.getItem('username')) {
    window.location.href = './login.html';
  }
}



//related to saja and ali's part 
document.addEventListener('DOMContentLoaded', () => {
  authUser();
  // Search bar input field
  const searchbar = document.getElementById("serachbar");

  // Add event listener for the Enter key
  searchbar.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') { // Check if the Enter key is pressed
          event.preventDefault(); // Prevent the default action (form submission)
          search(); // Call the search function
      }
  });
  
  //fetching the whole json doc didn't work i don't know why 
  fetch('./teatypes.JSON')
  .then(response => response.json())
  .then(sampleData => {
    console.log("Sample Data:");
    console.log(sampleData);
  
    const teaList = document.getElementById('teaList'); //the unordered list which will contain all the tea types
    
    Object.keys(sampleData).forEach(category => { // our data is of the form of key -> value (the key is the category ) so
                                            //now we are looping over the whole data set 
        const products =document.createElement('div')
        products.classList.add('items')
        const categoryHeader = document.createElement('h2'); //to put an h2 element to display the category 
        categoryHeader.textContent = category;  // set the text of this h2 element into the actual category 
        teaList.appendChild(categoryHeader);// add it to the ul 
        teaList.appendChild(products) 
        //products.appendChild(categoryHeader)
        
        sampleData[category].forEach(tea => { // now the loop will iterate over each category 
            const li = document.createElement('li');
            
            const imgContainer = document.createElement('div');
            imgContainer.innerHTML = tea.image;
            const img = imgContainer.firstChild; // all these are for tranforming the image from a string to an actual html image 
            img.classList.add('tea-image'); //assigning a class to the image 

            img.addEventListener('click', () => { // upon clicking the image 
                localStorage.setItem('selectedTea', JSON.stringify(tea)); //store the selected image under the name of (selectedTea ) , the storing will be as a string , and later in getItem it will be parsed back into json 
                window.location.href = 'item_view.html';
            });

            const span = document.createElement('h5'); // here to display the tea name under each image 
            span.textContent = tea.name;
            span.classList.add('name')

            const price = document.createElement('p');
            price.classList.add('price')
            price.textContent = tea.price;
            products.appendChild(img);
            products.appendChild(span);
            products.appendChild(price);
            teaList.appendChild(products)
        });
    });
  })
  .catch(error => console.error('Error loading the JSON file:', error));
});
