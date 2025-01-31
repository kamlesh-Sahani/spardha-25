import Badminton from'@/app/assets/Badminton S.png'
import Basketball from '@/app/assets/basketball S.png'
import BodyBuilding from '@/app/assets/body building S.png'
import Chess from '@/app/assets/Chess S.png';

import Footbll from '@/app/assets/football S.png'
import Kabaddi from '@/app/assets/kabaddi S.png'
import PowerLifting from '@/app/assets/Power Lifting S.png'
import TableTennis from '@/app/assets/Table Tennis S.png'
import TugofWar from '@/app/assets/tug of war S.png'
import Vollyball from '@/app/assets/vollyball S.png'

import armwrestling from "@/app/assets/armwrestling S.png";
export interface IEventImage{
  id: number,
  name: string,
  image: any,
  description: string;
  amount:number,
  size?:1,
  limit?:7
}
const eventImage:IEventImage[] = [
      {
        id: 1,
        name: 'Armwrestling',
        image: armwrestling,
        description: 'Annual Armwrestling Event',
        amount:40,
        size:1,
        limit:7
      },
      {
        id: 2,
        name: 'Badminton',
        image: Badminton,
        description: 'Annual Badminton Event',
        amount:40,
      },
      {
        id: 3,
        name: 'Basketball',
        image: Basketball,
        description: 'Annual Basketball Event',
        amount:40,
      },
      {
        id: 4,
        name: 'Body Building',
        image: BodyBuilding,
        description: 'Annual Body Building Event',
        amount:450,
      },
      {
        id: 5,
        name: 'Chess',
        image: Chess,
        description: 'Annual Chess Event',
        amount:940,
      },
      {
        id: 6,
        name: 'Football',
        image: Footbll,
        description: 'Annual Football Event',
        amount:430,
      },
      {
        id: 7,
        name: 'Kabaddi',
        image: Kabaddi,
        description: 'Annual Kabaddi Event',
        amount:40,
      },
      {
        id: 8,
        name: 'Power Lifting',
        image: PowerLifting,
        description: 'Annual Power Lifting Event',
        amount:403,
      },
      {
        id: 9,
        name: 'Table Tennis',
        image: TableTennis,
        description: 'Annual Table Tennis Event',
        amount:420,
      },
      {
        id: 10,
        name: 'Tug of War',
        image: TugofWar,
        description: 'Annual Tug of War Event',
        amount:401,
      },
      {
        id: 11,
        name: 'Vollyball',
        image: Vollyball,
        description: 'Annual Vollyball Event',
        amount:140,
      }
]

export default eventImage