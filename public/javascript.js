//categoryChg();
function categoryChg(){
  
  const category = document.querySelector("input[name='category']:checked").value;
  const checkboxes = document.querySelectorAll("input[name='categories']");

  checkboxes.forEach(checkbox =>{
    checkbox.disabled = (category === 'any')
  }); 
}
