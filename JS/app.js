"use strict";
let allImage=[]
let key = [];
let keyArr1 = [];
let all1 = [];
let keyArr2 = [];
let all2 = [];
function Horn(horn) {
    this.title = horn.title;
    this.image_url = horn.image_url;
    this.description = horn.description;
    this.keyword = horn.keyword
    this.horns = horn.horns
    allImage.push(this);
}

Horn.prototype.cloneRender = function () {
    let clonedDiv = $('#photo-template').clone();
    clonedDiv.find("h2").text(this.title);
    clonedDiv.find("img").attr("src", this.image_url);
    clonedDiv.find("img").attr("width", '200px');
    clonedDiv.find("img").attr("height", '200px');
    clonedDiv.find("p").text(this.description);
    clonedDiv.removeAttr("id");
    clonedDiv.attr("class", 'photo');
    $("main").append(clonedDiv);
};
const ajaxSettings = {
    method: "get",
    dataType: "json",
};

$.ajax("data/page-1.json", ajaxSettings).then((data) => {
    data.forEach((horn) => {
      
        if (!key.includes(horn.keyword)) {
            key.push(horn.keyword)
        }
        let hornObject = new Horn(horn);
        hornObject.cloneRender();
    });
    key.forEach(element => {
       $('select').append(`<option value=${element}>${element}</option>`) 
    });
});

        $("select").change(function(){ 
            $('main').html("");
            let value = $(this).val();
            allImage.forEach(element =>{
                if (value==element.keyword) {
                    element.cloneRender();
                }

            });
         
          });
$("#page1").click( function () {
  $.ajax("data/page-1.json", ajaxSettings).then((data) => {
    $("main").html("");
    $("select").html("");
    $("select").append(
      `<option value="default">Filter by Keyword</option>`
    )
    data.forEach((element) => {
      let imageNew = new Horn(element);
      all1.push(imageNew);
      if (!keyArr1.includes(imageNew.keyword)) {
        keyArr1.push(imageNew.keyword);
      }
      imageNew.cloneRender();
    });
    keyArr1.forEach((element) => {
      $("select").append(`<option value=${element}>${element}</option>`);
    });
  });
});



$("#page2").click( function () {
  $.ajax("data/page-2.json", ajaxSettings).then((data) => {
    $("main").html("");
    $("select").html("");
    $("select").append(
      `<option value="default">Filter by Keyword</option>`
    )
    data.forEach((element) => {
      let imageNew = new Horn(element);
      all2.push(imageNew);
      if (!keyArr2.includes(imageNew.keyword)) {
        keyArr2.push(imageNew.keyword);
      }
      imageNew.cloneRender();
    });
    keyArr2.forEach((element) => {
      $("select").append(`<option value=${element}>${element}</option>`);
    });
  });
});
$('#numberofHorns').change(function () {
    if( ($(this).is(':checked'))){
      $("main").html("");
      allImage.sort(sortByHorns).forEach(element => {
        element.cloneRender();
      }); ;
    }
    else {
        allImage.forEach(element => {
         element.cloneRender();
      })  
    }
  })
 
  $('#title').change(function () {
    if( ($(this).is(':checked'))){
      $("main").html("");
      allImage.sort(sortByTitle).forEach(element => {
        element.cloneRender();
      }); ;
    }
    else {
        allImage.forEach(element => {
         element.cloneRender();
      })  
    }
  
  })

  function sortByTitle(a,b){
    if (a.title<b.title) {
      return -1;
    }
    if (a.title>b.title) {
      return 1;
    }
    return 0;
  }

  function sortByHorns(a,b){
    if (a.horns<b.horns) {
      return -1;
    }
    if (a.horns>b.horns) {
      return 1;
    }
    return 0;
  }
