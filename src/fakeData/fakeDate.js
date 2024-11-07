// Fakedata.js
const fakeData = [
    {
        id: 1,
        title: 'Star Wars Discussion: C-3PO',
        content: 'I believe C-3PO is the best character in Star Wars. He brings so much humor and intelligence to the series, and his interactions with other characters are priceless! What do you think?',
        media: '/starwars.JPEG',
        votes: 0,
        createdAt: '2024-11-05T10:00:00Z',
        author: 'User1',
        authorDetails: {
            profilePic: '/public/trip.AVIF',
            bio: 'Star Wars enthusiast and collector of rare memorabilia.',
            location: 'Los Angeles, CA'
        }
    },
    { 
        id: 2,
        title: 'Discussion Topic', 
        content: 'What do you think about the future of renewable energy?', 
        votes: 15,
        createdAt: '2024-11-05T11:00:00Z',
        author: 'User2',
        authorDetails: {
            profilePic: '/path/to/user2-profile.jpg',
            bio: 'Environmental scientist and advocate for sustainable living.',
            location: 'New York, NY'
        }
    },
    { 
        id: 3,
        title: 'Tech News', 
        content: 'The latest smartphone has been released with groundbreaking features.', 
        votes: 8,
        createdAt: '2024-11-05T12:00:00Z',
        author: 'User3',
        authorDetails: {
            profilePic: '/path/to/user3-profile.jpg',
            bio: 'Tech reviewer and gadget enthusiast.',
            location: 'San Francisco, CA'
        }
    },
    {
        id: 4,
        title: 'Funny Cats', 
        content: 'Why do cats always land on their feet? What’s the science behind it?', 
        media: '/funny-cat.webp', 
        votes: 5,
        createdAt: '2024-11-05T13:00:00Z',
        author: 'User4',
        authorDetails: {
            profilePic: '/path/to/user4-profile.jpg',
            bio: 'Animal lover and amateur photographer.',
            location: 'Chicago, IL'
        }
    },
    {
        id: 5,
        title: 'Healthy Living', 
        content: 'What are your favorite tips for maintaining a healthy lifestyle?', 
        votes: 2,
        createdAt: '2024-11-05T14:00:00Z',
        author: 'User5',
        authorDetails: {
            profilePic: '/path/to/user5-profile.jpg',
            bio: 'Fitness coach and nutrition expert.',
            location: 'Miami, FL'
        }
    }
];

export default fakeData;

