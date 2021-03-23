"use strict";
let allImage=[]
function Horn(horn) {
    this.title = horn.title;
    this.image_url = horn.image_url;
    this.description = horn.description;
    this.keyword = horn.keyword
    this.horns = horn.horns
    allImage.push(this);
}
//console.log(allImage);
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
let key = []
$.ajax("data/page-1.json", ajaxSettings).then((data) => {
    data.forEach((horn) => {
        //console.log(horn);
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
   let selectArr=[]
   selectArr.forEach((horn => {
    let selectObject = new Horn(horn);
    selectObject.cloneRender();
    
   }));
        $("select").change(function(){ 
            $('main').remove();
            let value = $(this).val();
            allImage.forEach(element =>{
                if (value==element.keyword) {
                    element.cloneRender();
                    selectArr.push(element)
                }

            });
         
          });
console.log(selectArr);