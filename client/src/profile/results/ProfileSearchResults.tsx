import {ProfileSearch, ProfileSearchService} from "../shared/ui/profile-search";
import {ApplicationNavigator} from "../../shared/navigation";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {Profile, ProfileSearchQuery} from "../shared/domain";
import logo from "../../shared/ui/logo.svg";
import {Grid, GridColumn, GridRow, Image} from "semantic-ui-react";

type Props = {
    applicationNavigator: ApplicationNavigator,
    profileSearchService: ProfileSearchService
}

export const ProfileSearchResults = ({applicationNavigator, profileSearchService}: Props) => {
    const location = useLocation();
    const [query, setQuery] = useState<ProfileSearchQuery>();
    const [results, setResults] = useState<Profile[]>();

    useEffect(() => {
        const previousSearch = location.state;
        if (!previousSearch) return applicationNavigator.navigateToHome();

        setQuery(previousSearch.query);
        setResults(previousSearch.results);
    }, [location.state, applicationNavigator]);

    return (
        <>
            <Grid verticalAlign='middle'>
                <GridRow>
                    <GridColumn width={2}>
                        <Image src={logo} centered height={125} width={75}/>
                    </GridColumn>
                    <GridColumn width={12}>
                        <ProfileSearch profileSearchService={profileSearchService} query={query}/>
                    </GridColumn>
                </GridRow>
            </Grid>

            {!results?.length &&
            <p>No results found</p>
            }

            {results?.map(profile => {
                return <p key="{profile}">{profile.name}</p>
            })}
        </>
    );
}