$(document).ready(function() {
 
    $("#owl-demo").owlCarousel({
        items : 10, //10 items above 1000px browser width
        itemsDesktop : [1000,5], //5 items between 1000px and 901px
        itemsDesktopSmall : [900,3], // betweem 900px and 601px
        itemsTablet: [600,2], //2 items between 600 and 0;
        itemsMobile : false // itemsMobile disabled - inherit from itemsTablet option
    });
   
  });



//   for t2men cars

 var urlParams = new URLSearchParams(location.search);
    let ch_brand = urlParams.get('ch_brand');
    let ch_model = urlParams.get('ch_model');
    let ch_year = urlParams.get('ch_year');  $('#brand').on('change', (event) => {
    let chosenBrandID = event.target.value;
    $('#model').empty();
    $('#model').append($('<option value="">اختار الموديل</option>'));
    let filtered = models.filter(item => {
    return item.brand_id == chosenBrandID;
    });
    filtered.forEach(model => {
    let element = $(`<option value="${model.ID}" ${model.ID == ch_model ? 'selected="selected"' : ''} >${model.title}</option>`);
    $('#model').append(element);
    })
    })
    if (ch_brand) {
    $('#brand').val(ch_brand).trigger('change');
    }
    $('#model').on('change', (event) => {
    let chosenModelID = event.target.value;
    $('#year').empty();
    $('#year').append($('<option value="">اختار السنة</option>'));
    let chosenModel = models.filter(item => {
    return item.ID == chosenModelID;
    })[0];
    chosenModel.years.forEach(year => {
    let element = $(`<option value="${year}" ${year == ch_year ? 'selected="selected"' : ''}>${year}</option>`);
    $('#year').append(element);
    })
    })
    if (ch_model) {
    $('#model').val(ch_model).trigger('change');
    }





    //top button
