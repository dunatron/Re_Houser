import { Typography } from '@material-ui/core';
import { CEO_DETAILS, CTO_DETAILS } from '../../config';

const TEAM_CONFIG = [
  {
    name: 'Heath McDonough',
    subUrl: 'heath_mcdonough',
    imgPath: '/images/team/heath_dunlop.jpg',
    role: 'CEO',
    phone: CEO_DETAILS.phone,
    email: CEO_DETAILS.email,
    description: (
      <div>
        <Typography gutterBottom>
          Heath practised as an Occupational Therapist for 6 years before
          turning his focus to Property Investment, which in turn led to an
          interest in Property Management.
        </Typography>
        <Typography gutterBottom>
          After evaluating the market and not finding a Property Manager that he
          felt offered sufficient value, he was moved to start a business with
          value at it’s core.
        </Typography>
        <Typography gutterBottom>
          Being close friends with Heath D since childhood, he knew just who to
          turn to when discovering a gap in the market that needed technology to
          bridge.
        </Typography>
        <Typography gutterBottom>
          Now a qualified Property Manager to ensure the platform does
          everything the law requires it to
        </Typography>
      </div>
    ),
  },
  {
    name: 'Heath Dunlop',
    subUrl: 'heath_dunlop',
    imgPath: '/images/team/heath_dunlop.jpg',
    role: 'CTO',
    phone: CTO_DETAILS.Phone,
    email: CTO_DETAILS.email,
    description: (
      <div>
        <Typography gutterBottom>
          Heath has worked as a professional developer for over 8 years. His
          passion for technology and system design has led him through diverse
          career experience, with his latest experience being within the
          educational sector.
        </Typography>
        <Typography gutterBottom>
          He was full of ideas when discovering the opportunity to build
          Rehouser and got coding that very day. Heath’s Rehouser development
          ideas and therefore projects all contribute to building a technology
          that increases company productivity while offering a better service
          for landlords.
        </Typography>
      </div>
    ),
  },
];

export { TEAM_CONFIG };
export default TEAM_CONFIG;
