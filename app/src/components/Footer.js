import './Footer.scss';

export default function Footer() {
    return (
        <footer className="text-center text-lg-start bg-light text-muted">
            <section>
                <div className="text-center text-md-start mt-1">
                    <div className="row">
                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-0 p-0">
                            <h6 className="text-uppercase fw-bold mb-1">
                                Useful pages
                            </h6>
                            <p className="mb-2">
                                <a href="/terms" className="text-reset">- Terms and conditions</a>
                            </p>
                            <p className="mb-2">
                                <a href="/terms" name="adopt-terms" className="text-reset">- How to play</a>
                            </p>
                            <p className="mb-2">
                                <a href="/dogs" className="text-reset">- Personal challenges</a>
                            </p>
                        </div>
                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-0 p-0">
                            <h6 className="text-uppercase fw-bold mb-1">Contact us</h6>
                            <p className="mb-2">
                                Hungary, 1111 Budapest, Scrabble street 1.
                            </p>
                            <p className="mb-2">
                                scrabble@fakescrabble.com
                            </p>
                            <p className="mb-2">
                                + 01 000 000 00
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <div className="text-center p-1">
                © {(new Date().getFullYear())} Copyright:
                <a className="text-reset fw-bold" href="/">Fake Scrabble</a>
            </div>
        </footer>
    );
}