import {useState} from 'react';
import Search from './components/Search';

const App = () => {
    const [searchItem, setSearchItem] = useState('');

    return (
        <main>
            <div className='pattern'/>

            <div className="wrapper">
                <header>
                    <img src="./hero-img.png" alt="hero image" />
                    <h1 className='text-white'>Find <span className='text-gradient'>Movies</span> you Love Without Hasssle</h1>
                </header>
                <Search searchItem={searchItem} setSearchItem={setSearchItem} />
            </div>
        </main>
    );
}
export default App;