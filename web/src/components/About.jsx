import { aboutSmallImage, aboutWideImage } from '../data/vehicles';
import Reveal from './Reveal';

const features = [
  {
    number: '01',
    title: 'Exceptional Fleet',
    text: 'A carefully selected collection of exceptional luxury vehicles.',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3.2" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
      </>
    ),
  },
  {
    number: '02',
    title: 'Personalized Service',
    text: 'A seamless and personalized rental experience.',
    icon: (
      <>
        <path d="M4 12h16" />
        <path d="M7.5 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9z" />
        <path d="M16.5 21a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9z" />
      </>
    ),
  },
  {
    number: '03',
    title: 'Premium Experience',
    text: 'Luxury, comfort, and sophistication in every journey.',
    icon: (
      <>
        <path d="M12 3l3.2 6.2 6.8 1-4.9 4.8 1.2 6.8L12 18.6 5.7 21.8 6.9 15 2 10.2l6.8-1L12 3z" />
      </>
    ),
  },
];

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="container about__inner">
        <Reveal className="about__content">
          <p className="eyebrow">
            <span className="eyebrow__line" />
            The house
          </p>
          <h2 className="section__title">
            Luxury car rental,
            <br />
            redefined.
          </h2>
          <p className="section__lead">
            Discover a refined approach to luxury mobility. From exceptional vehicles to
            personalized service, every detail is designed to make your journey extraordinary.
          </p>

          <ul className="features-list">
            {features.map((feature) => (
              <li key={feature.number} className="feature">
                <span className="feature__icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    {feature.icon}
                  </svg>
                </span>
                <span className="feature__text">
                  <span className="feature__number">{feature.number}</span>
                  <strong>{feature.title}</strong>
                  <span className="feature__desc">{feature.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="about__media" delay={140}>
          <figure className="about__image about__image--wide">
            <img
              src={aboutWideImage}
              alt="Luxury car detailed in a dark garage"
              loading="lazy"
            />
          </figure>
          <figure className="about__image about__image--small">
            <img
              src={aboutSmallImage}
              alt="Close-up of a premium car interior and bodywork"
              loading="lazy"
            />
          </figure>
          <span className="about__badge">
            <strong>Est. {new Date().getFullYear()}</strong>
            <em>Miami · Dubai · Riyadh</em>
          </span>
        </Reveal>
      </div>
    </section>
  );
}
