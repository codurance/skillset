import {ProfileRepository} from "./ProfileRepository";
import {Profile, ProfileSearchQuery} from "skillset";
import {PersistedProfile} from "./PersistedProfile";
import AWS from "aws-sdk";
import {DocumentClient} from "aws-sdk/clients/dynamodb";

export class DynamoProfileRepository implements ProfileRepository {
    private readonly profileTableName = process.env.PROFILES_TABLE!; // eslint-disable-line @typescript-eslint/no-non-null-assertion
    private readonly client: DocumentClient;

    constructor() {
        const { ENV } = process.env;
        const connectionOptions = ENV === 'dev'
            ? { region: 'localhost', endpoint: 'http://localhost:8000' }
            : undefined;

        this.client = new AWS.DynamoDB.DocumentClient(connectionOptions);
    }

    async get(email: string): Promise<Profile | undefined> {
        const result = await this.client
            .get({
                TableName: this.profileTableName,
                Key: {email},
            })
            .promise();

        return result.Item as Profile;
    }

    async save(profile: Profile): Promise<void> {
        await this.client
            .put({
                TableName: this.profileTableName,
                Item: profile,
            })
            .promise();
    }

    async search(query: ProfileSearchQuery): Promise<Profile[]> {
        const result = await this.client
            .scan({
                TableName: this.profileTableName,
            })
            .promise();

        const persistedProfiles = result.Items?.map(item => new PersistedProfile(item as Profile));
        if (!persistedProfiles) return [];

        return this.filterProfiles(persistedProfiles, query);
    }

    private filterProfiles(profiles: PersistedProfile[], query: ProfileSearchQuery) {
        let filteredProfiles = profiles;
        if (query.hasRequestedAvailableOnly) {
            filteredProfiles = filteredProfiles.filter(profile => profile.isAvailable);
        }

        return filteredProfiles.filter(profile => profile.hasSkills(query.skills));
    }
}