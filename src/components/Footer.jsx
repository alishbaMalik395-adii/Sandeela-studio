import "./Footer.css";

const links = {
  "Quick Links": ["Home","About","Portfolio","Services","Contact"],
  "Services": ["Portrait Sessions","Wedding Photography","Commercial Shoots","Fashion Shoots"],
  "Connect": ["Instagram","Facebook","TikTok","WhatsApp"],
};

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="ft-brand">
          <div className="ft-logo">
            <span className="ft-logo-s">S</span>
            <div>
              <span className="ft-logo-main">SANDEELA</span>
              <span className="ft-logo-sub">STUDIO</span>
            </div>
          </div>
          <p className="ft-tagline">Capturing moments that last a lifetime — from the heart of Islamabad to your forever memories.</p>
          <div className="ft-gold-line"></div>
          <a href="tel:+923170707926" className="ft-phone">+92 317 0707926</a>
        </div>

        {Object.entries(links).map(([title, items]) => (
          <div key={title} className="ft-col">
            <h4 className="ft-col-title">{title}</h4>
            <ul>
              {items.map(item => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(/ /g,"-")}`} className="ft-link">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer-bottom">
        <p className="ft-copy">© 2025 Sandeela Studio · Sheraz Sandeela · Islamabad, Pakistan</p>
        <p className="ft-credit">All Rights Reserved · Photography is our Passion</p>
      </div>

      <div className="footer-glow"></div>
    </footer>
  );
}
