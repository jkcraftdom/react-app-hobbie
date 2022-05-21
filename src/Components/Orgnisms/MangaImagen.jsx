import {Component} from 'react'
import alertify from 'alertifyjs';

class MangaImagen extends Component {
    constructor(props) {
        super(props);
        this.onCopyImagen = this.onCopyImagen.bind(this)
        this.onUploadImagen = this.onUploadImagen.bind(this)
    }

    onCopyImagen(){
        var imgElem = document.getElementById('imagen')
        navigator.permissions.query({ name: "clipboard-read" }).then((result) => {
            if (result.state === "granted" || result.state === "prompt") {
              navigator.clipboard.read().then((data) => {
                for (let i = 0; i < data.length; i++) {
                  if (!data[i].types.includes("image/png")) {
                    alert("Clipboard contains non-image data. Unable to access it.");
                  } else {
                    data[i].getType("image/png").then((blob) => {
                      imgElem.src = URL.createObjectURL(blob);
                    });
                  }
                }
              });
            }
          });
    }

    async onUploadImagen(){
      var form = new FormData()
      var img = document.getElementById('imagen')

      let file = await fetch(img.src).then(r => r.blob())
        .then(blobFile => new File([blobFile], 'imagen.jpg'));    

      form.append('file', file)
      form.append('manga', this.props.manga)
     
      let response = await fetch('http://127.0.0.1:8000/api/comic/upload', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',          
        },
        body: form
      }).then(res => res.json())
      
      if(response.exception){
        alertify.alert(response.message)
        return
      }

      alertify.alert(response.data)
    }

    componentDidMount(){
      if(this.props.imagen){
        var img = document.getElementById('imagen')
        img.src = this.props.imagen
      }
    }

    componentDidUpdate(prevProps) {
      // Uso tipico (no olvides de comparar las props):
      if (this.props.imagen !== prevProps.imagen) {
        var img = document.getElementById('imagen')
        img.src = this.props.imagen
      }
    }

    render() { 
        const {manga} = this.props
        return ( 
            <div className="card" >
                <div className="card-body">                                        
                    <div className="text-center mb-2 comic-img__contenedor">
                        <img  alt="Imagen manga" id="imagen" className='comic-portada rounded'                         
                         src="https://e.rpp-noticias.io/normal/2020/10/09/133613_1007593.jpg"/>
                    </div>                                    
                    <div className="row">
                        <div className="col-xl-6 d-grid">
                            <button onClick={this.onCopyImagen} className='btn btn-primary  btn-sm'>Copy</button>
                        </div>
                        <div className="col-xl-6 d-grid">
                            <button onClick={this.onUploadImagen} 
                              className='btn btn-primary btn-sm'
                              disabled={manga === null}
                              >Upload</button>
                        </div>                                                                               
                    </div>
                </div>
            </div>
         );
    }
}
 
export default MangaImagen;