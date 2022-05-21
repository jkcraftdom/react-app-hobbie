
import React from 'react'
import ChapterCard from '../../Orgnisms/Manga/ChapterCard'
import MangaDetailCard from '../../Orgnisms/Manga/MangaDetailCard'
import MangaImagen from '../../Orgnisms/MangaImagen'
import MangaLinkCard from '../../Orgnisms/MangaLinkCard'
import MangaGalery from '../../Orgnisms/Manga/MangaGalery'
import MangaNav from '../../Orgnisms/MangaNav'
import Tab from '../../Orgnisms/Tab'
import MangaShowGallery from '../../Orgnisms/Manga/MangaShowGallery'
import MangaFirebase from '../../Orgnisms/Manga/MangaFirebase'
import HeaderPageChildren from '../../Molecules/Global/HeaderPageChildren'
import MarkdownChapter from '../../Orgnisms/Manga/MarkdownChapter'
import CharacterCard from '../../Orgnisms/Manga/CharacterCard'
import Names from '../../Orgnisms/Manga/Names'
import laravel from '../../../Servicios/laravel'
import ScanlationManga from '../../Orgnisms/Manga/ScanlationManga'


class MangaCreate extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            comicId : null,
            comic: null,
            imagen: null,
            chapters: [],
            scanlations: [],
            links: [],
            galleries: [],
            chaptersCreate:[],
            characters: {
                data: []
            },
            totalGalleries: 0,
            activeTab: 'chapter',                        
            markdown: null,            
            charactersTotal : 0
        }

        this.onActive = this.onActive.bind(this)
        this.onCopy = this.onCopy.bind(this)
        this.onCreatedManga = this.onCreatedManga.bind(this)
        this.onBuscarGoogle = this.onBuscarGoogle.bind(this)
        this.onNewComic = this.onNewComic.bind(this)
        this.onPostSaveGallery = this.onPostSaveGallery.bind(this)
        this.onPostSave = this.onPostSave.bind(this)
        this.onPaginateCharacter = this.onPaginateCharacter.bind(this)

        this.headerConfig = {
            toBack: '/mangas',
            backName: 'Mangas',
        }
        
    }
    
    
    async componentDidMount(){      
        var {match} = this.props

        if(match.params.id){
            var data = await fetch('http://127.0.0.1:8000/api/comics/'+match.params.id)
                .then(res => res.json())

            const {comic, imagen, chapters, links, galleries} = data
            const {markdown, characters, scanlations} = data
            this.setState({
                comic,
                comicId: comic.id,
                imagen,
                chapters,
                links,
                galleries,
                markdown,                
                characters,
                scanlations               
            })
        }
        
    }

    onPostSave(data){
        console.log("postsave")
        this.setState(data)
    }

    onActive(tab){
        this.setState({activeTab: tab})
    }

    // Event child
    async onPaginateCharacter(modo){

        const {next_page_url, prev_page_url} = this.state.characters

        let url = modo === "next"? next_page_url: prev_page_url
        
        console.log(url, modo)

        let response = await laravel.axiosInstance.get(url).then(x => x.data)

        this.setState({characters: response})
    }

    onCreatedManga(id, comic){
        this.setState({
            comicId: id,
            comic
        })
    }

    onPostSaveGallery(galleries, total){
        this.setState({
            galleries: galleries,
            totalGalleries:total
        })
    }

    async onCopy(){
        
        var text = await navigator.clipboard.readText()
  
        if(text.includes('\n') === false){
            return
        }

        var arrText = text.split('\n')
        var comic = {
            name: arrText[0]
        }                
        
        this.setState({comic: comic})

        let chapters = []
        chapters.push(this.createChapter(1,arrText[1]))
        chapters.push(this.createChapter(2,arrText[2]))
        this.setState({chaptersCreate: chapters})
    }

    onBuscarGoogle(){
        let url = "https://www.google.com/search?q=" + this.state.comic?.name

        window.open(url, '_blank');
        
    }

    onNewComic(){
        this.setState({
            comicId : null,
            comic: null,
            imagen: null,
            chapters: [],
            links: [],
            galleries: [],
            totalGalleries: 0,
            characters: {
                data: []
            },
            markdown: null,
            scanlations: []
        })
    }
    
    createChapter(id, text){
        let valores = text.split('-')
        if (valores.length < 2)
            return
        
        return {'id': id, 'chapter': valores[0].trim(), 'date': valores[1].trim()}
    }

    render() { 
        const {comicId, comic, markdown, galleries, totalGalleries} = this.state
        const {characters, charactersTotal, scanlations} = this.state

        let nameHeader = comicId? comic.name : "Create Manga"
        nameHeader = nameHeader.length > 60? nameHeader.substring(0,50) +"...": nameHeader
        
        return (
            <div>
                <HeaderPageChildren headerConfig={this.headerConfig} name={nameHeader}>
                    <button onClick={this.onNewComic} className="btn btn-primary btn-sm me-2">New</button>
                    <button onClick={this.onCopy} className="btn btn-secondary btn-sm me-2">Copy</button>
                    <button onClick={this.onBuscarGoogle} className="btn btn-secondary btn-sm">Search google</button>
                </HeaderPageChildren>
                <div className="row mt-2">
                    <div className="col-xl-8">
                        <MangaDetailCard onCreated={this.onCreatedManga} comic={comic} />                                                    
                    </div>
                    <div className="col-xl-4">
                        <MangaImagen manga={comicId} imagen={this.state.imagen}/>
                    </div>
                </div>
                <div className="row mt-2">
                    <MangaNav onActive={this.onActive} />
                    <div className="col-xl-6">                    
                       <Tab activeTab={this.state.activeTab}>
                            <ChapterCard label="chapter" 
                                manga={comicId} chapters={this.state.chapters} 
                                chaptersCreate={this.state.chaptersCreate}
                                postSave={this.onPostSave}

                            />
                            <MangaLinkCard label="link" manga={comicId} links={this.state.links} onPostSave={this.onPostSave}/>  
                            <MangaGalery label="galery" 
                                manga={comicId} characters={characters.data} 
                                onPostSave ={this.onPostSaveGallery}/>
                            <MangaFirebase label="firebase"/>
                            <MarkdownChapter label="markdown" markdown={markdown} comic={comicId} />
                            <CharacterCard label="character"  
                                data={{characters, charactersTotal, comicId}} 
                                postSave={this.onPostSave}
                                paginate={this.onPaginateCharacter}
                                />
                            <Names label="name" comic={comicId}/>
                            <ScanlationManga label="scanlation" scanlations={scanlations} 
                                comic={comicId}/>
                       </Tab>                        
                    </div>
                    <div className="col-xl-4">
                        <MangaShowGallery galleries={galleries} total={totalGalleries}/>                            
                    </div>
                </div>
            </div>
        );
    }
}
 
export default MangaCreate;