interface Cinema {
   id: string;
   seats: {
     [seatNumber: number]: boolean;
   };
 }