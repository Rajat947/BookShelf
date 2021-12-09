const url = "../Docs/helloworld.pdf";
  pdfjsLib.getDocument(url).promise.then(pdf => {
    var container = document.getElementById("container");

    for (var i = 1; i <= pdf.numPages; i++) {

        pdf.getPage(i).then(page=>{

          const scale = 1.5;
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