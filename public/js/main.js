


//   for t2men cars

//  var urlParams = new URLSearchParams(location.search);
//     let ch_brand = urlParams.get('ch_brand');
//     let ch_model = urlParams.get('ch_model');
//     let ch_year = urlParams.get('ch_year');  $('#brand').on('change', (event) => {
//     let chosenBrandID = event.target.value;
//     $('#model').empty();
//     $('#model').append($('<option value="">اختار الموديل</option>'));
//     let filtered = models.filter(item => {
//     return item.brand_id == chosenBrandID;
//     });
//     filtered.forEach(model => {
//     let element = $(`<option value="${model.ID}" ${model.ID == ch_model ? 'selected="selected"' : ''} >${model.title}</option>`);
//     $('#model').append(element);
//     })
//     })
//     if (ch_brand) {
//     $('#brand').val(ch_brand).trigger('change');
//     }
//     $('#model').on('change', (event) => {
//     let chosenModelID = event.target.value;
//     $('#year').empty();
//     $('#year').append($('<option value="">اختار السنة</option>'));
//     let chosenModel = models.filter(item => {
//     return item.ID == chosenModelID;
//     })[0];
//     chosenModel.years.forEach(year => {
//     let element = $(`<option value="${year}" ${year == ch_year ? 'selected="selected"' : ''}>${year}</option>`);
//     $('#year').append(element);
//     })
//     })
//     if (ch_model) {
//     $('#model').val(ch_model).trigger('change');
//     }

// preloader
window.onload = function () {
  //hide the preloader
  document.querySelector('.loader_bg').style.display = "none";
};




//top button
const scrollBtn= document.querySelector(".scroll-to-top");

scrollBtn.addEventListener("click",()=>{
  document.body.scrollTop=0;
  document.documentElement.scrollTop=0;
});

document.addEventListener("scroll",(e)=>{
if(document.documentElement.scrollTop <=100){
  scrollBtn.style.display="none";
}else
{
  scrollBtn.style.display="block";
}
});


// swiper for slider home page
var swiper = new Swiper(".mySwiper", {
  loop:true,
  autoplay:true,
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});



