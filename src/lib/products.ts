/**
 * Wholesale range. Prices are deliberately not published — B2B pricing is
 * quoted against volume and destination. `moqCases` drives the wholesale form.
 */
export type Product = {
  slug: string;
  format: string;
  volume: string;
  packConfig: string;
  casesPerPallet: number;
  moqCases: number;
  channel: string;
  cap: string;
};

export const products: Product[] = [
  {
    slug: 'still-330',
    format: 'Still — 330 ml glass',
    volume: '330 ml',
    packConfig: '24 bottles / case',
    casesPerPallet: 84,
    moqCases: 50,
    channel: 'Fine dining, boardrooms, in-room hospitality',
    cap: 'Reclosable crown'
  },
  {
    slug: 'still-500',
    format: 'Still — 500 ml PET',
    volume: '500 ml',
    packConfig: '20 bottles / case',
    casesPerPallet: 120,
    moqCases: 80,
    channel: 'Events, conferences, corporate pantries',
    cap: '28 mm tethered screw cap'
  },
  {
    slug: 'still-1000',
    format: 'Still — 1 litre PET',
    volume: '1 litre',
    packConfig: '12 bottles / case',
    casesPerPallet: 96,
    moqCases: 60,
    channel: 'Restaurants, catering, institutional supply',
    cap: '30 mm tethered screw cap'
  },
  {
    slug: 'still-1500',
    format: 'Still — 1.5 litre PET',
    volume: '1.5 litre',
    packConfig: '6 bottles / case',
    casesPerPallet: 100,
    moqCases: 60,
    channel: 'Retail wholesale, distributor pallets, households',
    cap: '30 mm tethered screw cap'
  },
  {
    slug: 'sparkling-330',
    format: 'Sparkling — 330 ml glass',
    volume: '330 ml',
    packConfig: '24 bottles / case',
    casesPerPallet: 84,
    moqCases: 50,
    channel: 'Fine dining, premium bars, hospitality',
    cap: 'Reclosable crown'
  },
  {
    slug: 'dispenser-19l',
    format: 'Still — 19 litre returnable',
    volume: '19 litre',
    packConfig: 'Single, returnable',
    casesPerPallet: 48,
    moqCases: 40,
    channel: 'Offices, clinics, institutions with coolers',
    cap: 'Tamper-evident dispenser seal'
  }
];

export const privateLabel = {
  minAnnualVolume: '3 containers / year (approx. 60,000 cases)',
  leadTimeWeeks: '8–12 weeks from artwork sign-off',
  options: [
    'Your brand name and label artwork on Mountiva-filled bottles',
    'Choice of PET or glass, still or sparkling, across the 330 ml–1.5 L range',
    'Neck tags, shrink sleeves, custom carton print and pallet configuration',
    'Compliance support for PSQCA (Pakistan) and destination-market labelling',
    'Dedicated batch coding and a Certificate of Analysis per production run'
  ]
};
