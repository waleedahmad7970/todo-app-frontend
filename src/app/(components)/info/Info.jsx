export default function Info() {
    return (
        <section className="info_section layout_padding2">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-lg-3 info-col">
                        <div className="info_detail">
                            <h4>About</h4>
                            <p>
                                Necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful
                            </p>
                            <div className="info_social">
                                {/* <SocialItem
                                    to="#"
                                    icon="fa fa-facebook" 
                                />
                                <SocialItem
                                    to="#"
                                    icon="fa fa-twitter" 
                                />
                                <SocialItem
                                    to="#"
                                    icon="fa fa-linkedin" 
                                />
                                <SocialItem
                                    to="#"
                                    icon="fa fa-instagram" 
                                /> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3 info-col">
                        <div className="info_contact">
                            <h4>Address</h4>
                            <div className="contact_link_box">
                                {/* <AddressItem
                                    link="#"
                                    icon="fa fa-map-marker"
                                    text="Location" 
                                />
                                <AddressItem
                                    link="#"
                                    icon="fa fa-phone"
                                    text="Call +01 1234567890" 
                                />
                                <AddressItem
                                    link="#"
                                    icon="fa fa-envelope"
                                    text="demo@gmail.com" 
                                /> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3 info-col">
                        <div className="info_contact">
                            <h4>Subscribe</h4>
                            <form action="#">
                                <input type="text" placeholder="Enter email" />
                                <button type="submit">
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3 info-col">
                        <div className="map_container">
                            <div className="map">
                                <div id="googleMap"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
