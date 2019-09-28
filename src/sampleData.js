const today = new Date();

const at = hours => today.setHours(hours, 0);

export const sampleAppointments = [
    {
        startsAt: at(9),
        customer: {
            firstName: 'Charlie',
            lastName: 'Charlie'.split('').reverse().join(''),
            phoneNumber: `+ 7 (${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}) ${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}-${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}-${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}`,
            stylist: 'Jordan',
            service: 'Taxi',
            notes: '18-year old girl'
        }
    },
    {
        startsAt: at(10),
        customer: {
            firstName: 'Frankie',
            lastName: 'Frankie'.split('').reverse().join(''),
            phoneNumber: `+ 7 (${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}) ${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}-${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}-${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}`,
            stylist: 'Jordan',
            service: 'Taxi',
            notes: '18-year old girl'
        }
    },
    {
        startsAt: at(11),
        customer: {
            firstName: 'Casey',
            lastName: 'Casey'.split('').reverse().join(''),
            phoneNumber: `+ 7 (${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}) ${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}-${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}-${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}`,
            stylist: 'Jordan',
            service: 'Taxi',
            notes: '18-year old girl'
        }
    },
    {
        startsAt: at(12),
        customer: {
            firstName: 'Ashley',
            lastName: 'Ashley'.split('').reverse().join(''),
            phoneNumber: `+ 7 (${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}) ${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}-${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}-${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}`,
            stylist: 'Jordan',
            service: 'Taxi',
            notes: '18-year old girl'
        }
    },
    {
        startsAt: at(13),
        customer: {
            firstName: 'Jordan',
            lastName: 'Jordan'.split('').reverse().join(''),
            phoneNumber: `+ 7 (${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}) ${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}-${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}-${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}`,
            stylist: 'Jordan',
            service: 'Taxi',
            notes: '18-year old girl'
        }
    },
    {
        startsAt: at(14),
        customer: {
            firstName: 'Jay',
            lastName: 'Jay'.split('').reverse().join(''),
            phoneNumber: `+ 7 (${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}) ${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}-${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}-${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}`,
            stylist: 'Jordan',
            service: 'Taxi',
            notes: '18-year old girl'
        }
    },
    {
        startsAt: at(15),
        customer: {
            firstName: 'Alex',
            lastName: 'Alex'.split('').reverse().join(''),
            phoneNumber: `+ 7 (${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}) ${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}-${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}-${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}`,
            stylist: 'Jordan',
            service: 'Taxi',
            notes: '18-year old girl'
        }
    },
    {
        startsAt: at(16),
        customer: {
            firstName: 'Jules',
            lastName: 'Jules'.split('').reverse().join(''),
            phoneNumber: `+ 7 (${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}) ${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}-${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}-${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}`,
            stylist: 'Jordan',
            service: 'Taxi',
            notes: '18-year old girl'
        }
    },
    {
        startsAt: at(17),
        customer: {
            firstName: 'Stevie',
            lastName: 'Stevie'.split('').reverse().join(''),
            phoneNumber: `+ 7 (${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}) ${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}-${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}-${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}`,
            stylist: 'Jordan',
            service: 'Taxi',
            notes: '18-year old girl'
        }
    }
];
