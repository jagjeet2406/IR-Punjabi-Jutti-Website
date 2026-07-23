import Men from "./men";
import Slideshow from "./slideshow";
import { Women_page } from "./utilis";
export default function Card(){
    return( 
        <>
            <video className="main_img" src="https://res.cloudinary.com/jdqjwumg/video/upload/v1783756798/animation_video_online-video-cutter.com_y68j5g.mp4" muted autoPlay loop  />
            <div className="header_h">
                <div className="h">
                    <h2>Men's Traditional Footwear</h2>
                    <p>-----Where rich Punjabi tradition meets ultimate comfort-----</p>
                </div>
            </div>
                    <div className="cards">
                        <a href="./men-collection">
                            <div className="maincardiv">
                             
                                  <div className="maincard">
                                      
                                        <Slideshow 
                                            images={Women_page.map(item => item.link)} 
                                            interval={3000}   
                                        />
                                    </div>
                                <button id="viewall">VIEW ALL</button>
                            </div>
                        </a>
                        <div className="card">
                            <img src="https://res.cloudinary.com/dqdeedzkp/image/upload/v1783074317/mens2_p5c9yx.png" alt="cards1" />
                        </div>
                        <div className="card">
                            <img src="https://res.cloudinary.com/dqdeedzkp/image/upload/v1783074459/mens3_zpxpct.png" alt="Card2" />
                        </div>
                        <div className="card">
                            <img src="https://res.cloudinary.com/dqdeedzkp/image/upload/v1783074754/mens4_wb0uqs.jpg" alt="Card3" />
                        </div>
                    </div>
                    <div className="header_h">
                        <div className="h">
                            <h2>Women's Premium Juttis</h2>
                            <p>-----Where vibrant Punjabi grace meets effortless everyday comfort-----</p>
                        </div>
                    </div>
                    <div className="cards">
                        <a href="./women-collection">
                            <div  className="maincardiv">
                                 <div className="maincard">
                                      
                                        <Slideshow 
                                            images={Women_page.map(item => item.link)} 
                                            interval={3000}   
                                        />
                                    </div>
                                <button id="viewall">VIEW ALL</button>
                            </div>
                        </a>
                        <div className="card">
                            <img src="https://res.cloudinary.com/dqdeedzkp/image/upload/v1783076812/women2_yzawdr.png" alt="cards1" />
                        </div>
                        <div className="card">
                            <img src="https://res.cloudinary.com/dqdeedzkp/image/upload/v1783076810/women3_ya1pna.png" alt="Card2" />
                        </div>
                        <div className="card">
                            <img src="https://res.cloudinary.com/dqdeedzkp/image/upload/v1783078193/women4_ipr9p2.jpg" alt="Card3" />
                        </div>
                    </div>
                    <div className="header_h">
                        <div className="h">
                            <h2>Kids' Juttis</h2>
                            <p>-----Where playful Punjabi charm meets soft, gentle comfort-----</p>
                        </div>
                    </div>
                    <div className="cards">
                        <a href="./kid-collection">
                            <div className="maincardiv">
                                <div className="maincard">
                                      
                                        <Slideshow 
                                            images={Women_page.map(item => item.link)} 
                                            interval={3000}   
                                        />
                                    </div>
                                <button id="viewall">VIEW ALL</button>
                            </div>
                        </a>
                        <div className="card">
                            <img src="https://res.cloudinary.com/dqdeedzkp/image/upload/v1783146748/Kids2_fak4u3.png" alt="cards1" />
                        </div>
                        <div className="card">
                            <img src="https://res.cloudinary.com/dqdeedzkp/image/upload/v1783146748/Kids3_oyglbi.png" alt="Card2" />
                        </div>
                        <div className="card">
                            <img src="https://res.cloudinary.com/dqdeedzkp/image/upload/v1783146748/Kids4_dx3amq.png" alt="Card3" />
                        </div>
                    </div>
                    <div className="header_h">
                        <div className="h">
                            <h2>The Grand Wedding Edit</h2>
                            <p>-----Where royal bridal heritage meets ultimate celebratory comfort-----</p>
                        </div>
                    </div>
                    <div className="cards">
                        <a href="./wedding-collection">
                            <div className="maincardiv">
                                <div className="maincard">
                                      
                                        <Slideshow 
                                            images={Women_page.map(item => item.link)} 
                                            interval={3000}   
                                        />
                                    </div>
                                
                                <button id="viewall">VIEW ALL</button>
                            </div>
                        </a>
                        <div className="card">
                            <img src="https://res.cloudinary.com/dqdeedzkp/image/upload/v1783146762/wedding_4_dywpux.jpg" alt="cards1" />
                        </div>
                        <div className="card">
                            <img src="https://res.cloudinary.com/dqdeedzkp/image/upload/v1783333941/wedding_1_phsa09.png" alt="Card2" />
                        </div>
                        <div className="card">
                            <img src="https://res.cloudinary.com/dqdeedzkp/image/upload/v1783146762/wedding_3_svttg8.jpg" alt="Card3" />
                        </div>
                    </div>
                    <div className="header_h">
                        <div className="h">
                            <h2>PREMIUM  HANDBAGS</h2>
                            <p>-----Elegance you can carry, luxury you can feel-----</p>
                        </div>
                    </div>
                    <div className="cards">
                        <div className="maincardiv">
                            <div className="maincard maincardhandbag"></div>
                            <button id="viewall">VEIW ALL</button>
                        </div>
                        <div className="card">
                            <img src="https://res.cloudinary.com/dqdeedzkp/image/upload/v1783434631/Purse2_g9rizw.png" alt="cards1" />
                        </div>
                        <div className="card">
                            <img src="https://res.cloudinary.com/dqdeedzkp/image/upload/v1783434631/Purse3_yj3yuz.png" alt="Card2" />
                        </div>
                        <div className="card">
                            <img src="https://res.cloudinary.com/dqdeedzkp/image/upload/v1783434631/Purse4_jpbfsj.png" alt="Card3" />
                        </div>
                    </div>
         <div className="advertise1">
                   <div className="boxes">
                    <img className="logos_box" src="https://thumbs.dreamstime.com/b/white-delivery-cargo-truck-icon-logo-dark-background-133197419.jpg"></img>
                    <div className="text_layer">
                        <b>Free Shipping</b><br/>
                        <b className="in">For bulk orders</b>
                    </div>
                    
                    
                    
            </div>
                <div className="boxes">
                    <img className="logos_box" src="https://i.pinimg.com/736x/b7/82/ce/b782ce6c68baaa662bd3889aaa419a02.jpg"></img>
                    <div className="text_layer">
                        <b>Handcrafted</b><br/>
                        <b className="in">Traditional artism quality</b>
                    </div>
                    
                </div>
                <div className="boxes">
                    <img className="logos_box" src="https://thumbs.dreamstime.com/b/lock-icon-black-white-black-background-illustration-lock-icon-black-white-black-background-vector-illustration-170336738.jpg"></img>
                    <div className="text_layer">
                        <b>Secure payment </b><br/>
                        <b className="in">100% secure checkout</b>
                    </div>
                    
                </div>
            </div>
    </>
    )
}