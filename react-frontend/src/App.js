import React, { useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import NumberFormat from 'react-number-format';
import './App.css';
import './styles/artist_responsive.css';
import './styles/artist.css';
import './styles/blog_responsive.css';
import './styles/blog.css';
import './styles/contact_responsive.css';
import './styles/contact.css';
import './styles/elements_responsive.css';
import './styles/elements.css';
import './styles/main_styles.css';
import './styles/responsive.css';

function App() {

  const [value, setValue] = useState({
    musics: [],
    input: ''
  });

  const getDataSong = async () => {
    const BASE_URL = "http://localhost:3030/trend_music/query";

    const headers = {
      'Accept': 'application/sparql-results+json,*/*;q=0.9',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    };

    const queryData = {
      query:
        `PREFIX md: <http://trendmusic.com/musicdata#>
  
        SELECT ?song ?artist ?genre ?length ?year ?listeners
        WHERE
        {
          ?m     md:song    ?song ;
                md:artist    ?artist ;
                md:genre    ?genre ;
                md:length    ?length ;
                md:year    ?year ;
                md:listeners    ?listeners ;
          FILTER contains(?song, "${value.input}") 
        }`
    };

    try {
      const { data } = await axios(BASE_URL, {
        method: 'POST',
        headers,
        data: qs.stringify(queryData)
      });
      console.log(data);

      // Convert Data
      const formatted_data = data.results.bindings.map((musics, index) => formatter(musics, index));
      console.log(formatted_data)

      setValue({
        ...value,
        musics: formatted_data
      });
    } catch (err) {
      console.error(err);
    }
  }


  const getDataArtist = async () => {
    const BASE_URL = "http://localhost:3030/trend_music/query";

    const headers = {
      'Accept': 'application/sparql-results+json,*/*;q=0.9',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    };

    const queryData = {
      query:
        `PREFIX md: <http://trendmusic.com/musicdata#>
  
        SELECT ?song ?artist ?genre ?length ?year ?listeners
        WHERE
        {
          ?m     md:song    ?song ;
                md:artist    ?artist ;
                md:genre    ?genre ;
                md:length    ?length ;
                md:year    ?year ;
                md:listeners    ?listeners ;
          FILTER contains(?artist, "${value.input}") 
        }`
    };

    try {
      const { data } = await axios(BASE_URL, {
        method: 'POST',
        headers,
        data: qs.stringify(queryData)
      });
      console.log(data);

      // Convert Data
      const formatted_data = data.results.bindings.map((musics, index) => formatter(musics, index));
      console.log(formatted_data)

      setValue({
        ...value,
        musics: formatted_data
      });
    } catch (err) {
      console.error(err);
    }
  }


  const getDataGenre = async () => {
    const BASE_URL = "http://localhost:3030/trend_music/query";

    const headers = {
      'Accept': 'application/sparql-results+json,*/*;q=0.9',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    };

    const queryData = {
      query:
        `PREFIX md: <http://trendmusic.com/musicdata#>
  
        SELECT ?song ?artist ?genre ?length ?year ?listeners
        WHERE
        {
          ?m     md:song    ?song ;
                md:artist    ?artist ;
                md:genre    ?genre ;
                md:length    ?length ;
                md:year    ?year ;
                md:listeners    ?listeners ;
          FILTER contains(?genre, "${value.input}") 
        }`
    };

    try {
      const { data } = await axios(BASE_URL, {
        method: 'POST',
        headers,
        data: qs.stringify(queryData)
      });
      console.log(data);

      // Convert Data
      const formatted_data = data.results.bindings.map((musics, index) => formatter(musics, index));
      console.log(formatted_data)

      setValue({
        ...value,
        musics: formatted_data
      });
    } catch (err) {
      console.error(err);
    }
  }
  const getDataSorting = async () => {
    const BASE_URL = "http://localhost:3030/trend_music/query";

    const headers = {
      'Accept': 'application/sparql-results+json,*/*;q=0.9',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    };

    const queryData = {
      query:
        `PREFIX md: <http://trendmusic.com/musicdata#>
  
        SELECT ?song ?artist ?genre ?length ?year ?listeners
        WHERE
        {
          ?m     md:song    ?song ;
                md:artist    ?artist ;
                md:genre    ?genre ;
                md:length    ?length ;
                md:year    ?year ;
                md:listeners    ?listeners ;
          
        }
        ORDER BY DESC(?listeners)`
    };

    try {
      const { data } = await axios(BASE_URL, {
        method: 'POST',
        headers,
        data: qs.stringify(queryData)
      });
      console.log(data);

      // Convert Data
      const formatted_data = data.results.bindings.map((musics, index) => formatter(musics, index));
      console.log(formatted_data)

      setValue({
        ...value,
        musics: formatted_data
      });
    } catch (err) {
      console.error(err);
    }
  }

  const formatter = (musics, index) => {
    
    return {
      "d": index,
      "song": musics.song.value,
      "artist": musics.artist.value,
      "genre": musics.genre.value,
      "length": musics.length.value,
      "year": musics.year.value,
      "listeners": musics.listeners.value,
    }
  }

  const handleChange = event => {
    setValue({
      ...value,
      'input': event.target.value
    })
  }

  return (
    <div className="super_container">
        {/* Header */}
        <header className="header">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="header_content d-flex flex-row align-items-center justify-content-center">
                  {/* Logo */}
                  <div className="logo">
                    <a className="d-flex flex-row align-items-end justify-content-start">
                      <span className="logo_bars d-flex flex-row align-items-end justify-content-between"><span /><span /><span /><span /><span /></span>
                      <span className="logo_text">TrendMusic</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        {/* Home */}
        <div className="home">
          {/* Home Slider */}
          <div className="home_slider_container">
            <div className="owl-carousel owl-theme home_slider">
              {/* Slide */}
              <div className="slide">
                <div className="background_image" style={{backgroundImage: 'url(images/index.jpg)'}} />
                <div className="home_container">
                  <div className="container">
                    <div className="row">
                      <div className="col">
                        <div className="home_content">
                          <div className="home_title_container text-center">
                            <div className="home_title islive text-center">
                              <h1>Trend <span>Music.</span></h1>
                            </div>
                          </div>
                          <div className="music_form_container">
                            <form action="#" className="music_form">
                              <div className="d-flex flex-md-row flex-column align-items-start justify-content-md-between justify-content-start">
                                <div className="music_form_inputs d-flex flex-row align-items-start justify-content-between">
                                <input onChange={handleChange} type="text" className="music_form_input" placeholder="Search artist, music and genre" required="required"/>
                                </div>
                                <button className="music_form_button button" onClick={function(event){ getDataSong(); getDataGenre(); getDataArtist()}}><span>Search</span></button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* musics */}
        <div className="musics">
          <div className="container">
            <div className="row row-lg-eq-height">
              {/* Add */}
              <div className="col-lg-4 order-lg-1 order-2 musics_col">
                <div className="extra d-flex flex-column align-items-center justify-content-between">
                  <div className="background_image" style={{backgroundImage: 'url(images/extra_1.jpg)'}} />
                  <div className="extra_frame" />
                  <div className="extra_text">it's awesome</div>
                  <div className="extra_title_container">
                    <div className="extra_year">2020</div>
                    <div className="extra_title">TOP MUSIC</div>
                    <div className="extra_subtitle">june 2020</div>
                  </div>
                </div>
              </div>
              {/* musics Content */}
              <div className="col-lg-8 order-lg-2 order-1">
                <div className="musics_content">
                  <div className="section_title">
                    <h1>Trending</h1>
                    <button className="music_form_button button" onClick={getDataSorting}><span>See Top Music</span></button>
                  </div>
                  <div className="musics_list_container">
                    <ol>
                      {value.musics.map((item, i) => 
                      <li key={i}>
                        <li className="d-flex flex-row align-items-start justify-content-start"></li>
                        <div className="music_info"></div>
                        <div className="music_title">{item.song}<br /></div>
                        <div className="music_artist">{item.artist}<br /></div>
                        Genre : {item.genre}<br />
                        Duration : {item.length}<br />
                        Published : {item.year}<br />
                        Listen : <NumberFormat value={item.listeners} displayType={'text'} thousandSeparator={true}/></li>)}
                    </ol>
                    <ul className="musics_list">
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* App */}
        {/* News */}
        <div className="news">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="section_title">
                  <h1>Latest News</h1>
                </div>
              </div>
            </div>
            <div className="row news_row">
              {/* News Post */}
              <div className="col-xl-4 col-md-6">
                <div className="news_post image_top">
                  <div className="news_post_image"><img src="images/news_1.jpg" alt="" /></div>
                  <div className="news_post_content">
                    <div className="news_post_title"><a>Music Seminary at Festival</a></div>
                    <div className="news_post_text">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi condimentum, neque ac porttitor scelerisque, nisi nisl tincidunt enim, non aliquet diam neque sed urna.</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* News Post */}
              <div className="col-xl-4 col-md-6">
                <div className="news_post image_bottom d-flex flex-column align-items-start justify-content-start">
                  <div className="news_post_content order-md-1 order-2">
                    <div className="news_post_title"><a>Festival list for 2019</a></div>
                    <div className="news_post_text">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi condimentum, neque ac porttitor scelerisque, nisi nisl tincidunt enim, non aliquet diam neque sed urna.</p>
                    </div>
                  </div>
                  <div className="news_post_image order-md-2 order-1"><img src="images/news_2.jpg" alt="" /></div>
                </div>
              </div>
              {/* News Post */}
              <div className="col-xl-4 col-md-6">
                <div className="news_post image_top">
                  <div className="news_post_image"><img src="images/news_3.jpg" alt="" /></div>
                  <div className="news_post_content">
                    <div className="news_post_title"><a>New album release in 2019</a></div>
                    <div className="news_post_text">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi condimentum, neque ac porttitor scelerisque, nisi nisl tincidunt enim, non aliquet diam neque sed urna.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <footer className="footer">
          <div className="background_image" style={{backgroundImage: 'url(images/footer.jpg)'}} />
          <div className="footer_content">
            <div className="container">
              <div className="row">
                <div className="col text-center">
                  {/* Logo */}
                  <div className="logo">
                    <a href="#" className="d-flex flex-row align-items-end justify-content-start">
                      <span className="logo_bars d-flex flex-row align-items-end justify-content-between"><span /><span /><span /><span /><span /></span>
                      <span className="logo_text">TrendMusic</span>
                    </a>
                  </div>
                  {/* Footer Social */}
                </div>
              </div>
            </div>
          </div>
          <div className="footer_bar">
            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="copyright text-center">
                    {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                    Copyright © All rights reserved | This template is made with <i className="fa fa-heart-o" aria-hidden="true" /> by <a target="_blank">Colorlib</a>
                    {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
  );
}

export default App;