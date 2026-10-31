import { images } from '../data/images.js';
import { Reveal } from './Reveal.jsx';
import { Car, Diamond, Handshake } from './icons.jsx';
import './About.css';

const pillars = [
  {
    number: '01',
    title: 'Exceptional Fleet',
    copy: 'A carefully selected collection of exceptional luxury vehicles.',
    Icon: Car,
  },
  {
    number: '02',
    title: 'Personalized Service',
    copy: 'A seamless and personalized rental experience, from first enquiry to return.',
    Icon: Handshake,
  },
  {
    number: '03',
    title: 'Premium Experience',
    copy: 'Luxury, comfort and sophistication in every journey.',
    Icon: Diamond,
  },
];

export function About() {
  return (
    <section className="section section--ruled about" id="about" aria-labelledby="about-title">
      <div className="container about__grid">
        <div className="about__copy">
          <Reveal>
            <p className="eyebrow">The Brand</p>
            <h2 className="section__title about__title" id="about-title">
              Luxury car rental,
              <br />
              redefined.
            </h2>
            <p className="lede about__lede">
              Discover a refined approach to luxury mobility. From exceptional vehicles to
              personalized service, every detail is designed to make your journey extraordinary.
            </p>
          </Reveal>

          <Reveal as="ul" className="pillars" delay={120}>
            {pillars.map(({ number, title, copy, Icon }) => (
              <li className="pillar" key={number}>
                <span className="pillar__icon" aria-hidden="true">
                  <Icon size={22} />
                </span>
                <div>
                  <div className="pillar__head">
                    <span className="pillar__number">{number}</span>
                    <h3 className="pillar__title">{title}</h3>
                  </div>
                  <p className="pillar__copy">{copy}</p>
                </div>
              </li>
            ))}
          </Reveal>
        </div>

        <Reveal className="about__media" delay={80}>
          <figure className="about__frame about__frame--wide">
            <img
              src={images.aboutWide}
              alt="Luxury coupe parked inside a minimalist concrete garage"
              loading="lazy"
              decoding="async"
            />
          </figure>
          <figure className="about__frame about__frame--inset">
            <img
              src={images.aboutDetail}
              alt="Detail of a hand-stitched leather steering wheel"
              loading="lazy"
              decoding="async"
            />
          </figure>
          <div className="about__stamp">
            <span>Est.</span>
            <strong>2011</strong>
            <span>Miami</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
