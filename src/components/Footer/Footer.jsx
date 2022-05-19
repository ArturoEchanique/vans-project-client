import "./Footer.css"

const Footer = () => {
    return (
        <footer className="page-footer font-small ">
            <div className="container-fluid text-center text-md-left">
                <div className="row">
                    <div className=" footer-image col-md-6 mt-md-0 mt-3">
                        <img src="./images/2.png" alt="" />
                    </div>

                    <div className="col-md-3 mb-md-0 mb-3 d-flex align-items-center ">
                        <ul className="list-unstyled">
                            <li>
                                <h6 className="footer-h6">vanmeup.contact@gmail.com</h6>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
