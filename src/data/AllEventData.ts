interface Sports {
  sport: string;
  minPlayers: number;
  substitute: number | "NA";
  entryFee: number;
  maxEntry: number | "Open";
  qrImage:string
}
export const sportsData: Sports[] = [
  {
    sport: "Football",
    minPlayers: 11,
    substitute: 5,
    entryFee: 1600,
    maxEntry: 20,
    qrImage:'/football.jpeg'
  },
  {
    sport: "Basketball (Boys)",
    minPlayers: 5,
    substitute: 7,
    entryFee: 1200,
    maxEntry: 20,
     qrImage:'/basketball.jpeg'
  },
  {
    sport: "Basketball (Girls)",
    minPlayers: 5,
    substitute: 7,
    entryFee: 1200,
    maxEntry: 20,
     qrImage:'/basketball.jpeg'
  },
  {
    sport: "Volleyball (Boys)",
    minPlayers: 6,
    substitute: 6,
    entryFee: 1200,
    maxEntry: 20,
     qrImage:'/basketball.jpeg'
  },
  {
    sport: "Volleyball (Girls)",
    minPlayers: 6,
    substitute: 6,
    entryFee: 1200,
    maxEntry: 20,
     qrImage:'/basketball.jpeg'
  },
  {
    sport: "Badminton Singles (Boy)",
    minPlayers: 1,
    substitute: "NA",
    entryFee: 150,
    maxEntry: "Open",
     qrImage:'/badminton.jpeg'
  },
  {
    sport: "Badminton Singles (Girl)",
    minPlayers: 1,
    substitute: "NA",
    entryFee: 150,
    maxEntry: "Open",
     qrImage:'/badminton.jpeg'
  },
  {
    sport: "Badminton Doubles (Boy)",
    minPlayers: 2,
    substitute: "NA",
    entryFee: 300,
    maxEntry: "Open",
     qrImage:'/badmintondouble.jpeg'
  },
  {
    sport: "Badminton Doubles (Girl)",
    minPlayers: 2,
    substitute: "NA",
    entryFee: 300,
    maxEntry: "Open",
     qrImage:'/badmintondouble.jpeg'
  },
  {
    sport: "Badminton Doubles (Mix)",
    minPlayers: 2,
    substitute: "NA",
    entryFee: 300,
    maxEntry: "Open",
     qrImage:'/badmintondouble.jpeg'
  },
  {
    sport: "Table Tennis Singles (Boy)",
    minPlayers: 1,
    substitute: "NA",
    entryFee: 150,
    maxEntry: "Open",
     qrImage:'/badminton.jpeg'
  },
  {
    sport: "Table Tennis Singles (Girl)",
    minPlayers: 1,
    substitute: "NA",
    entryFee: 150,
    maxEntry: "Open",
     qrImage:'/badminton.jpeg'
  },
  {
    sport: "Table Tennis Doubles (Boy)",
    minPlayers: 2,
    substitute: "NA",
    entryFee: 300,
    maxEntry: "Open",
     qrImage:'/badmintondouble.jpeg'
  },
  {
    sport: "Table Tennis Doubles (Girl)",
    minPlayers: 2,
    substitute: "NA",
    entryFee: 300,
    maxEntry: "Open",
     qrImage:'/badminton.jpeg'
  },
  {
    sport: "Table Tennis Doubles (Mix)",
    minPlayers: 2,
    substitute: "NA",
    entryFee: 300,
    maxEntry: "Open",
     qrImage:'/badmintondouble.jpeg'
  },
  {
    sport: "Tug of war (Boys)",
    minPlayers: 8,
    substitute: 4,
    entryFee: 1200,
    maxEntry: 20,
     qrImage:'/basketball.jpeg'
  },
  {
    sport: "Tug of war (Girls)",
    minPlayers: 8,
    substitute: 4,
    entryFee: 1200,
    maxEntry: 20,
     qrImage:'/basketball.jpeg'
  },
  {
    sport: "Chess",
    minPlayers: 1,
    substitute: "NA",
    entryFee: 150,
    maxEntry: 12,
     qrImage:'/badminton.jpeg'
  },
  {
    sport: "Kabaddi (Boys)",
    minPlayers: 7,
    substitute: 5,
    entryFee: 1200,
    maxEntry: 20,
     qrImage:'/basketball.jpeg'
  },
  {
    sport: "Kabaddi (Girls)",
    minPlayers: 7,
    substitute: 5,
    entryFee: 1200,
    maxEntry: 20,
     qrImage:'/basketball.jpeg'
  },
  {
    sport: "Arm Wrestling Featherweight ( <65 Kg)",
    minPlayers: 1,
    substitute: "NA",
    entryFee: 100,
    maxEntry: "Open",
     qrImage:'/arm.jpeg'
  },
  {
    sport: "Arm Wrestling  Lightweight (65+ - 75 Kg)",
    minPlayers: 1,
    substitute: "NA",
    entryFee: 100,
    maxEntry: "Open",
     qrImage:'/arm.jpeg'
  },
  {
    sport: "Arm Wrestling Middleweight (75+ - 85 Kg)",
    minPlayers: 1,
    substitute: "NA",
    entryFee: 100,
    maxEntry: "Open",
     qrImage:'/arm.jpeg'
  },
  {
    sport: "Arm Wrestling Heavyweight (85+ - 100 Kg)",
    minPlayers: 1,
    substitute: "NA",
    entryFee: 100,
    maxEntry: "Open",
     qrImage:'/arm.jpeg'
  },
  {
    sport: "Body Building Lightweight (65 - 75 Kg)",
    minPlayers: 1,
    substitute: "NA",
    entryFee: 150,
    maxEntry: "Open",
     qrImage:'/badminton.jpeg'
  },
  {
    sport: "Body Building Middleweight (65+ - 75 Kg)",
    minPlayers: 1,
    substitute: "NA",
    entryFee: 150,
    maxEntry: "Open",
     qrImage:'/badminton.jpeg'
  },
  {
    sport: "Body Building Heavyweight (75+ - 85 Kg)",
    minPlayers: 1,
    substitute: "NA",
    entryFee: 150,
    maxEntry: "Open",
     qrImage:'/badminton.jpeg'
  },
  {
    sport: "Power Lifting Lightweight (65 - 75 Kg)",
    minPlayers: 1,
    substitute: "NA",
    entryFee: 150,
    maxEntry: "Open",
     qrImage:'/badminton.jpeg'
  },
  {
    sport: "Power Lifting Middleweight (75+ - 85 Kg)",
    minPlayers: 1,
    substitute: "NA",
    entryFee: 150,
    maxEntry: "Open",
     qrImage:'/badminton.jpeg'
  },
  {
    sport: "Power Lifting Heavyweight (85+ - 100 Kg)",
    minPlayers: 1,
    substitute: "NA",
    entryFee: 150,
    maxEntry: "Open",
     qrImage:'/badminton.jpeg'
  },
];
				