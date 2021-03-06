import {Handler} from 'aws-lambda';
import {ProfileController} from "./controller/ProfileController";
import {ProfileSearchQueryParser} from "./controller/ProfileSearchQueryParser";
import {SearchProfilesEvent} from "./event/SearchProfilesEvent";
import {GetProfileEvent} from "./event/GetProfileEvent";
import {SaveProfileEvent} from "./event/SaveProfileEvent";
import {DynamoProfileRepository} from "./repository/DynamoProfileRepository";

const profileRepository = new DynamoProfileRepository();
const profileSearchQueryParser = new ProfileSearchQueryParser();
const profileController = new ProfileController(profileSearchQueryParser, profileRepository);

export const search: Handler = async (event: SearchProfilesEvent) => {
    return profileController.search(event);
};

export const get: Handler = async (event: GetProfileEvent) => {
    return profileController.get(event);
};

export const save: Handler = async (event: SaveProfileEvent) => {
    return profileController.save(event);
};