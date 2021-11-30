import {render, screen} from "@testing-library/react";
import {instance, mock, when} from "ts-mockito";
import React from "react";
import {AuthenticatedUser, AuthenticatedUserStore} from "../../shared/authentication/persistence";
import {Home} from '../index';
import {ProfileSearchService} from "../shared/ui/profile-search/ProfileSearchService";

describe('on Home rendered', () => {
    const authenticatedUser = {
        name: "Best User",
        profileImageUrl: 'https://hosting.site/profile/best-user-image.png',
    } as AuthenticatedUser;

    const profileSearchService = mock(ProfileSearchService);
    const authenticatedUserStore = mock<AuthenticatedUserStore>();

    beforeEach(() => {
        when(authenticatedUserStore.get()).thenReturn(authenticatedUser);
        render(
            <Home authenticatedUserStore={instance(authenticatedUserStore)}
                  profileSearchService={instance(profileSearchService)}/>
        );
    });

    it('should display the name and image of the authenticated user', () => {
        expect(screen.getByText(`Logged in as: ${authenticatedUser.name}`)).toBeInTheDocument();
        expect(screen.getByAltText('User Profile')).toHaveAttribute('src', authenticatedUser.profileImageUrl);
    });
});