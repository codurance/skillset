import {ProfileRepository} from "./ProfileRepository";
import {Profile, ProfileSearchQuery, ProfileSkill} from "skillset";

export class StaticProfileRepository implements ProfileRepository {

    private readonly profiles: Profile[] = [
        {
            name: 'Alexander Howson',
            email: 'alexander.howson@codurance.com',
            role: 'Software Craftsperson in Training',
            skills: [
                {name: 'C#', level: 4},
                {name: 'Java', level: 3},
                {name: 'Rust', level: 1}
            ],
            imageUrl: 'https://www.codurance.com/hubfs/Picture.jpg',
            isAvailable: false,
            currentClient: 'Academy'
        },
        {
            name: 'Amandeep Panesar',
            email: 'amandeep.panesar@codurance.com',
            role: 'Software Craftsperson in Training',
            skills: [
                {name: 'Docker', level: 5},
                {name: 'Serverless', level: 2},
                {name: 'React', level: 3},
                {name: 'Java', level: 1},
                {name: "JavaScript", level: 5}
            ],
            imageUrl: 'https://www.codurance.com/hubfs/IMG_5435-2.jpg',
            isAvailable: false,
            currentClient: 'Academy'
        },
        {
            name: 'Darío Fernández',
            email: 'dario.fernandez@codurance.com',
            role: 'Software Craftsperson in Training',
            skills: [
                {name: 'JavaScript', level: 4},
                {name: 'React', level: 3},
                {name: 'Design', level: 5},
                {name: 'Java', level: 1}
            ],
            imageUrl: 'https://www.codurance.com/hubfs/Dario_Fernandez.png',
            isAvailable: false,
            currentClient: 'Academy'
        },
        {
            name: 'Jordan Colgan',
            email: 'jordan.colgan@codurance.com',
            role: 'Software Craftsperson in Training',
            skills: [
                {name: 'Angular', level: 5},
                {name: 'Kotlin', level: 3},
                {name: 'Android', level: 2},
                {name: 'Typescript', level: 1},
                {name: 'React', level: 2},
                {name: 'Java', level: 1}
            ],
            imageUrl: 'https://www.codurance.com/hubfs/jordan-colgan-photo.jpg',
            isAvailable: false,
            currentClient: 'Academy'
        },
        {
            name: 'Simon Rosenberg',
            email: 'simon.rosenberg@codurance.com',
            role: 'Software Craftsperson in Training',
            skills: [
                {name: 'Java', level: 4},
                {name: 'TypeScript', level: 4},
                {name: 'React', level: 4}
            ],
            imageUrl: 'https://www.codurance.com/hubfs/picture%20(1).jpg',
            isAvailable: false,
            currentClient: 'Academy'
        },
        {
            name: 'Samuel Steele',
            email: 'samuel.steele@codurance.com',
            role: 'Software Craftsperson in Training',
            skills: [
                {name: 'Java', level: 3},
                {name: 'PHP', level: 4},
                {name: 'JavaScript', level: 3},
                {name: 'React', level: 4}
            ],
            imageUrl: 'https://www.codurance.com/hubfs/Sam.jpeg',
            isAvailable: false,
            currentClient: 'Academy'
        },
        {
            name: 'Niall Bambury',
            email: 'niall.bambury@codurance.com',
            role: ' Software Craftsperson',
            skills: [
                {name: 'Java', level: 4},
                {name: 'Spring', level: 5},
                {name: 'JavaScript', level: 3},
                {name: 'React', level: 4}
            ],
            imageUrl: 'https://www.codurance.com/hubfs/niall.jpg',
            isAvailable: true,
            currentClient: 'On the bench'
        },
    ];

    async search(query: ProfileSearchQuery): Promise<Profile[]> {
        let matchingProfiles: Profile[] = [];

        query.skills.forEach((skill: string) => {
            const formattedSkill = skill.toLowerCase();
            const profilesWithSkill = this.profiles.filter(profile => {
                    const formattedSkills = profile.skills.flatMap((skill: ProfileSkill) => skill.name.toLowerCase());
                    return formattedSkills.includes(formattedSkill);
                }
            );
            matchingProfiles = [...new Set([...matchingProfiles, ...profilesWithSkill])];
        });

        return matchingProfiles;
    }

    async get(email: string): Promise<Profile | undefined> {
        return this.profiles.find(profile => profile.email == email);
    }

    async save(profile: Profile): Promise<void> {
        console.log(profile);
        return Promise.resolve(undefined);
    }
}