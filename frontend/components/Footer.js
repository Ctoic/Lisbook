import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <div className="container border-top" style={{ marginTop: '80px' }}>
            <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-3 mt-5 pb-5 g-4">
                <div className="col mb-3">
                    <div className="footer-brand">
                        <Link href="/" className="brand-link text-decoration-none">
                            <Image src="/Images/lisbook-logo-1.png" alt="Lisbook Logo" width={84} height={84} />
                        </Link>
                        <div className="brand-text">
                            <div className="brand-title">Lisbook</div>
                            <p className="brand-tagline">LisBook is a straightforward audiobook player designed for simplicity and ease of use.</p>
                        </div>
                    </div>
                </div>

                <div className="col mb-3">
                    <h5 className="fw-bold h5 mb-3 text-uppercase footer-col-title">Important Link</h5>
                    <ul className="nav flex-column ms-2">
                        <li className="nav-item mb-2"><Link href="/" className="p-0">Home</Link></li>
                        <li className="nav-item mb-2"><Link href="/about" className="p-0">About</Link></li>
                        <li className="nav-item mb-2"><Link href="/contact" className="p-0">Contact</Link></li>
                        <li className="nav-item mb-2"><Link href="/faq" className="p-0">FAQs</Link></li>
                        <li className="nav-item mb-2"><Link href="/profile" className="p-0">Profile</Link></li>
                    </ul>
                </div>

                <div className="col mb-3">
                    <h5 className="fw-bold h5 mb-3 text-uppercase footer-col-title">Features</h5>
                    <ul className="nav flex-column ms-2">
                        <li className="nav-item mb-2"><a href="#" className="p-0">Play/Pause</a></li>
                        <li className="nav-item mb-2"><a href="#" className="p-0">Skip Chapters</a></li>
                        <li className="nav-item mb-2"><a href="#" className="p-0">Change Speed</a></li>
                        <li className="nav-item mb-2"><a href="#" className="p-0">Change Volume</a></li>
                        <li className="nav-item mb-2"><a href="#" className="p-0">Change Theme</a></li>
                    </ul>
                </div>

                <div className="col mb-3">
                    <h5 className="fw-bold h5 mb-3 text-uppercase footer-col-title">Follow Us</h5>
                    <ul className="nav flex-column ms-2">
                        <li className="nav-item mb-2">
                            <a href="https://www.instagram.com/dev_with_ctoic" className="p-0" target="_blank" rel="noopener noreferrer"><i className="bi bi-instagram me-2"></i> Instagram</a>
                        </li>
                        <li className="nav-item mb-2">
                            <a href="https://x.com/Ct0ic" className="p-0" target="_blank" rel="noopener noreferrer"><i className="bi bi-twitter-x me-2"></i> Twitter-X</a>
                        </li>
                        <li className="nav-item mb-2">
                            <a href="https://www.linkedin.com/in/ctoic/" className="p-0" target="_blank" rel="noopener noreferrer"><i className="bi bi-linkedin me-2"></i> LinkedIn</a>
                        </li>
                        <li className="nav-item mb-2">
                            <a href="https://github.com/Ctoic" className="p-0" target="_blank" rel="noopener noreferrer"><i className="bi bi-github me-2"></i> GitHub</a>
                        </li>
                    </ul>
                </div>

                {/* Newsletter Section */}
                <div className="col mb-3">
                    <h5 className="fw-bold h5 mb-3 text-uppercase footer-col-title">Stay Updated</h5>
                    <p className="mb-3">Subscribe to our newsletter for updates on new features and audiobooks.</p>
                    <form id="newsletterForm" className="d-flex flex-column gap-2">
                        <input
                            type="email"
                            className="form-control py-2 px-3"
                            id="newsletterEmail"
                            placeholder="Enter your email"
                            required
                        />
                        <div className="invalid-feedback">Please provide a valid email address.</div>
                        <button type="submit" className="btn btn-success py-2 px-3 w-100">Subscribe</button>
                    </form>
                    <div id="newsletterMessage" className="mt-2 small"></div>
                </div>
            </footer>
            <div className="bg-white-900 p-4 text-center">
                <div className="text-gray-500">&copy; 2024 Lisbook | All Rights Reserved</div>
            </div>
        </div>
    );
}
