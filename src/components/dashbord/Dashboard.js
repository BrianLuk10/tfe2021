import React, { useEffect, useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';


function PrintingClass() {

  let articleShow;
  let posts;

  useEffect(() => {

  }, [])

  let componentRef = useRef(null)

  let data = JSON.parse(sessionStorage.getItem('save'))
  sessionStorage.setItem('caisse', JSON.stringify(data))
  let article = JSON.parse(sessionStorage.getItem('save'))
  let i = 0;
  try {
    posts = article.map(obj => ({
      articleId: i++,
      id: obj.id,
      nom: obj.nom,
      prix: obj.prix,
      nombre: obj.nombre
    }));
    articleShow = posts.map(pd => <React.Fragment>
      <div>
        <div>{pd.nom}&nbsp;x{pd.nombre}&nbsp;{(pd.prix * pd.nombre)}</div>
      </div>
    </React.Fragment>)
  }
  catch {
    console.log("pas d'article")
  }

  console.log(articleShow)
  console.log(posts)


  return (
    <div>
      <ReactToPrint
        trigger={() =>
          <div>
            <button>print</button>
          </div>
        }
        content={() => componentRef}
      />
      <span ref={el => componentRef = el}>{articleShow}</span>
    </div>
  )
}

export default PrintingClass;