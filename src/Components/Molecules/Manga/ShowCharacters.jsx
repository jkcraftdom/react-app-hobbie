import GeneroCharacter from '../../Molecules/Manga/GeneroCharacter'

function ShowCharacters({characters, event}) {

    function sendData(tag, character){
        event(tag, character)
    }

    return ( 
        <div className="row row-cols-3">
            {characters.map(character =>
                <div className="col" key={character.id}>  
                    <div className="imagen-character">
                        <div className="btn-imagen bg-secondary" style={{"opacity":"0.8"}}>
                            <button  onClick={()=>sendData("state", character)}className="btn btn-sm btn-link link-dark link-hover">
                                <i className="bi bi-person-video2"></i>
                            </button>
                            <button  onClick={()=>sendData("create", character)}className="btn btn-sm btn-link link-dark link-hover">
                                <i className="bi bi-pencil-fill"></i>
                            </button>
                        </div>                                 
                        <figure className="figure bg-secondary">
                            <img src={character.imagen} className="character-img figure-img mb-0" alt="character"/>
                            <figcaption className="figure-caption text-center">
                                <span className='badge p-0' style={{"width": "100%"} }>{character.name} </span>
                                <span className='badge'> Chapter {character.appear_chapter}</span>
                                <GeneroCharacter genero={character.genero}/>
                            </figcaption>
                        </figure>
                    </div>              
                </div>    
            )}                    
        </div>
    );
}

export default ShowCharacters;