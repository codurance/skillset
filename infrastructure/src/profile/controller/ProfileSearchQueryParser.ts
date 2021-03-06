import querystring from "qs";
import {ProfileSearchQuery} from "skillset";

export class ProfileSearchQueryParser {

    parse(parameters: any): ProfileSearchQuery { // eslint-disable-line @typescript-eslint/no-explicit-any
        const queryParameters = querystring.parse(parameters);

        return  {
            skills: queryParameters.skills as string[],
            hasRequestedAvailableOnly: (queryParameters.hasRequestedAvailableOnly as string) === 'true',
            hasRequestedExactMatches: (queryParameters.hasRequestedExactMatches as string) === 'true'
        };
    }

}