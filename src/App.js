
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import FormularioEnlaces from './Components/Pages/FormularioEnlaces';
import Notebook from './Components/Pages/Notebook';
import Nav from './Components/Orgnisms/NavBar';
import MangaList from './Components/Pages/Manga/Mangas';
import MangaCreate from './Components/Pages/Manga/MangaCreate';
import Doujinshi from './Components/Pages/Doujinshi';
import DjCreate from './Components/Pages/DjCreate';
import Cosplayer from './Components/Pages/Cosplayer';
import CsCreate from './Components/Pages/CsCreate';
import HentaiPage from './Components/Pages/Hentai/HentaiPage';
import HnCreatePage from './Components/Pages/Hentai/HnCreatePage';
import ScanlationPage from './Components/Pages/Scanlation/ScanlationPage';
import ScCreatePage from './Components/Pages/Scanlation/ScCreatePage';

function App() {
  
  return (
      <div className='bg-dark'>
        <Router>
        <Nav></Nav>
        <div className="container ">           
          <Switch>
            <Route path="/" exact component={Notebook}/>
            <Route path="/enlaces" exact component={FormularioEnlaces}/>
            <Route path="/mangas" exact component={MangaList}/>
            <Route path="/dj" exact component={Doujinshi}/>
            <Route path="/cosplayer" exact component={Cosplayer}/>
            <Route path="/hentai" exact component={HentaiPage}/>
            <Route path="/scanlation" exact component={ScanlationPage}/>
            <Route path="/manga/create/:id?" exact component={MangaCreate}/>
            <Route path="/dj/create/:id?" exact component={DjCreate}/>             
            <Route path="/cosplayer/create/:id?" exact component={CsCreate}/>             
            <Route path="/hentai/create/:id?" exact component={HnCreatePage}/>             
            <Route path="/scanlation/create/:id?" exact component={ScCreatePage}/>             
            <Route component={()=>(<div className='text-light'>Pagina no encontrada</div>)} />
          </Switch>          
        </div>
        </Router>
      </div>
  );
}

export default App;
