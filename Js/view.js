let book = window.location.href;
let book_str = new URL(book);

const url = "../Docs/"+ book_str.searchParams.get("url")+".pdf";

pdfjsLib.getDocument(url).promise.then(pdf => {
    var container = document.getElementById("container");
    
    const pairs = [];
    pdf.getOutline().then(outline=>{
      
      if(outline){
        drawOutline(outline);
        }
      })

    for (var i = 1; i <= pdf.numPages; i++) {

        pdf.getPage(i).then(page=>{

          const scale = 1.75;
          var viewport = page.getViewport({scale});
          var div = document.createElement("div");

          
          div.setAttribute("id", "page-" + (page._pageIndex + 1));
          div.setAttribute("style", "position: relative");
          
          container.appendChild(div);
          
          var canvas = document.createElement("canvas");
          div.appendChild(canvas);

          var context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          var renderContext = {
            canvasContext: context,
            viewport: viewport
          };

          page.render(renderContext).promise
                .then(()=>page.getTextContent())
                .then(textContent => {
                    var textLayerDiv = document.createElement("div");

                    textLayerDiv.setAttribute("class", "textLayer");

                    div.appendChild(textLayerDiv);

                    var textLayer = new TextLayerBuilder({
                    textLayerDiv: textLayerDiv, 
                    pageIndex: page.pageIndex,
                    viewport: viewport
                    });

                    textLayer.setTextContent(textContent);

                    textLayer.render();
                });
        })
    }
});

function drawOutline(outline)
{
  const ele = document.getElementById("sidebar");

  for(let i=0; i<outline.length; i++)
  {
    let heading = `<div class="col-12 heading">${outline[i].title}</div>`;
    ele.insertAdjacentHTML('beforeend', heading);
    for(let j=0; j<outline[i].items.length; j++){
      let subHeading = `<div class="col-12 sub-heading">&#17; ${outline[i].items[j].title}</div>`;
      ele.insertAdjacentHTML('beforeend', subHeading);
    }
  }
}